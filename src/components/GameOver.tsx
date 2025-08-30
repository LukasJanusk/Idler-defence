import { useGameStore } from '@/store';
import { X } from 'lucide-react';

export default function GameOver() {
  const gameOver = useGameStore((store) => store.gameOver);
  const handleGameOver = useGameStore((store) => store.handleGameOver);
  const score = useGameStore((store) => store.score);

  return (
    <>
      {!gameOver ? (
        <></>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-[320px] rounded-md border-2 border-medieval-gold bg-medieval-parchment p-4 shadow-xl">
            <h1 className="text-center text-2xl font-bold text-medieval-dark">
              GAME OVER!
            </h1>
            <p className="text-lg">
              Your score:{' '}
              <span className="text-2xl text-medieval-emerald">{score}</span>
            </p>
            <form
              className="flex flex-col gap-2 text-medieval-dark"
              onSubmit={() => handleGameOver()}
            >
              <label htmlFor="name">Name:</label>
              <input
                className="rounded-md border border-medieval-dark/40 bg-medieval-stoneLight/40 px-3 py-2 text-medieval-dark placeholder-medieval-dark/50 outline-none transition focus:border-medieval-emerald focus:bg-medieval-parchment focus:ring-2 focus:ring-medieval-emerald"
                name="name"
                type="text"
                placeholder="Enter your name"
              />
              <button
                className="active-scale-95 rounded-lg bg-emerald-700 p-4 text-xl font-bold transition-all duration-200 hover:scale-105 hover:bg-emerald-600"
                type="submit"
              >
                Submit
              </button>
            </form>
            <button
              className="absolute right-2 top-2 rounded-sm text-medieval-stoneCrimson transition-transform duration-200 hover:scale-110 hover:bg-medieval-stoneCrimson/30 active:scale-95"
              onClick={() => alert('Reset or submit nto yet implemented')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
