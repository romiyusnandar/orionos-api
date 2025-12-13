import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';
import type { JwtPayload } from '../types';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decoded = verifyToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
    return;
  }

  // Allow ADMIN, FOUNDER, and CO_FOUNDER
  const adminRoles = ['ADMIN', 'FOUNDER', 'CO_FOUNDER'];
  if (!adminRoles.includes(req.user.role)) {
    res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
    return;
  }

  next();
};

// Middleware to allow admin or resource owner
export const requireAdminOrOwner = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
    return;
  }

  // Admin roles (ADMIN, FOUNDER, CO_FOUNDER) can access everything
  const adminRoles = ['ADMIN', 'FOUNDER', 'CO_FOUNDER'];
  if (adminRoles.includes(req.user.role)) {
    next();
    return;
  }

  // Non-admin users need ownership check (will be done in service layer)
  next();
};
