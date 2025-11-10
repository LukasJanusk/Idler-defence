import { parseUserInsertable, parseUserLoginData } from '../schema';
import { Router, type Request, type Response } from 'express';
import { useUserRepository } from '../repository/index';
import type { Database } from '@/database';
import { ZodError, prettifyError } from 'zod';
import { compare, hash } from 'bcrypt';
import config from '@/config';
import jwt from 'jsonwebtoken';

export const userController = (db: Database) => {
  const router = Router();
  const repo = useUserRepository(db);

  router.post('/', async (req: Request, res: Response) => {
    console.log('POST ' + '/api/user');
    try {
      const data = parseUserInsertable({
        ...req.body,
        date: new Date().toISOString(),
      });

      const passwordHash = await hash(data.password, config.auth.passwordCost);
      const newUser = await repo.createUser({
        ...data,
        password: passwordHash,
      });
      res.status(201).json(newUser);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json(prettifyError(err));
      }
      res.status(400).json(err);
    }
  });

  router.get('/:id', async (req: Request, res: Response) => {
    console.log('GET ' + '/api/user/:id');
    try {
      const userId = req.params.id || req.query.id;
      if (!userId)
        return res.status(400).json({ error: 'User ID is required' });
      const user = await repo.getUser(Number(userId));

      res.status(200).json({ id: user.id, email: user.email, name: user.name });
    } catch (err) {
      res.status(404).json({ error: 'User not found' });
    }
  });

  router.post('/login', async (req: Request, res: Response) => {
    try {
      const data = parseUserLoginData({
        ...req.body,
        date: new Date().toISOString(),
      });
      const user = await repo.getUserByEmail(data.email);

      const match = await compare(data.password, user.password);
      if (!match) res.status(401).json({ message: 'Incorrect password' });

      const tokenPayload = { user: { id: user.id } };

      const accessToken = jwt.sign(tokenPayload, config.auth.tokenKey, {
        expiresIn: '7d',
      });

      res.status(200).json(accessToken);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json(prettifyError(err));
      }
      res.status(400).json(err);
    }
  });

  return router;
};
