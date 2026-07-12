const allocationService = require('../services/allocation.service');

class AllocationController {
  async allocateAsset(req, res, next) {
    try {
      const { assetId, userId, departmentId } = req.body;
      const allocation = await allocationService.allocateAsset({ assetId, userId, departmentId });
      res.status(201).json(allocation);
    } catch (error) {
      next(error);
    }
  }

  async getAllocationById(req, res, next) {
    try {
      const { id } = req.params;
      const allocation = await allocationService.getAllocationById(id);
      res.json(allocation);
    } catch (error) {
      next(error);
    }
  }

  async getAllAllocations(req, res, next) {
    try {
      const allocations = await allocationService.getAllAllocations();
      res.json(allocations);
    } catch (error) {
      next(error);
    }
  }

  async getAllocationsByEmployee(req, res, next) {
    try {
      const { userId } = req.params;
      const allocations = await allocationService.getAllocationsByEmployee(userId);
      res.json(allocations);
    } catch (error) {
      next(error);
    }
  }

  async getAllocationsByDepartment(req, res, next) {
    try {
      const { departmentId } = req.params;
      const allocations = await allocationService.getAllocationsByDepartment(departmentId);
      res.json(allocations);
    } catch (error) {
      next(error);
    }
  }

  async returnAsset(req, res, next) {
    try {
      const { assetId } = req.body;
      const result = await allocationService.returnAsset(assetId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async notifyOverdue(req, res, next) {
    try {
      const count = await allocationService.notifyOverdueReturns();
      res.json({ message: `Notified ${count} overdue returns.` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AllocationController();
