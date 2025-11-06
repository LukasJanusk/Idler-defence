import jwt from 'jsonwebtoken';
import config from '@/config';
import type { NextFunction, Request, Response } from 'express';
import { parseTokenPayload } from './schema';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, config.auth.tokenKey);
    const parsed = parseTokenPayload(decoded);
    req.user = parsed.user;

    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
