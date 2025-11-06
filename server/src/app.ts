import type { Response } from 'express';
import express from 'express';
import cors from 'cors';
import { userController } from './controllers/user';
import { highscoresController } from './controllers/highscores';
import type { Database } from './database';

export default function createApp(db: Database) {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api/user', userController(db));
  app.use('/api/highscores', highscoresController(db));
  app.use('/api/health', (_, res: Response) => {
    res.status(200).send('OK');
  });
  return app;
}
