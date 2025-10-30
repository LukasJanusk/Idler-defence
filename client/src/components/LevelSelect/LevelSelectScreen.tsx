import type { LevelSelectable } from '@/types';
import LevelSelectCard from './LevelSelectCard';
import { useState } from 'react';
import { useGameStore } from '@/store';
import useSmoothScroll from '@/hooks/useSmoothScroll';
import LevelScreenButton from './LevelScreenButton';
import { ArrowBigRightIcon, ArrowBigLeftIcon } from 'lucide-react';
import BackdropAnimation from '@/components/reusable/BackdropAnimation';
import { GAME_HEIGHT, GAME_WIDTH } from '@/constants';

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
    <div className="relative h-full w-full">
      {levels[selectedLevel].background && (
        <img
          className="pointer-events-none absolute left-0 top-0 h-full w-full"
          alt={`current level background image`}
          src={levels[selectedLevel].background}
        />
      )}
      <BackdropAnimation
        source={undefined}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        duration={20}
      >
        <div
          className={`relative flex h-full w-full flex-nowrap items-center justify-center gap-1 bg-gradient-to-t from-black/90 via-medieval-arcane to-medieval-stone/30 px-4`}
        >
          <div className="pointer-events-none absolute top-6 flex w-full justify-center bg-medieval-dark/80 p-4 text-4xl font-bold text-medieval-parchment">
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
                  icon={level.icon}
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
          <div className="absolute bottom-8 left-8">
            <LevelScreenButton
              onClick={() => returnToMenu()}
              type="secondary"
              className="group flex h-14 items-center gap-2"
            >
              <ArrowBigLeftIcon className="duration-150 group-hover:animate-pulse group-active:animate-pop" />{' '}
              Menu
            </LevelScreenButton>
          </div>
          <div className="absolute bottom-10 right-8">
            <LevelScreenButton
              className="w-50 group flex h-14 items-center justify-between gap-2"
              onClick={() => startGame(true)}
            >
              Start
              <ArrowBigRightIcon className="duration-150 group-hover:animate-pulse group-active:animate-pop" />
            </LevelScreenButton>
          </div>
        </div>
      </BackdropAnimation>
    </div>
  );
}
