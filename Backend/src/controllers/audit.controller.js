const auditService = require('../services/audit.service');

class AuditController {
  async createCycle(req, res, next) {
    try {
      const cycle = await auditService.createCycle({ ...req.body, userId: req.user.id });
      res.status(201).json(cycle);
    } catch (error) {
      next(error);
    }
  }

  async updateCycle(req, res, next) {
    try {
      const cycle = await auditService.updateCycle(req.params.id, req.body, req.user.id);
      res.json(cycle);
    } catch (error) {
      next(error);
    }
  }

  async assignAuditors(req, res, next) {
    try {
      const cycle = await auditService.assignAuditors(req.params.id, req.body.auditors, req.user.id);
      res.json(cycle);
    } catch (error) {
      next(error);
    }
  }

  async getCycles(req, res, next) {
    try {
      const { status } = req.query;
      const filters = status ? { status } : {};
      const cycles = await auditService.getCycles(filters);
      res.json(cycles);
    } catch (error) {
      next(error);
    }
  }

  async getDetails(req, res, next) {
    try {
      const cycle = await auditService.getDetails(req.params.id);
      res.json(cycle);
    } catch (error) {
      next(error);
    }
  }

  async submitVerification(req, res, next) {
    try {
      const result = await auditService.submitVerification({ ...req.body, auditorId: req.user.id });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async closeCycle(req, res, next) {
    try {
      const result = await auditService.closeCycle(req.params.id, req.user.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getDiscrepancyReport(req, res, next) {
    try {
      const report = await auditService.generateDiscrepancyReport(req.params.id);
      res.json(report);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuditController();
