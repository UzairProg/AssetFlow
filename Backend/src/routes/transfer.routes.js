const { Router } = require('express');
const { z } = require('zod');
const { authenticate, authorize, validate } = require('../middleware');
const transferController = require('../controllers/transfer.controller');

const router = Router();

const CreateTransferSchema = z.object({
  assetId: z.string().uuid(),
  requestedHolderId: z.string().uuid(),
  remarks: z.string().optional()
});

const RejectTransferSchema = z.object({
  remarks: z.string().optional()
});

// All transfer routes require authentication
router.use(authenticate);

router.post('/', validate(CreateTransferSchema), transferController.createRequest);
router.get('/', transferController.getAll);
router.get('/user/:userId', transferController.getByUser);
router.get('/:id', transferController.getById);

// Approve/Reject request (Asset Manager, Dept Head, Admin)
router.post('/:id/approve', authorize('ASSET_MANAGER', 'DEPARTMENT_HEAD', 'ADMIN'), transferController.approve);
router.post('/:id/reject', authorize('ASSET_MANAGER', 'DEPARTMENT_HEAD', 'ADMIN'), validate(RejectTransferSchema), transferController.reject);

module.exports = router;
