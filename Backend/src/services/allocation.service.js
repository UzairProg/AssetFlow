const prisma = require('../db');
const activityLogService = require('./activity-log.service');
const notificationService = require('./notification.service');

class AllocationService {
  async allocateAsset({ assetId, userId, departmentId }) {
    const result = await prisma.$transaction(async (tx) => {
      // Check asset status
      const asset = await tx.asset.findUnique({ where: { id: assetId } });
      if (!asset) {
        throw { status: 404, message: 'Asset not found' };
      }
      if (asset.status !== 'AVAILABLE') {
        throw { status: 400, message: 'Only assets with status "Available" can be allocated.' };
      }

      // Check if user exists
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw { status: 404, message: 'User not found' };
      }

      // Check for existing active allocation for this asset to prevent duplicate active allocations
      const existingAllocation = await tx.allocation.findFirst({
        where: { assetId, status: 'ACTIVE' }
      });
      if (existingAllocation) {
        throw { status: 400, message: 'Asset already has an active allocation.' };
      }

      const finalDepartmentId = departmentId || user.departmentId;

      // Create allocation record
      const allocation = await tx.allocation.create({
        data: {
          assetId,
          userId,
          departmentId: finalDepartmentId,
          status: 'ACTIVE'
        }
      });

      // Update asset status
      await tx.asset.update({
        where: { id: assetId },
        data: {
          status: 'ALLOCATED',
          assignedToId: userId,
          departmentId: finalDepartmentId
        }
      });

      return allocation;
    });

    await activityLogService.log({
      userId,
      module: 'ALLOCATION',
      action: 'ALLOCATE_ASSET',
      entityId: result.id
    });

    await notificationService.createNotification({
      userId,
      title: 'Asset Allocated',
      message: `An asset has been allocated to you.`,
      type: 'ALLOCATION_CREATED'
    });

    return result;
  }

  async getAllocationById(id) {
    const allocation = await prisma.allocation.findUnique({
      where: { id },
      include: { asset: true, user: true, department: true }
    });
    if (!allocation) {
      throw { status: 404, message: 'Allocation not found' };
    }
    return allocation;
  }

  async getAllAllocations(filters = {}) {
    return prisma.allocation.findMany({
      where: filters,
      include: { asset: true, user: true, department: true },
      orderBy: { allocatedAt: 'desc' }
    });
  }

  async getAllocationsByEmployee(userId) {
    return this.getAllAllocations({ userId });
  }

  async getAllocationsByDepartment(departmentId) {
    return this.getAllAllocations({ departmentId });
  }

  async returnAsset(assetId) {
    const result = await prisma.$transaction(async (tx) => {
      // Find active allocation for this asset
      const allocation = await tx.allocation.findFirst({
        where: { assetId, status: 'ACTIVE' }
      });
      if (!allocation) {
        throw { status: 400, message: 'No active allocation found for this asset' };
      }

      // Update allocation
      const updatedAllocation = await tx.allocation.update({
        where: { id: allocation.id },
        data: {
          status: 'RETURNED',
          returnedAt: new Date()
        }
      });

      // Update asset
      await tx.asset.update({
        where: { id: assetId },
        data: {
          status: 'AVAILABLE',
          assignedToId: null
        }
      });

      return updatedAllocation;
    });

    await activityLogService.log({
      userId: result.userId,
      module: 'ALLOCATION',
      action: 'RETURN_ASSET',
      entityId: result.id
    });

    return result;
  }

  async notifyOverdueReturns() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const overdueAllocations = await prisma.allocation.findMany({
      where: {
        status: 'ACTIVE',
        allocatedAt: { lt: thirtyDaysAgo }
      },
      include: { asset: true }
    });

    let count = 0;
    for (const alloc of overdueAllocations) {
      await notificationService.createNotification({
        userId: alloc.userId,
        title: 'Overdue Asset Return',
        message: `Your allocation for asset ${alloc.asset.assetTag} is overdue. Please return it or renew the allocation.`,
        type: 'OVERDUE_RETURN'
      });
      count++;
    }

    return count;
  }
}

module.exports = new AllocationService();
