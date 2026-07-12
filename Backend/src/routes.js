const { Router } = require('express');
const { z } = require('zod');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('./db');
const { authenticate, authorize, validate } = require('./middleware');
const bookingRoutes = require('./routes/booking.routes');
const allocationRoutes = require('./routes/allocation.routes');
const transferRoutes = require('./routes/transfer.routes');
const maintenanceRoutes = require('./routes/maintenance.routes');
const auditRoutes = require('./routes/audit.routes');
const notificationRoutes = require('./routes/notification.routes');
const activityLogRoutes = require('./routes/activity-log.routes');
const reportRoutes = require('./routes/report.routes');
const activityLogService = require('./services/activity-log.service');

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-assetflow-hackathon';

// --- VALIDATION SCHEMAS ---

const SignupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

const DepartmentSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  parentDepartmentId: z.string().uuid().nullable().optional(),
  headId: z.string().uuid().nullable().optional()
});

const CategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  description: z.string().optional().nullable()
});

const AssetSchema = z.object({
  assetTag: z.string().min(1, 'Asset tag is required'),
  name: z.string().min(1, 'Asset name is required'),
  categoryId: z.string().uuid('Invalid category ID'),
  serialNumber: z.string().optional().nullable(),
  acquisitionDate: z.string().transform((val) => new Date(val)),
  acquisitionCost: z.number().positive('Acquisition cost must be positive'),
  condition: z.string().min(1, 'Condition is required'),
  location: z.string().min(1, 'Location is required'),
  status: z.enum(['AVAILABLE', 'ALLOCATED', 'RESERVED', 'UNDER_MAINTENANCE', 'LOST', 'RETIRED', 'DISPOSED']).optional(),
  departmentId: z.string().uuid().nullable().optional(),
  assignedToId: z.string().uuid().nullable().optional(),
  sharedBookable: z.boolean().optional()
});

const AssetStatusSchema = z.object({
  status: z.enum(['AVAILABLE', 'ALLOCATED', 'RESERVED', 'UNDER_MAINTENANCE', 'LOST', 'RETIRED', 'DISPOSED'])
});

const PromotionSchema = z.object({
  role: z.enum(['DEPARTMENT_HEAD', 'ASSET_MANAGER', 'EMPLOYEE', 'ADMIN']),
  departmentId: z.string().uuid().nullable().optional()
});

// --- HELPER WRAPPER FOR ASYNC HANDLERS ---
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// --- AUTH ROUTE HANDLERS ---

router.post('/auth/signup', validate(SignupSchema), asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'EMPLOYEE' // Hardcoded per requirement: signup always creates EMPLOYEE
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true
    }
  });

  res.status(201).json(user);
}));

router.post('/auth/login', validate(LoginSchema), asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.status !== 'ACTIVE') {
    return res.status(401).json({ error: 'Invalid credentials or inactive account' });
  }

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
}));

router.get('/auth/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

// --- ORG SETUP ROUTE HANDLERS (DEPARTMENTS) ---

router.use('/org', authenticate);

router.route('/org/departments')
  .get(asyncHandler(async (req, res) => {
    const list = await prisma.department.findMany({
      include: {
        head: { select: { id: true, name: true, email: true } },
        parentDepartment: { select: { id: true, name: true } }
      }
    });
    res.json(list);
  }))
  .post(authorize('ADMIN'), validate(DepartmentSchema), asyncHandler(async (req, res) => {
    const dept = await prisma.department.create({ data: req.body });
    res.status(201).json(dept);
  }));

router.route('/org/departments/:id')
  .put(authorize('ADMIN'), validate(DepartmentSchema), asyncHandler(async (req, res) => {
    const { id } = req.params;
    const dept = await prisma.department.update({
      where: { id },
      data: req.body
    });
    res.json(dept);
  }))
  .delete(authorize('ADMIN'), asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.department.delete({ where: { id } });
    res.status(204).end();
  }));

// --- ORG SETUP ROUTE HANDLERS (CATEGORIES) ---

router.route('/org/categories')
  .get(asyncHandler(async (req, res) => {
    const list = await prisma.assetCategory.findMany();
    res.json(list);
  }))
  .post(authorize('ADMIN', 'ASSET_MANAGER'), validate(CategorySchema), asyncHandler(async (req, res) => {
    const cat = await prisma.assetCategory.create({ data: req.body });
    res.status(201).json(cat);
  }));

router.route('/org/categories/:id')
  .put(authorize('ADMIN', 'ASSET_MANAGER'), validate(CategorySchema), asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cat = await prisma.assetCategory.update({
      where: { id },
      data: req.body
    });
    res.json(cat);
  }))
  .delete(authorize('ADMIN', 'ASSET_MANAGER'), asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.assetCategory.delete({ where: { id } });
    res.status(204).end();
  }));

// --- EMPLOYEE DIRECTORY & PROMOTIONS ---

router.get('/org/employees', asyncHandler(async (req, res) => {
  const { search } = req.query;
  const where = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } }
    ];
  }
  const list = await prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      department: { select: { id: true, name: true } },
      createdAt: true
    }
  });
  res.json(list);
}));

