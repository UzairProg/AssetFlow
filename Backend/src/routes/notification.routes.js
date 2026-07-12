const { Router } = require('express');
const { authenticate } = require('../middleware');
const notificationController = require('../controllers/notification.controller');

const router = Router();
router.use(authenticate);

router.get('/', notificationController.getNotifications);
router.post('/mark-all-read', notificationController.markAllRead);
router.post('/:id/read', notificationController.markOneRead);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
