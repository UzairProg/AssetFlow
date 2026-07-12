const { Router } = require('express');
const { authenticate, authorize } = require('../middleware');
const reportController = require('../controllers/report.controller');

const router = Router();
router.use(authenticate);

// Only managers and admins
const mgtAuth = authorize('ASSET_MANAGER', 'DEPARTMENT_HEAD', 'ADMIN');

router.get('/asset-utilization', mgtAuth, reportController.getAssetUtilization);
router.get('/most-used-assets', mgtAuth, reportController.getMostUsedAssets);
router.get('/idle-assets', mgtAuth, reportController.getIdleAssets);
router.get('/department-allocation', mgtAuth, reportController.getDepartmentAllocationSummary);
router.get('/booking-stats', mgtAuth, reportController.getBookingStatistics);
router.get('/booking-heatmap', mgtAuth, reportController.getBookingHeatmap);
router.get('/maintenance-frequency', mgtAuth, reportController.getMaintenanceFrequency);
router.get('/upcoming-maintenance', mgtAuth, reportController.getUpcomingMaintenance);
router.get('/near-retirement', mgtAuth, reportController.getAssetsNearRetirement);
router.get('/audit-summary', mgtAuth, reportController.getAuditSummary);

// Available to all authenticated users
router.get('/notification-summary', reportController.getNotificationSummary);

module.exports = router;