router.post('/org/employees/:id/promote', authorize('ADMIN'), validate(PromotionSchema), asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role, departmentId } = req.body;

  const data = { role };
  if (departmentId !== undefined) {
    data.departmentId = departmentId;
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true, role: true, departmentId: true }
  });

  // If promoted to DEPARTMENT_HEAD, make them head of that department
  if (role === 'DEPARTMENT_HEAD' && departmentId) {
    await prisma.department.update({
      where: { id: departmentId },
      data: { headId: id }
    });
  }

  res.json(updatedUser);
}));

// --- ASSET MANAGEMENT ROUTE HANDLERS ---

router.use('/assets', authenticate);

router.route('/assets')
  .get(asyncHandler(async (req, res) => {
    const { search, categoryId, status, departmentId, assignedToId } = req.query;
    
    const where = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { assetTag: { contains: search, mode: 'insensitive' } },
        { serialNumber: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (categoryId) where.categoryId = categoryId;
    if (status) where.status = status;
    if (departmentId) where.departmentId = departmentId;
    if (assignedToId) where.assignedToId = assignedToId;

    const list = await prisma.asset.findMany({
      where,
      include: {
        category: { select: { id: true, name: true } },
        department: { select: { id: true, name: true } },
        assignedTo: { select: { id: true, name: true, email: true } }
      }
    });
    res.json(list);
  }))
  .post(authorize('ADMIN', 'ASSET_MANAGER'), validate(AssetSchema), asyncHandler(async (req, res) => {
    const asset = await prisma.asset.create({ data: req.body });
    await activityLogService.log({
      userId: req.user.id,
      module: 'ASSETS',
      action: 'CREATE_ASSET',
      entityId: asset.id
    });
    res.status(201).json(asset);
  }));

router.route('/assets/:id')
  .get(asyncHandler(async (req, res) => {
    const { id } = req.params;
    const asset = await prisma.asset.findUnique({
      where: { id },
      include: {
        category: true,
        department: true,
        assignedTo: { select: { id: true, name: true, email: true } }
      }
    });
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.json(asset);
  }))
  .put(authorize('ADMIN', 'ASSET_MANAGER'), validate(AssetSchema), asyncHandler(async (req, res) => {
    const { id } = req.params;
    const asset = await prisma.asset.update({
      where: { id },
      data: req.body
    });
    await activityLogService.log({
      userId: req.user.id,
      module: 'ASSETS',
      action: 'UPDATE_ASSET',
      entityId: asset.id
    });
    res.json(asset);
  }))
  .patch(authorize('ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD'), validate(AssetStatusSchema), asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const asset = await prisma.asset.update({
      where: { id },
      data: { status }
    });
    await activityLogService.log({
      userId: req.user.id,
      module: 'ASSETS',
      action: 'PATCH_ASSET_STATUS',
      entityId: asset.id,
      metadata: { status }
    });
    res.json(asset);
  }));

// --- ALLOCATION ROUTE HANDLERS ---
router.use('/allocations', allocationRoutes);

// --- TRANSFER ROUTE HANDLERS ---
router.use('/transfers', transferRoutes);

// --- BOOKING ROUTE HANDLERS ---
router.use('/bookings', bookingRoutes);

// --- MAINTENANCE ROUTE HANDLERS ---
router.use('/maintenance', maintenanceRoutes);

// --- AUDIT ROUTE HANDLERS ---
router.use('/audits', auditRoutes);

// --- NOTIFICATION ROUTE HANDLERS ---
router.use('/notifications', notificationRoutes);

// --- ACTIVITY LOG ROUTE HANDLERS ---
router.use('/activity-logs', activityLogRoutes);

// --- REPORT ROUTE HANDLERS ---
router.use('/reports', reportRoutes);

// --- DASHBOARD ROUTE HANDLERS ---

router.get('/dashboard/kpis', authenticate, asyncHandler(async (req, res) => {
  const [totalUsers, totalAssets, availableAssets, allocatedAssets, totalCategories] = await prisma.$transaction([
    prisma.user.count({ where: { status: 'ACTIVE' } }),
    prisma.asset.count(),
    prisma.asset.count({ where: { status: 'AVAILABLE' } }),
    prisma.asset.count({ where: { status: 'ALLOCATED' } }),
    prisma.asset.count()
  ]);

  res.json({
    totalUsers,
    totalAssets,
    availableAssets,
    allocatedAssets,
    totalCategories
  });
}));

router.get('/dashboard/recent', authenticate, asyncHandler(async (req, res) => {
  const recent = await prisma.asset.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      category: { select: { name: true } },
      assignedTo: { select: { name: true } }
    }
  });
  res.json(recent);
}));

router.get('/dashboard/returns', authenticate, asyncHandler(async (req, res) => {
  // Since returning a loan/return transactions schema is not model-defined,
  // we return recently allocated assets that might be due/allocated.
  const returns = await prisma.asset.findMany({
    where: { status: 'ALLOCATED' },
    take: 5,
    orderBy: { acquisitionDate: 'asc' }, // oldest allocations first as proxy for returning soonest
    include: {
      category: { select: { name: true } },
      assignedTo: { select: { name: true } }
    }
  });
  res.json(returns);
}));

module.exports = router;
