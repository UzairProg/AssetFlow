const prisma = require('../db');
const activityLogService = require('./activity-log.service');
const notificationService = require('./notification.service');

class TransferService {
  async createTransferRequest({ assetId, requestedHolderId, requestedById, remarks }) {
    // 1. Asset must currently have an ACTIVE allocation.
    const activeAllocation = await prisma.allocation.findFirst({
      where: {
        assetId,
        status: 'ACTIVE'
      },
      include: {
        asset: true
      }
    });

    if (!activeAllocation) {
      throw { status: 400, message: 'Asset does not have an ACTIVE allocation.' };
    }

    const currentHolderId = activeAllocation.userId;

    // 2. Asset cannot be transferred if status is in [UNDER_MAINTENANCE, LOST, RETIRED, DISPOSED]
    const invalidStatuses = ['UNDER_MAINTENANCE', 'LOST', 'RETIRED', 'DISPOSED'];
    if (invalidStatuses.includes(activeAllocation.asset.status)) {
      throw { status: 400, message: `Cannot transfer asset with status ${activeAllocation.asset.status}.` };
    }

    // 3. Duplicate pending requests are not allowed for the same asset.
    const existingPending = await prisma.transferRequest.findFirst({
      where: {
        assetId,
        status: 'PENDING'
      }
    });

    if (existingPending) {
      throw { status: 400, message: 'A pending transfer request already exists for this asset.' };
    }

    // 4. Requested holder must exist and be active.
    const requestedHolder = await prisma.user.findUnique({
      where: { id: requestedHolderId }
    });

    if (!requestedHolder || requestedHolder.status !== 'ACTIVE') {
      throw { status: 400, message: 'Requested holder does not exist or is inactive.' };
    }

    // Create the transfer request
    const transferRequest = await prisma.transferRequest.create({
      data: {
        assetId,
        currentHolderId,
        requestedHolderId,
        requestedById,
        remarks,
        status: 'PENDING'
      }
    });

    await activityLogService.log({
      userId: requestedById,
      module: 'TRANSFER',
      action: 'CREATE_REQUEST',
      entityId: transferRequest.id
    });

    return transferRequest;
  }

  async getAllRequests(filters = {}) {
    return await prisma.transferRequest.findMany({
      where: filters,
      include: {
        asset: true,
        currentHolder: { select: { id: true, name: true, email: true } },
        requestedHolder: { select: { id: true, name: true, email: true } },
        requestedBy: { select: { id: true, name: true, email: true } },
        approvedBy: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getRequestById(id) {
    const request = await prisma.transferRequest.findUnique({
      where: { id },
      include: {
        asset: true,
        currentHolder: { select: { id: true, name: true, email: true } },
        requestedHolder: { select: { id: true, name: true, email: true } },
        requestedBy: { select: { id: true, name: true, email: true } },
        approvedBy: { select: { id: true, name: true, email: true } }
      }
    });

    if (!request) {
      throw { status: 404, message: 'Transfer request not found' };
    }
    return request;
  }

  async getRequestsByUser(userId) {
    return this.getAllRequests({
      OR: [
        { currentHolderId: userId },
        { requestedHolderId: userId },
        { requestedById: userId }
      ]
    });
  }

  async approveRequest(id, approvedById) {
    const request = await prisma.transferRequest.findUnique({
      where: { id },
      include: { asset: true }
    });

    if (!request) {
      throw { status: 404, message: 'Transfer request not found' };
    }
    if (request.status !== 'PENDING') {
      throw { status: 400, message: 'Only PENDING requests can be approved' };
    }

    // Business Rules Check before approval
    const activeAllocation = await prisma.allocation.findFirst({
      where: { assetId: request.assetId, status: 'ACTIVE' }
    });

    if (!activeAllocation || activeAllocation.userId !== request.currentHolderId) {
      throw { status: 400, message: 'Current asset allocation is invalid or has changed.' };
    }

    // Process approval inside a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Close previous allocation
      await tx.allocation.update({
        where: { id: activeAllocation.id },
        data: {
          status: 'RETURNED',
          returnedAt: new Date()
        }
      });

      // Fetch user's department for new allocation
      const reqHolder = await tx.user.findUnique({
        where: { id: request.requestedHolderId }
      });

      // Create new ACTIVE allocation
      const newAllocation = await tx.allocation.create({
        data: {
          assetId: request.assetId,
          userId: request.requestedHolderId,
          departmentId: reqHolder.departmentId,
          status: 'ACTIVE'
        }
      });

      // Update asset
      await tx.asset.update({
        where: { id: request.assetId },
        data: {
          assignedToId: request.requestedHolderId,
          departmentId: reqHolder.departmentId,
          status: 'ALLOCATED' // Keep asset status as Allocated
        }
      });

      // Update transfer request status
      const updatedReq = await tx.transferRequest.update({
        where: { id: request.id },
        data: {
          status: 'APPROVED',
          approvedById
        }
      });

      return updatedReq;
    });

    await activityLogService.log({
      userId: approvedById,
      module: 'TRANSFER',
      action: 'APPROVE_REQUEST',
      entityId: result.id
    });

    await notificationService.createNotification({
      userId: request.requestedHolderId,
      title: 'Transfer Approved',
      message: `Your transfer request for an asset was approved.`,
      type: 'TRANSFER_APPROVED'
    });

    return result;
  }

  async rejectRequest(id, rejectedById, remarks) {
    const request = await prisma.transferRequest.findUnique({
      where: { id }
    });

    if (!request) {
      throw { status: 404, message: 'Transfer request not found' };
    }
    if (request.status !== 'PENDING') {
      throw { status: 400, message: 'Only PENDING requests can be rejected' };
    }

    const updated = await prisma.transferRequest.update({
      where: { id },
      data: {
        status: 'REJECTED',
        remarks: remarks ? `${request.remarks || ''}\nRejection remarks: ${remarks}` : request.remarks
      }
    });

    await activityLogService.log({
      userId: rejectedById,
      module: 'TRANSFER',
      action: 'REJECT_REQUEST',
      entityId: updated.id
    });

    return updated;
  }
}

module.exports = new TransferService();
