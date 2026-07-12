const maintenanceService = require('../services/maintenance.service');

class MaintenanceController {
  async raiseRequest(req, res, next) {
    try {
      const { assetId, issueDescription, priority, attachments, remarks } = req.body;
      const reportedById = req.user.id;
      const request = await maintenanceService.raiseRequest({
        assetId, reportedById, issueDescription, priority, attachments, remarks
      });
      res.status(201).json(request);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const { status, priority, assetId } = req.query;
      const filters = {};
      if (status) filters.status = status;
      if (priority) filters.priority = priority;
      if (assetId) filters.assetId = assetId;

      const requests = await maintenanceService.getAllRequests(filters);
      res.json(requests);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const reqDoc = await maintenanceService.getRequestById(id);
      res.json(reqDoc);
    } catch (error) {
      next(error);
    }
  }

  async approve(req, res, next) {
    try {
      const { id } = req.params;
      const result = await maintenanceService.approveRequest(id, req.user.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async reject(req, res, next) {
    try {
      const { id } = req.params;
      const { remarks } = req.body;
      const result = await maintenanceService.rejectRequest(id, req.user.id, remarks);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async assignTechnician(req, res, next) {
    try {
      const { id } = req.params;
      const { assignedTechnicianId } = req.body;
      const result = await maintenanceService.assignTechnician(id, assignedTechnicianId, req.user.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateProgress(req, res, next) {
    try {
      const { id } = req.params;
      const { status, remarks } = req.body;
      const result = await maintenanceService.updateProgress(id, status, remarks, req.user.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async resolve(req, res, next) {
    try {
      const { id } = req.params;
      const { remarks } = req.body;
      const result = await maintenanceService.resolveRequest(id, remarks, req.user.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MaintenanceController();
