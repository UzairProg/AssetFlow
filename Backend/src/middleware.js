const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-assetflow-hackathon';

// Auth middleware
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// RBAC middleware
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
}

// Validation middleware helper
function validate(schema, source = 'body') {
  return (req, res, next) => {
    const data = source === 'query' ? req.query : req.body;
    const result = schema.safeParse(data);
    if (!result.success) {
      const formatted = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return res.status(400).json({ error: `Validation failed: ${formatted}` });
    }
    // Replace req.body or req.query with the validated and cast value (helps with number conversion etc.)
    if (source === 'query') {
      req.query = result.data;
    } else {
      req.body = result.data;
    }
    next();
  };
}

// Global error handler middleware
function errorHandler(err, req, res, next) {
  console.error(err);

  // Prisma duplicate key / unique constraint error
  if (err.code === 'P2002') {
    const fields = err.meta?.target?.join(', ') || 'fields';
    return res.status(409).json({ error: `Conflict: Unique constraint failed on ${fields}` });
  }

  // Prisma record not found error
  if (err.code === 'P2025') {
    return res.status(404).json({ error: err.meta?.cause || 'Record not found' });
  }

  // Zod parsing error (if thrown directly)
  if (err.name === 'ZodError') {
    const formatted = err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    return res.status(400).json({ error: `Validation failed: ${formatted}` });
  }

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
}

module.exports = {
  authenticate,
  authorize,
  validate,
  errorHandler
};
