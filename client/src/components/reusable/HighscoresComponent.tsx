import type { Highscores, Score } from '@/types';
import { X } from 'lucide-react';

type Props = {
  score: Score;
  highscores: Highscores;
  onClose?: () => void;
};
export default function HighscoresComponent({
  score,
  highscores,
  onClose,
}: Props) {
  return (
    <div className="relative max-h-[512px] min-h-[256px] w-[512px] border-4 border-medieval-silver bg-medieval-stone p-4 text-medieval-parchment shadow-xl">
      <h1 className="my-2 text-xl font-bold">Highscores</h1>
      <ul
        className="max-h-[420px] overflow-auto border-2 border-medieval-silver focus:outline-none"
        tabIndex={0}
      >
        <li className="grid grid-cols-4 justify-between bg-medieval-stoneCrimson px-2 py-1 font-bold text-medieval-silver">
          <div>Rank</div>
          <div>Name</div>
          <div>Score</div>
          <div>Date</div>
        </li>
        {highscores
          .sort((a, b) => a.rank - b.rank)
          .map((s) => {
            const bgStyles = `${s.id === score.id ? 'bg-medieval-silver/30' : 'bg-medieval-stone'}`;
            return (
              <li
                key={s.id}
                className={`grid grid-cols-4 items-end px-2 py-1 ${bgStyles}`}
              >
                <div>{s.rank}</div>
                <div>{s.name}</div>
                <div>{s.score}</div>
                <div>{new Date(s.date).toLocaleDateString()}</div>
              </li>
            );
          })}
      </ul>
      {onClose && (
        <button
          aria-label="Close modal"
          className="absolute right-2 top-2 rounded-sm bg-medieval-stoneLight/30 text-medieval-stoneCrimson transition-transform duration-200 hover:scale-110 hover:bg-red-300/50 active:scale-95"
          onClick={() => onClose()}
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
