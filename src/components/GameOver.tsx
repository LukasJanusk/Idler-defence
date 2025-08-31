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
          <div className="relative w-[320px] rounded border-4 border-medieval-silver bg-medieval-stone p-4 text-medieval-parchment shadow-xl">
            <h1 className="mb-2 text-center text-[40px] font-bold text-medieval-parchment">
              GAME OVER!
            </h1>
            <hr />
            <p className="my-4 text-lg text-medieval-parchment">
              Score:
              <span className="ml-2 text-[36px]">{score}</span>
            </p>
            <form
              className="flex flex-col gap-2 text-medieval-parchment"
              onSubmit={(e) => {
                e.preventDefault();

                // send data to server
                handleGameOver();
              }}
            >
              <label htmlFor="name">Name:</label>
              <input
                className="bg-medieval-dark/10 px-3 py-2 text-medieval-parchment placeholder-medieval-parchment/50 outline-none ring-2 ring-medieval-silver/40 transition focus:bg-medieval-stone focus:ring-2 focus:ring-medieval-silver"
                name="name"
                type="text"
                placeholder="Enter your name"
              />
              <button
                className="mt-2 border-2 border-medieval-silver bg-emerald-700 p-4 text-xl font-bold transition-all duration-200 hover:scale-105 hover:bg-emerald-600 active:scale-95 active:bg-medieval-stoneCrimson"
                type="submit"
              >
                Submit
              </button>
            </form>
            <button
              aria-label="Close modal"
              className="absolute right-2 top-2 rounded-sm bg-medieval-stoneLight/30 text-medieval-stoneCrimson transition-transform duration-200 hover:scale-110 hover:bg-red-300/50 active:scale-95"
              onClick={() => handleGameOver()}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
