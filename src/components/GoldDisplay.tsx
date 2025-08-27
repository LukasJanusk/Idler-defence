import { useGameStore } from '@/store';

export default function GoldDisplay() {
  const value = useGameStore((store) => store.gold);
  return (
    <div className="absolute left-1/2 top-4 z-30 -translate-x-1/2 rounded bg-medieval-dark/80 p-2 text-2xl font-bold text-medieval-parchment">
      {`${value} 🪙`}
    </div>
  );
}
