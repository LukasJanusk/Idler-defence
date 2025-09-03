import { useGameStore } from '@/store';
import { useEffect, useState } from 'react';
import GameOverForm from './GameOverForm';
import type { Highscores, Score } from '@/types';
import HighscoresComponent from '../reusable/HighscoresComponent';

export default function GameOver() {
  const gameOver = useGameStore((store) => store.gameOver);
  const handleGameOver = useGameStore((store) => store.handleGameOver);
  const score = useGameStore((store) => store.score);
  const [userScore, setUserScore] = useState<Score | null>(null);
  const [highscore, setHighscore] = useState<Highscores | null>(null);

  useEffect(() => {
    const reset = () => {
      if (!gameOver) {
        setUserScore(null);
        setHighscore(null);
      }
    };
    reset();
  }, [gameOver]);

  if (!gameOver) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {highscore && userScore ? (
        <HighscoresComponent
          score={userScore}
          highscores={highscore}
          onClose={() => {
            handleGameOver();
          }}
        />
      ) : (
        <GameOverForm
          score={score}
          onSubmit={(value: Highscores, score: Score) => {
            setHighscore(value);
            setUserScore(score);
          }}
          onClose={() => {
            handleGameOver();
          }}
        />
      )}
    </div>
  );
}
