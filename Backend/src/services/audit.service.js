const prisma = require('../db');
const activityLogService = require('./activity-log.service');
const notificationService = require('./notification.service');

class AuditService {
  async createCycle({ title, description, scope, departments, locations, startDate, endDate, userId }) {
    const cycle = await prisma.auditCycle.create({
      data: {
        title, description, scope, departments, locations,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: 'PLANNED'
      }
    });

    await activityLogService.log({
      userId,
      module: 'AUDIT',
      action: 'CREATE_CYCLE',
      entityId: cycle.id
    });

    return cycle;
  }

  async updateCycle(id, data, userId) {
    const cycle = await prisma.auditCycle.findUnique({ where: { id } });
    if (!cycle) throw { status: 404, message: 'Audit cycle not found' };
    if (cycle.status === 'COMPLETED') throw { status: 400, message: 'Closed audits cannot be modified' };

    const updated = await prisma.auditCycle.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined
      }
    });
    
    await activityLogService.log({
      userId,
      module: 'AUDIT',
      action: 'UPDATE_CYCLE',
      entityId: id
    });
    return updated;
  }

  async assignAuditors(id, auditors, userId) {
    const cycle = await prisma.auditCycle.findUnique({ where: { id } });
    if (!cycle) throw { status: 404, message: 'Audit cycle not found' };
    if (cycle.status === 'COMPLETED') throw { status: 400, message: 'Closed audits cannot be modified' };

    const updated = await prisma.auditCycle.update({
      where: { id },
      data: { auditors }
    });
    
    await activityLogService.log({
      userId,
      module: 'AUDIT',
      action: 'ASSIGN_AUDITORS',
      entityId: id
    });
    return updated;
  }

  async getCycles(filters = {}) {
    return await prisma.auditCycle.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' }
    });
  }

  async getDetails(id) {
    const cycle = await prisma.auditCycle.findUnique({
      where: { id },
      include: {
        results: {
          include: {
            asset: { select: { id: true, name: true, assetTag: true } },
            auditor: { select: { id: true, name: true, email: true } }
          }
        }
      }
    });
    if (!cycle) throw { status: 404, message: 'Audit cycle not found' };
    return cycle;
  }

  async submitVerification({ auditCycleId, assetId, auditorId, verificationStatus, remarks }) {
    const cycle = await prisma.auditCycle.findUnique({ where: { id: auditCycleId } });
    if (!cycle || cycle.status === 'COMPLETED') {
      throw { status: 400, message: 'Audit cycle not found or is closed' };
    }

    const existing = await prisma.auditResult.findFirst({
      where: { auditCycleId, assetId }
    });

    let result;
    if (existing) {
      result = await prisma.auditResult.update({
        where: { id: existing.id },
        data: { auditorId, verificationStatus, remarks }
      });
    } else {
      result = await prisma.auditResult.create({
        data: { auditCycleId, assetId, auditorId, verificationStatus, remarks }
      });
    }

    if (cycle.status !== 'IN_PROGRESS') {
      await prisma.auditCycle.update({ where: { id: auditCycleId }, data: { status: 'IN_PROGRESS' } });
    }
    
    await activityLogService.log({
      userId: auditorId,
      module: 'AUDIT',
      action: 'SUBMIT_VERIFICATION',
      entityId: result.id,
      metadata: { verificationStatus }
    });

    return result;
  }

  async closeCycle(id, userId) {
    const cycle = await prisma.auditCycle.findUnique({ where: { id }, include: { results: true } });
    if (!cycle) throw { status: 404, message: 'Audit cycle not found' };
    
    await prisma.$transaction(async (tx) => {
      await tx.auditCycle.update({
        where: { id },
        data: { status: 'COMPLETED' }
      });

      for (const res of cycle.results) {
        if (res.verificationStatus === 'MISSING') {
          await tx.asset.update({
            where: { id: res.assetId },
            data: { status: 'LOST' }
          });
        }
      }
    });

    const managers = await prisma.user.findMany({ where: { role: 'ASSET_MANAGER' } });
    for (const m of managers) {
      await notificationService.createNotification({
        userId: m.id,
        title: 'Audit Completed',
        message: `Audit cycle ${cycle.title} has been completed.`,
        type: 'AUDIT_COMPLETED'
      });
    }

    await activityLogService.log({
      userId,
      module: 'AUDIT',
      action: 'CLOSE_CYCLE',
      entityId: id
    });

    return { message: 'Audit cycle closed successfully' };
  }

  async generateDiscrepancyReport(id) {
    const cycle = await prisma.auditCycle.findUnique({
      where: { id },
      include: {
        results: {
          where: { verificationStatus: { not: 'VERIFIED' } },
          include: {
            asset: { select: { id: true, name: true, assetTag: true, location: true } }
          }
        }
      }
    });
    if (!cycle) throw { status: 404, message: 'Audit cycle not found' };
    return cycle.results;
  }
}

module.exports = new AuditService();
