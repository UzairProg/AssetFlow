const { Router } = require('express');
const { z } = require('zod');
const { authenticate, authorize, validate } = require('../middleware');
const maintenanceController = require('../controllers/maintenance.controller');

const router = Router();
router.use(authenticate);

const RaiseRequestSchema = z.object({
  assetId: z.string().uuid(),
  issueDescription: z.string().min(1),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  attachments: z.string().optional(),
  remarks: z.string().optional()
});

const RejectSchema = z.object({ remarks: z.string().optional() });
const AssignSchema = z.object({ assignedTechnicianId: z.string().uuid() });
const UpdateProgressSchema = z.object({
  status: z.enum(['IN_PROGRESS', 'PENDING', 'ASSIGNED']),
  remarks: z.string().optional()
});
const ResolveSchema = z.object({ remarks: z.string().optional() });

router.post('/', validate(RaiseRequestSchema), maintenanceController.raiseRequest);
router.get('/', maintenanceController.getAll);
router.get('/:id', maintenanceController.getById);

router.post('/:id/approve', authorize('ASSET_MANAGER', 'DEPARTMENT_HEAD', 'ADMIN'), maintenanceController.approve);
router.post('/:id/reject', authorize('ASSET_MANAGER', 'DEPARTMENT_HEAD', 'ADMIN'), validate(RejectSchema), maintenanceController.reject);
router.post('/:id/assign', authorize('ASSET_MANAGER', 'DEPARTMENT_HEAD', 'ADMIN'), validate(AssignSchema), maintenanceController.assignTechnician);
router.post('/:id/progress', validate(UpdateProgressSchema), maintenanceController.updateProgress);
router.post('/:id/resolve', validate(ResolveSchema), maintenanceController.resolve);

module.exports = router;
