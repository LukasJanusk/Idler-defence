import type { Highscores, Score } from '@/types';
import { X } from 'lucide-react';
import HighscoresContainer from './HighscoresContainer';

type Props = {
  score?: Score;
  highscores: Highscores;
  onClose?: () => void;
};
export default function HighscoresComponent({
  score,
  highscores,
  onClose,
}: Props) {
  return (
    <HighscoresContainer>
      <h1 className="my-2 text-2xl font-bold">Highscores</h1>
      <div className="w-full border-2 border-medieval-silver">
        <li className="grid grid-cols-4 bg-medieval-stoneCrimson px-2 py-1 text-base font-bold text-medieval-silver">
          <div className="flex justify-start">Rank</div>
          <div className="flex justify-start">Name</div>
          <div className="flex justify-start">Score</div>
          <div className="flex justify-start">Date</div>
        </li>
        <ul
          className="h-full max-h-[400px] w-full overflow-auto overflow-x-hidden text-base focus:outline-none"
          tabIndex={0}
        >
          {highscores
            .sort((a, b) => a.rank - b.rank)
            .map((s) => {
              const bgStyles = `${s.id === score?.id ? 'bg-medieval-silver/30' : 'bg-medieval-stone'}`;
              return (
                <li
                  key={s.id}
                  className={`grid grid-cols-4 items-end px-2 py-1 ${bgStyles}`}
                >
                  <div className="flex justify-start">{s.rank}.</div>
                  <div className="flex justify-start">{s.name}</div>
                  <div className="flex justify-start">{s.score}</div>
                  <div className="flex justify-start">
                    {new Date(s.date).toLocaleDateString()}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      {onClose && (
        <button
          aria-label="Close modal"
          className="absolute right-2 top-2 rounded-sm bg-medieval-stoneLight/30 text-medieval-stoneCrimson transition-transform duration-200 hover:scale-110 hover:bg-red-300/50 active:scale-95"
          onClick={() => onClose()}
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </HighscoresContainer>
  );
}
