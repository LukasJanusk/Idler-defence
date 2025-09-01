import express from 'express';
import cors from 'cors';
import { getHighscores, postHighscore } from './controllers/highscores.ts';

// const database = createDatabase(config.database);
const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());

app.get('/api/highscores', getHighscores);
app.post('/api/highscores', postHighscore);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
