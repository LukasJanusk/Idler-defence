import { useGameStore } from '@/store';

export default function WaveDisplay() {
  const currentWave = useGameStore((store) => store.currentLevel);
  const waves = useGameStore((store) => store.levels.length);

  return (
    <div className="absolute left-2 top-2 rounded-md bg-medieval-dark/80 p-2 text-2xl font-bold text-medieval-parchment">{`Wave: ${currentWave + 1}/${waves}`}</div>
  );
}
