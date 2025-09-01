import { useGameStore } from '@/store';

export default function WaveDisplay() {
  const currentWave = useGameStore((store) => store.currentWave);
  const waves = useGameStore(
    (store) => store.levels[store.currentLevel].waves.length,
  );

  return (
    <div className="absolute left-2 top-4 rounded-md bg-medieval-dark/80 p-2 text-2xl font-bold text-medieval-parchment">{`Wave: ${currentWave > waves ? waves : currentWave}/${waves}`}</div>
  );
}
