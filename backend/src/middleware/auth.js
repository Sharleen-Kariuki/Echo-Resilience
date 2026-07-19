import jwt from 'jsonwebtoken';

/**
 * Verifies the Bearer token in the Authorization header.
 * Attaches `req.user = { id, email, role, fullName }` on success.
 */
export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: no token provided' });
  }

  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized: invalid or expired token' });
  }
};

/**
 * Must be used AFTER authenticate.
 * Only allows admin and superadmin roles through.
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user || !['admin', 'superadmin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden: admin access required' });
  }
  next();
};
