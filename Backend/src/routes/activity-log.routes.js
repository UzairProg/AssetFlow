const { Router } = require('express');
const { authenticate, authorize } = require('../middleware');
const activityLogController = require('../controllers/activity-log.controller');

const router = Router();
router.use(authenticate);

// Allow admins and managers to view all logs. Alternatively, anyone can view their own, but since filtering by userId is optional, we'll restrict to higher roles or let service handle it.
// Assuming admins/managers want full visibility:
router.get('/', authorize('ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD'), activityLogController.getLogs);

module.exports = router;
