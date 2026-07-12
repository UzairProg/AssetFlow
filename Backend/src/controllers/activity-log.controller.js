const activityLogService = require('../services/activity-log.service');

class ActivityLogController {
  async getLogs(req, res, next) {
    try {
      const { userId, module, startDate, endDate } = req.query;
      const logs = await activityLogService.getLogs({
        userId,
        module,
        startDate,
        endDate
      });
      res.json(logs);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ActivityLogController();
