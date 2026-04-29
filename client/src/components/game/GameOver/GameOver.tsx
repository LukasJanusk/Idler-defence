import { useGameStore } from '@/store';
import { useEffect, useState } from 'react';
import GameOverForm from './GameOverForm';
import type { Highscores, Score } from '@/types';
import HighscoresComponent from '@/components/reusable/HighscoresComponent';
import Button from '@/components/reusable/Button';

export default function GameOver() {
  const gameOver = useGameStore((store) => store.gameOver);
  const gameOverReason = useGameStore((store) => store.gameOverReason);
  const currentLevel = useGameStore((store) => store.currentLevel);
  const handleGameOver = useGameStore((store) => store.handleGameOver);
  const setGameStarted = useGameStore((store) => store.setGameStarted);
  const score = useGameStore((store) => store.score);
  const [userScore, setUserScore] = useState<Score | null>(null);
  const [highscore, setHighscore] = useState<Highscores | null>(null);

  const isTutorialComplete =
    currentLevel === 0 && gameOverReason === 'level-complete';

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
      {isTutorialComplete ? (
        <div className="relative max-h-[512px] w-[360px] border-4 border-medieval-silver bg-medieval-stone p-6 text-medieval-parchment shadow-xl">
          <h1 className="mb-3 text-center text-[34px] font-bold text-medieval-parchment">
            Tutorial Complete
          </h1>
          <hr />
          <p className="my-6 text-center text-lg leading-relaxed text-medieval-parchment">
            You finished the tutorial. Return to level select to start Level 1.
          </p>
          <Button
            aria-label="Return to level select"
            onClick={() => {
              handleGameOver();
              setGameStarted(false);
            }}
            className="w-full"
          >
            Back To Level Select
          </Button>
        </div>
      ) : highscore && userScore ? (
        <HighscoresComponent
          score={userScore}
          highscores={highscore}
          onClose={() => {
            handleGameOver();
            setGameStarted(false);
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
            setGameStarted(false);
          }}
        />
      )}
    </div>
  );
}
