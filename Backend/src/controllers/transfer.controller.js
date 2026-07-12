const transferService = require('../services/transfer.service');

class TransferController {
  async createRequest(req, res, next) {
    try {
      const { assetId, requestedHolderId, remarks } = req.body;
      const requestedById = req.user.id;
      const request = await transferService.createTransferRequest({
        assetId,
        requestedHolderId,
        requestedById,
        remarks
      });
      res.status(201).json(request);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const { status, assetId } = req.query;
      const filters = {};
      if (status) filters.status = status;
      if (assetId) filters.assetId = assetId;

      const requests = await transferService.getAllRequests(filters);
      res.json(requests);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const request = await transferService.getRequestById(id);
      res.json(request);
    } catch (error) {
      next(error);
    }
  }

  async getByUser(req, res, next) {
    try {
      const { userId } = req.params;
      const requests = await transferService.getRequestsByUser(userId);
      res.json(requests);
    } catch (error) {
      next(error);
    }
  }

  async approve(req, res, next) {
    try {
      const { id } = req.params;
      const approvedById = req.user.id;
      const result = await transferService.approveRequest(id, approvedById);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async reject(req, res, next) {
    try {
      const { id } = req.params;
      const { remarks } = req.body;
      const result = await transferService.rejectRequest(id, remarks);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TransferController();
