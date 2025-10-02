import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface JwtUser { id: string; role: string; email: string; }

export function signAccess(user: JwtUser) {
  return jwt.sign(user, process.env.JWT_ACCESS_SECRET!, { expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m' });
}
export function signRefresh(user: JwtUser) {
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET!, { expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d' });
}

export function requireAuth(req: Request & { user?: JwtUser }, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing Authorization header' });
  const token = auth.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JwtUser;
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function requireRole(...roles: string[]) {
  return (req: Request & { user?: JwtUser }, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}
