const prisma = require('../db');
const notificationService = require('./notification.service');
const activityLogService = require('./activity-log.service');

class MaintenanceService {
  async raiseRequest({ assetId, reportedById, issueDescription, priority, attachments, remarks }) {
    const asset = await prisma.asset.findUnique({ where: { id: assetId } });
    if (!asset) throw { status: 404, message: 'Asset not found' };

    const activeAllocation = await prisma.allocation.findFirst({
      where: { assetId, status: 'ACTIVE' }
    });

    const user = await prisma.user.findUnique({ where: { id: reportedById } });
    const isAllocatedUser = activeAllocation && activeAllocation.userId === reportedById;
    const isManager = ['ASSET_MANAGER', 'ADMIN'].includes(user.role);

    if (!isAllocatedUser && !isManager) {
      throw { status: 403, message: 'Only allocated users or Asset Managers can raise maintenance requests for this asset' };
    }

    const request = await prisma.maintenanceRequest.create({
      data: {
        assetId,
        reportedById,
        issueDescription,
        priority,
        attachments,
        remarks,
        status: 'PENDING'
      }
    });

    await activityLogService.log({
      userId: reportedById,
      module: 'MAINTENANCE',
      action: 'RAISE_REQUEST',
      entityId: request.id
    });

    return request;
  }

  async getAllRequests(filters = {}) {
    return await prisma.maintenanceRequest.findMany({
      where: filters,
      include: {
        asset: true,
        reportedBy: { select: { id: true, name: true, email: true } },
        assignedTechnician: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getRequestById(id) {
    const req = await prisma.maintenanceRequest.findUnique({
      where: { id },
      include: {
        asset: true,
        reportedBy: { select: { id: true, name: true, email: true } },
        approvedBy: { select: { id: true, name: true, email: true } },
        assignedTechnician: { select: { id: true, name: true, email: true } }
      }
    });
    if (!req) throw { status: 404, message: 'Request not found' };
    return req;
  }

  async approveRequest(id, approvedById) {
    const request = await prisma.maintenanceRequest.findUnique({ where: { id }, include: { asset: true } });
    if (!request) throw { status: 404, message: 'Request not found' };
    if (request.status !== 'PENDING') throw { status: 400, message: 'Only PENDING requests can be approved' };

    const updated = await prisma.$transaction(async (tx) => {
      await tx.asset.update({
        where: { id: request.assetId },
        data: { status: 'UNDER_MAINTENANCE' }
      });

      return await tx.maintenanceRequest.update({
        where: { id },
        data: { status: 'APPROVED', approvedById }
      });
    });

    await notificationService.createNotification({
      userId: request.reportedById,
      title: 'Maintenance Approved',
      message: `Your maintenance request for asset ${request.asset.assetTag} was approved.`,
      type: 'MAINTENANCE_APPROVED'
    });

    await activityLogService.log({
      userId: approvedById,
      module: 'MAINTENANCE',
      action: 'APPROVE_REQUEST',
      entityId: updated.id
    });

    return updated;
  }

  async rejectRequest(id, userId, remarks) {
    const request = await prisma.maintenanceRequest.findUnique({ where: { id } });
    if (!request) throw { status: 404, message: 'Request not found' };
    if (request.status !== 'PENDING') throw { status: 400, message: 'Only PENDING requests can be rejected' };

    const updated = await prisma.maintenanceRequest.update({
      where: { id },
      data: { status: 'REJECTED', remarks: remarks ? `${request.remarks || ''}\nRejection remarks: ${remarks}` : request.remarks }
    });
    
    await activityLogService.log({
      userId,
      module: 'MAINTENANCE',
      action: 'REJECT_REQUEST',
      entityId: id
    });

    return updated;
  }

  async assignTechnician(id, assignedTechnicianId, userId) {
    const request = await prisma.maintenanceRequest.findUnique({ where: { id } });
    if (!request) throw { status: 404, message: 'Request not found' };
    if (!['APPROVED', 'ASSIGNED'].includes(request.status)) {
      throw { status: 400, message: 'Request must be APPROVED to assign a technician' };
    }

    const updated = await prisma.maintenanceRequest.update({
      where: { id },
      data: { status: 'ASSIGNED', assignedTechnicianId }
    });

    await notificationService.createNotification({
      userId: assignedTechnicianId,
      title: 'Maintenance Assigned',
      message: `You have been assigned to maintenance request ${id}.`,
      type: 'MAINTENANCE_ASSIGNED'
    });
    
    await activityLogService.log({
      userId,
      module: 'MAINTENANCE',
      action: 'ASSIGN_TECHNICIAN',
      entityId: id,
      metadata: { assignedTechnicianId }
    });

    return updated;
  }

  async updateProgress(id, status, remarks, userId) {
    const request = await prisma.maintenanceRequest.findUnique({ where: { id } });
    if (!request) throw { status: 404, message: 'Request not found' };
    if (status === 'RESOLVED') throw { status: 400, message: 'Use resolve endpoint for RESOLVED status' };

    const updated = await prisma.maintenanceRequest.update({
      where: { id },
      data: { status, remarks }
    });
    
    await activityLogService.log({
      userId,
      module: 'MAINTENANCE',
      action: 'UPDATE_PROGRESS',
      entityId: id,
      metadata: { status }
    });

    return updated;
  }

  async resolveRequest(id, remarks, userId) {
    const request = await prisma.maintenanceRequest.findUnique({ where: { id }, include: { asset: true } });
    if (!request) throw { status: 404, message: 'Request not found' };
    
    const updated = await prisma.$transaction(async (tx) => {
      const activeAllocation = await tx.allocation.findFirst({
        where: { assetId: request.assetId, status: 'ACTIVE' }
      });
      const newStatus = activeAllocation ? 'ALLOCATED' : 'AVAILABLE';

      await tx.asset.update({
        where: { id: request.assetId },
        data: { status: newStatus }
      });

      return await tx.maintenanceRequest.update({
        where: { id },
        data: { status: 'RESOLVED', remarks: remarks ? `${request.remarks || ''}\nResolution: ${remarks}` : request.remarks }
      });
    });

    await notificationService.createNotification({
      userId: request.reportedById,
      title: 'Maintenance Resolved',
      message: `Your maintenance request for asset ${request.asset.assetTag} was resolved.`,
      type: 'MAINTENANCE_RESOLVED'
    });
    
    await activityLogService.log({
      userId,
      module: 'MAINTENANCE',
      action: 'RESOLVE_REQUEST',
      entityId: id
    });

    return updated;
  }
}
module.exports = new MaintenanceService();
