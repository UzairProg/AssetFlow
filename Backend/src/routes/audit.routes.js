const { Router } = require('express');
const { z } = require('zod');
const { authenticate, authorize, validate } = require('../middleware');
const auditController = require('../controllers/audit.controller');

const router = Router();
router.use(authenticate);

const CreateCycleSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  scope: z.string().optional(),
  departments: z.array(z.string().uuid()),
  locations: z.array(z.string()),
  startDate: z.string(),
  endDate: z.string()
});
const AssignAuditorsSchema = z.object({ auditors: z.array(z.string().uuid()) });
const VerifySchema = z.object({
  auditCycleId: z.string().uuid(),
  assetId: z.string().uuid(),
  verificationStatus: z.enum(['VERIFIED', 'MISSING', 'DAMAGED']),
  remarks: z.string().optional()
});

router.post('/', authorize('ASSET_MANAGER', 'ADMIN'), validate(CreateCycleSchema), auditController.createCycle);
router.put('/:id', authorize('ASSET_MANAGER', 'ADMIN'), auditController.updateCycle);
router.post('/:id/assign', authorize('ASSET_MANAGER', 'ADMIN'), validate(AssignAuditorsSchema), auditController.assignAuditors);
router.get('/', auditController.getCycles);
router.get('/:id', auditController.getDetails);

router.post('/verify', validate(VerifySchema), auditController.submitVerification);

router.post('/:id/close', authorize('ASSET_MANAGER', 'ADMIN'), auditController.closeCycle);
router.get('/:id/discrepancies', authorize('ASSET_MANAGER', 'ADMIN'), auditController.getDiscrepancyReport);

module.exports = router;
