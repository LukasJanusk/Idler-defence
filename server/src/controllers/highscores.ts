import { parsePostScoreSchema } from '../schema';
import type { Request, Response } from 'express';
import { useScoreRepository } from '../repository/index';
import type { Database } from '@/database';
import { ZodError, prettifyError } from 'zod';
import { Router } from 'express';

export const highscoresController = (db: Database) => {
  const repo = useScoreRepository(db);
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    console.log('POST ' + '/api/highscores');
    try {
      const data = parsePostScoreSchema(req.body);
      const insertedData = await repo.createScore(data);
      const highscores = await repo.getScoresAround(
        insertedData.id,
        insertedData.score,
        5
      );
      res
        .status(201)
        .json({ highscores: highscores, originalScore: insertedData });
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json(prettifyError(err));
      }
      res.status(400).json(err);
    }
  });

  router.get('/', async (_req: Request, res: Response) => {
    console.log('GET ' + '/api/highscores');
    try {
      const scores = await repo.getAllScores();
      res.status(201).json(scores);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  return router;
};
