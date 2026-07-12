const prisma = require('../db');

class AllocationService {
  async allocateAsset({ assetId, userId, departmentId }) {
    return prisma.$transaction(async (tx) => {
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
    return prisma.$transaction(async (tx) => {
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
  }
}

module.exports = new AllocationService();
