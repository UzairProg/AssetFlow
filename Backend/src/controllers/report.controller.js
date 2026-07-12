const prisma = require('../db');

class ReportController {
  async getAssetUtilization(req, res, next) {
    try {
      const stats = await prisma.asset.groupBy({
        by: ['status'],
        _count: { status: true }
      });
      res.json(stats);
    } catch (error) { next(error); }
  }

  async getMostUsedAssets(req, res, next) {
    try {
      const allocations = await prisma.allocation.groupBy({
        by: ['assetId'],
        _count: { assetId: true },
        orderBy: { _count: { assetId: 'desc' } },
        take: 10
      });
      const result = await Promise.all(allocations.map(async (a) => {
        const asset = await prisma.asset.findUnique({ where: { id: a.assetId }, select: { name: true, assetTag: true } });
        return { ...a, asset };
      }));
      res.json(result);
    } catch (error) { next(error); }
  }

  async getIdleAssets(req, res, next) {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const idle = await prisma.asset.findMany({
        where: {
          status: 'AVAILABLE',
          allocations: { none: { allocatedAt: { gte: thirtyDaysAgo } } }
        },
        include: { category: true }
      });
      res.json(idle);
    } catch (error) { next(error); }
  }

  async getDepartmentAllocationSummary(req, res, next) {
    try {
      const summary = await prisma.allocation.groupBy({
        by: ['departmentId'],
        _count: { id: true },
        where: { status: 'ACTIVE' }
      });
      
      const result = await Promise.all(summary.map(async (s) => {
        if (!s.departmentId) return { departmentName: 'Unassigned', count: s._count.id };
        const dept = await prisma.department.findUnique({ where: { id: s.departmentId }, select: { name: true } });
        return { departmentName: dept.name, count: s._count.id };
      }));
      res.json(result);
    } catch (error) { next(error); }
  }

  async getBookingStatistics(req, res, next) {
    try {
      const stats = await prisma.booking.groupBy({
        by: ['status'],
        _count: { id: true }
      });
      res.json(stats);
    } catch (error) { next(error); }
  }

  async getBookingHeatmap(req, res, next) {
    try {
      const bookings = await prisma.booking.findMany({
        select: { startTime: true }
      });
      const heatmap = {};
      bookings.forEach(b => {
        const d = b.startTime.toISOString().split('T')[0];
        heatmap[d] = (heatmap[d] || 0) + 1;
      });
      res.json(Object.keys(heatmap).map(date => ({ date, count: heatmap[date] })));
    } catch (error) { next(error); }
  }

  async getMaintenanceFrequency(req, res, next) {
    try {
      const stats = await prisma.maintenanceRequest.groupBy({
        by: ['assetId'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10
      });
      const result = await Promise.all(stats.map(async (s) => {
        const asset = await prisma.asset.findUnique({ where: { id: s.assetId }, select: { name: true, assetTag: true } });
        return { ...s, asset };
      }));
      res.json(result);
    } catch (error) { next(error); }
  }

  async getUpcomingMaintenance(req, res, next) {
    try {
      const upcoming = await prisma.maintenanceRequest.findMany({
        where: { status: { in: ['APPROVED', 'ASSIGNED', 'IN_PROGRESS'] } },
        include: { asset: true }
      });
      res.json(upcoming);
    } catch (error) { next(error); }
  }

  async getAssetsNearRetirement(req, res, next) {
    try {
      const threshold = new Date();
      threshold.setFullYear(threshold.getFullYear() - 4);
      
      const assets = await prisma.asset.findMany({
        where: {
          acquisitionDate: { lte: threshold },
          status: { notIn: ['RETIRED', 'DISPOSED'] }
        }
      });
      res.json(assets);
    } catch (error) { next(error); }
  }

  async getAuditSummary(req, res, next) {
    try {
      const cycles = await prisma.auditCycle.findMany({
        include: {
          _count: { select: { results: true } }
        }
      });
      res.json(cycles);
    } catch (error) { next(error); }
  }

  async getNotificationSummary(req, res, next) {
    try {
      const { id: userId } = req.user;
      const unreadCount = await prisma.notification.count({ where: { userId, isRead: false } });
      const totalCount = await prisma.notification.count({ where: { userId } });
      res.json({ unreadCount, totalCount });
    } catch (error) { next(error); }
  }
}

module.exports = new ReportController();
