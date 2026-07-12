const notificationService = require('../services/notification.service');

class NotificationController {
  async getNotifications(req, res, next) {
    try {
      const { isRead } = req.query;
      let readStatus = undefined;
      if (isRead === 'true') readStatus = true;
      if (isRead === 'false') readStatus = false;
      const notifications = await notificationService.getNotifications(req.user.id, readStatus);
      res.json(notifications);
    } catch (error) {
      next(error);
    }
  }

  async markOneRead(req, res, next) {
    try {
      const { id } = req.params;
      const success = await notificationService.markOneRead(id, req.user.id);
      if (!success) return res.status(404).json({ error: 'Notification not found' });
      res.json({ message: 'Marked as read' });
    } catch (error) {
      next(error);
    }
  }

  async markAllRead(req, res, next) {
    try {
      const count = await notificationService.markAllRead(req.user.id);
      res.json({ message: `Marked ${count} notifications as read` });
    } catch (error) {
      next(error);
    }
  }

  async deleteNotification(req, res, next) {
    try {
      const { id } = req.params;
      const success = await notificationService.deleteNotification(id, req.user.id);
      if (!success) return res.status(404).json({ error: 'Notification not found' });
      res.json({ message: 'Deleted' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NotificationController();
