import type { LevelSelectable } from '@/types';
import LevelSelectCard from './LevelSelectCard';
import { useState } from 'react';
import { useGameStore } from '@/store';
import LevelSelectButton from './LevelSelectButton';
import Button from '../reusable/Button';
import useSmoothScroll from '@/hooks/useSmoothScroll';

type Props = {
  levels: LevelSelectable[];
  startGame: (enterGame: boolean) => void;
  returnToMenu: () => void;
};

export default function LevelSelectScreen({
  levels,
  startGame,
  returnToMenu,
}: Props) {
  const [selectedLevel, setSelectedLevel] = useState<number>(
    levels[0]?.id || 0,
  );
  const setCurrentLevel = useGameStore((store) => store.setCurrentLevel);
  const handleLevelSelect = (levelId: number) => {
    setCurrentLevel(levelId);
  };

  const [containerRef] = useSmoothScroll<HTMLDivElement>(selectedLevel);

  return (
    <div
      className={`relative flex h-full w-full flex-nowrap items-center justify-center gap-1 bg-medieval-silver px-4`}
    >
      <div className="absolute top-4 text-2xl font-bold">
        {levels[selectedLevel]?.name}
      </div>
      <div
        ref={containerRef}
        className="scrollbar-hide flex w-full flex-nowrap gap-2 overflow-x-auto scroll-smooth p-2 py-10"
      >
        {levels.map((level) => (
          <div key={level.id}>
            <LevelSelectCard
              level={level.id}
              selected={selectedLevel}
              image={level.image}
              locked={level.locked}
              setSelected={() => {
                if (level.locked) return;
                setSelectedLevel(level.id);
                handleLevelSelect(level.id);
              }}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-4">
        <Button onClick={() => returnToMenu()}>Main Menu</Button>
      </div>
      <div className="absolute bottom-4 right-4">
        <LevelSelectButton onClick={() => startGame(true)} />
      </div>
    </div>
  );
}
