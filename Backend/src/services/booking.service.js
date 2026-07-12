const prisma = require('../db');

class BookingService {
  async computeBookingStatus(booking) {
    // Upcoming, Ongoing, Completed, Cancelled
    if (booking.status === 'CANCELLED') return booking.status;

    const now = new Date();
    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);

    if (now < start) {
      return 'UPCOMING';
    } else if (now >= start && now <= end) {
      return 'ONGOING';
    } else {
      return 'COMPLETED';
    }
  }

  async updateBookingStatuses(bookings) {
    return Promise.all(bookings.map(async (b) => {
      const computed = await this.computeBookingStatus(b);
      if (b.status !== computed) {
        return await prisma.booking.update({
          where: { id: b.id },
          data: { status: computed },
          include: { asset: true, bookedBy: { select: { id: true, name: true, email: true } }, department: { select: { id: true, name: true } } }
        });
      }
      return b;
    }));
  }

  async createBooking({ assetId, bookedById, title, purpose, startTime, endTime }) {
    const asset = await prisma.asset.findUnique({ where: { id: assetId } });
    if (!asset) {
      throw { status: 404, message: 'Asset not found' };
    }
    if (!asset.sharedBookable) {
      throw { status: 400, message: 'Asset is not shared-bookable' };
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    if (start >= end) {
      throw { status: 400, message: 'Start time must be before end time' };
    }

    const now = new Date();
    if (start < now) {
      throw { status: 400, message: 'Start time cannot be in the past' };
    }

    // Check overlaps
    const overlaps = await prisma.booking.findMany({
      where: {
        assetId,
        status: { not: 'CANCELLED' },
        AND: [
          { startTime: { lt: end } },
          { endTime: { gt: start } }
        ]
      }
    });

    if (overlaps.length > 0) {
      throw { status: 400, message: 'Booking overlaps with an existing booking' };
    }

    const user = await prisma.user.findUnique({ where: { id: bookedById } });
    
    let computedStatus = 'UPCOMING';
    if (now >= start && now <= end) {
      computedStatus = 'ONGOING';
    }

    return await prisma.booking.create({
      data: {
        assetId,
        bookedById,
        departmentId: user.departmentId,
        title,
        purpose,
        startTime: start,
        endTime: end,
        status: computedStatus
      },
      include: { asset: true }
    });
  }

  async updateBooking(id, bookedById, data) {
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) throw { status: 404, message: 'Booking not found' };
    
    if (booking.status === 'CANCELLED' || booking.status === 'COMPLETED') {
      throw { status: 400, message: `Cannot modify a ${booking.status} booking` };
    }

    let start = booking.startTime;
    let end = booking.endTime;

    if (data.startTime) start = new Date(data.startTime);
    if (data.endTime) end = new Date(data.endTime);

    if (start >= end) {
      throw { status: 400, message: 'Start time must be before end time' };
    }

    // Check overlaps if times changed
    if (data.startTime || data.endTime) {
      const overlaps = await prisma.booking.findMany({
        where: {
          assetId: booking.assetId,
          id: { not: id },
          status: { not: 'CANCELLED' },
          AND: [
            { startTime: { lt: end } },
            { endTime: { gt: start } }
          ]
        }
      });
      if (overlaps.length > 0) throw { status: 400, message: 'Booking overlaps with an existing booking' };
    }

    const computedStatus = await this.computeBookingStatus({ ...booking, startTime: start, endTime: end, status: booking.status });

    return await prisma.booking.update({
      where: { id },
      data: {
        title: data.title,
        purpose: data.purpose,
        startTime: start,
        endTime: end,
        status: computedStatus
      },
      include: { asset: true }
    });
  }

  async cancelBooking(id, userId, userRole) {
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) throw { status: 404, message: 'Booking not found' };

    if (booking.bookedById !== userId && userRole !== 'ADMIN' && userRole !== 'ASSET_MANAGER' && userRole !== 'DEPARTMENT_HEAD') {
      throw { status: 403, message: 'Forbidden' };
    }

    if (booking.status === 'CANCELLED') {
      throw { status: 400, message: 'Booking is already cancelled' };
    }

    return await prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: { asset: true }
    });
  }

  async getBooking(id) {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        asset: true,
        bookedBy: { select: { id: true, name: true, email: true } },
        department: { select: { id: true, name: true } }
      }
    });

    if (!booking) throw { status: 404, message: 'Booking not found' };
    
    const computed = await this.computeBookingStatus(booking);
    if (booking.status !== computed) {
      booking.status = computed;
      return await prisma.booking.update({
        where: { id },
        data: { status: computed },
        include: {
          asset: true,
          bookedBy: { select: { id: true, name: true, email: true } },
          department: { select: { id: true, name: true } }
        }
      });
    }
    return booking;
  }

  async getAllBookings(filters = {}) {
    const bookings = await prisma.booking.findMany({
      where: filters,
      include: {
        asset: true,
        bookedBy: { select: { id: true, name: true, email: true } },
        department: { select: { id: true, name: true } }
      },
      orderBy: { startTime: 'asc' }
    });

    return await this.updateBookingStatuses(bookings);
  }

  async getCalendarBookings(assetId, startRange, endRange) {
    const filters = {
      assetId,
      status: { not: 'CANCELLED' },
      startTime: { lt: new Date(endRange) },
      endTime: { gt: new Date(startRange) }
    };
    return this.getAllBookings(filters);
  }
}

module.exports = new BookingService();
