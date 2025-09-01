import { parsePostScoreSchema } from '../schema.ts';
import type { Request, Response } from 'express';
import { repo } from '../repository/index.ts';

export const postHighscore = async (req: Request, res: Response) => {
  try {
    const data = parsePostScoreSchema(req.body);
    const insertedData = await repo.createScore(data);
    const highscores = await repo.getScoresAround(
      insertedData.id,
      insertedData.score,
      5,
    );
    res.status(201).json(highscores);
  } catch (err) {
    res.status(400).json(err);
  }
};
export const getHighscores = async (req: Request, res: Response) => {
  res.json([
    { id: 1, name: 'Hero', score: 123333, date: new Date().toISOString() },
  ]);
};
