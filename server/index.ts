import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());

app.get('/api/highscores', (req: Request, res: Response) => {
  res.json([
    { id: 1, name: 'Hero', score: 123333, date: new Date().toISOString() },
  ]);
});
app.post('/api/highscores', (req, res) => {
  res.status(201).json({
    message: 'Highscore saved!',
    data: 111,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
