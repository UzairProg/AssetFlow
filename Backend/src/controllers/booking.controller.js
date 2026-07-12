const bookingService = require('../services/booking.service');

class BookingController {
  async create(req, res, next) {
    try {
      const { assetId, title, purpose, startTime, endTime } = req.body;
      const bookedById = req.user.id;
      const booking = await bookingService.createBooking({
        assetId,
        bookedById,
        title,
        purpose,
        startTime,
        endTime
      });
      res.status(201).json(booking);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const bookedById = req.user.id;
      const booking = await bookingService.updateBooking(id, bookedById, req.body);
      res.json(booking);
    } catch (error) {
      next(error);
    }
  }

  async cancel(req, res, next) {
    try {
      const { id } = req.params;
      const booking = await bookingService.cancelBooking(id, req.user.id, req.user.role);
      res.json(booking);
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const { id } = req.params;
      const booking = await bookingService.getBooking(id);
      res.json(booking);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const { assetId, bookedById, departmentId, status } = req.query;
      const filters = {};
      if (assetId) filters.assetId = assetId;
      if (bookedById) filters.bookedById = bookedById;
      if (departmentId) filters.departmentId = departmentId;
      if (status) filters.status = status;
      
      const bookings = await bookingService.getAllBookings(filters);
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  }

  async getCalendar(req, res, next) {
    try {
      const { assetId } = req.params;
      const { start, end } = req.query;
      if (!start || !end) {
        return res.status(400).json({ error: 'Start and end query parameters are required' });
      }
      const bookings = await bookingService.getCalendarBookings(assetId, start, end);
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookingController();
