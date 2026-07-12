const { Router } = require('express');
const { z } = require('zod');
const allocationController = require('../controllers/allocation.controller');
const { authenticate, authorize, validate } = require('../middleware');

const router = Router();

// Validation Schemas
const AllocateAssetSchema = z.object({
  assetId: z.string().uuid('Invalid asset ID'),
  userId: z.string().uuid('Invalid user ID'),
  departmentId: z.string().uuid('Invalid department ID').optional().nullable()
});

const ReturnAssetSchema = z.object({
  assetId: z.string().uuid('Invalid asset ID')
});

// All allocation routes require authentication
router.use(authenticate);

// Allocate an asset
router.post(
  '/',
  authorize('ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD'),
  validate(AllocateAssetSchema),
  allocationController.allocateAsset
);

// Return an asset
router.post(
  '/return',
  authorize('ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD'),
  validate(ReturnAssetSchema),
  allocationController.returnAsset
);

// Get all allocations
router.get(
  '/',
  authorize('ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD'),
  allocationController.getAllAllocations
);

// Get allocations by employee
router.get(
  '/employee/:userId',
  authorize('ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD', 'EMPLOYEE'),
  allocationController.getAllocationsByEmployee
);

// Get allocations by department
router.get(
  '/department/:departmentId',
  authorize('ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD', 'EMPLOYEE'),
  allocationController.getAllocationsByDepartment
);

// Get allocation by ID
router.get(
  '/:id',
  authorize('ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD', 'EMPLOYEE'),
  allocationController.getAllocationById
);

// Notify overdue returns (dummy endpoint for cron or manual trigger)
router.post(
  '/notify-overdue',
  authorize('ADMIN', 'ASSET_MANAGER'),
  allocationController.notifyOverdue
);

module.exports = router;
