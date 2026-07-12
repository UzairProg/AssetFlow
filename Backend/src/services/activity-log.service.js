const prisma = require('../db');

class ActivityLogService {
  async log({ userId, module, action, entityId, metadata }) {
    return await prisma.activityLog.create({
      data: {
        userId,
        module,
        action,
        entityId,
        metadata: metadata ? JSON.stringify(metadata) : null
      }
    });
  }

  async getLogs(filters = {}) {
    const where = {};
    if (filters.userId) where.userId = filters.userId;
    if (filters.module) where.module = filters.module;
    if (filters.startDate || filters.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = new Date(filters.startDate);
      if (filters.endDate) where.createdAt.lte = new Date(filters.endDate);
    }

    return await prisma.activityLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true } }
      }
    });
  }
}

module.exports = new ActivityLogService();
