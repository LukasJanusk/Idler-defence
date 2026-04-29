import TutorialBackground from '@/assets/background/bg_dungeon.png';
import LevelOneBackground from '@/assets/background/bg_level_one.svg';
import { useGameStore } from '@/store';

export default function Background() {
  const currentLevel = useGameStore((store) => store.currentLevel);
  const backgrounds = {
    0: new URL(TutorialBackground, import.meta.url).href,
    1: new URL(LevelOneBackground, import.meta.url).href,
  } as const;

  return (
    <img
      src={backgrounds[currentLevel as keyof typeof backgrounds] ?? backgrounds[0]}
      alt="level-background"
      className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full object-cover"
    />
  );
}
