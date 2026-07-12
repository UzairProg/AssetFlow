const prisma = require('../db');

class NotificationService {
  async createNotification({ userId, title, message, type, metadata }) {
    return await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        metadata: metadata ? JSON.stringify(metadata) : null
      }
    });
  }

  async getNotifications(userId, isRead) {
    const where = { userId };
    if (typeof isRead === 'boolean') {
      where.isRead = isRead;
    }
    return await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  async markOneRead(id, userId) {
    const updated = await prisma.notification.updateMany({
      where: { id, userId },
      data: { isRead: true }
    });
    return updated.count > 0;
  }

  async markAllRead(userId) {
    const updated = await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true }
    });
    return updated.count;
  }

  async deleteNotification(id, userId) {
    const deleted = await prisma.notification.deleteMany({
      where: { id, userId }
    });
    return deleted.count > 0;
  }
}

module.exports = new NotificationService();
