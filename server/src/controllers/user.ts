import { parseUserInsertable } from '../schema';
import type { Request, Response } from 'express';
import { useUserRepository } from '../repository/index';
import type { Database } from '@/database';
import { ZodError, prettifyError } from 'zod';

export const postUser = (db: Database) => {
  return async (req: Request, res: Response) => {
    const repo = useUserRepository(db);

    console.log('POST ' + '/api/user');
    try {
      const data = parseUserInsertable({
        ...req.body,
        date: new Date().toISOString(),
      });
      const newUser = await repo.createUser(data);
      res.status(201).json(newUser);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json(prettifyError(err));
      }
      res.status(400).json(err);
    }
  };
};
export const getHighscores = (db: Database) => {
  return async (req: Request, res: Response) => {
    const repo = useUserRepository(db);
    console.log('GET ' + '/api/user');
    try {
      const user = await repo.getUser(req.body.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  };
};
