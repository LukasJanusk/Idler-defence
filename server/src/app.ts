import type { Response } from 'express';
import express from 'express';
import cors from 'cors';
import { getHighscores, postHighscore } from './controllers/highscores';
import type { Database } from './database';

export default function createApp(db: Database) {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.get('/api/highscores', getHighscores(db));
  app.post('/api/highscores', postHighscore(db));
  app.use('/api/health', (_, res: Response) => {
    res.status(200).send('OK');
  });
  return app;
}
