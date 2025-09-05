import { useGameStore } from '@/store';

export default function WaveDisplay() {
  const currentWave = useGameStore((store) => store.currentWave);
  const waves = useGameStore((store) => {
    const levels = store.levels;

    const currentLevel = levels[store.currentLevel];

    const waves = currentLevel.waves.length;

    return waves;
  });

  return (
    <div
      aria-label="current wave"
      className="absolute left-2 top-4 rounded-md bg-medieval-dark/80 p-2 text-2xl font-bold text-medieval-parchment"
    >{`Wave: ${currentWave > waves ? waves : currentWave}/${waves}`}</div>
  );
}
