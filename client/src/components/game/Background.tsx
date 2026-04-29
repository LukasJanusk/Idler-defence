import { useGameStore } from '@/store';

export default function Background() {
  const currentLevel = useGameStore((store) => store.currentLevel);
  const levelBackground = useGameStore(
    (store) => store.selectableLevels[currentLevel]?.background,
  );
  const fallbackBackground = useGameStore(
    (store) => store.selectableLevels[0]?.background,
  );

  return (
    <img
      src={levelBackground ?? fallbackBackground}
      alt="level-background"
      className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full object-cover"
    />
  );
}
