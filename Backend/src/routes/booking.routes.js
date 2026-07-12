const { Router } = require('express');
const { z } = require('zod');
const { authenticate, validate } = require('../middleware');
const bookingController = require('../controllers/booking.controller');

const router = Router();

const CreateBookingSchema = z.object({
  assetId: z.string().uuid(),
  title: z.string().min(1),
  purpose: z.string().optional(),
  startTime: z.string().transform(v => new Date(v)),
  endTime: z.string().transform(v => new Date(v))
});

const UpdateBookingSchema = z.object({
  title: z.string().min(1).optional(),
  purpose: z.string().optional(),
  startTime: z.string().transform(v => new Date(v)).optional(),
  endTime: z.string().transform(v => new Date(v)).optional()
});

router.use(authenticate);

router.post('/', validate(CreateBookingSchema), bookingController.create);
router.get('/', bookingController.getAll);
router.get('/calendar/:assetId', bookingController.getCalendar);
router.get('/:id', bookingController.get);
router.put('/:id', validate(UpdateBookingSchema), bookingController.update);
router.post('/:id/cancel', bookingController.cancel);

module.exports = router;
