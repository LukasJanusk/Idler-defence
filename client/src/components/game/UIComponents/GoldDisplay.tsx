import { useGameStore } from '@/store';
import { useEffect, useState } from 'react';

type GoldDisplayProps = {
  demo?: boolean;
};
export default function GoldDisplay({ demo = false }: GoldDisplayProps) {
  const value = useGameStore((store) => store.gold);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 600);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="absolute left-1/2 top-4 z-30 -translate-x-1/2 rounded bg-medieval-dark/80 p-2 text-2xl font-bold text-medieval-parchment">
      <div
        className={animate && !demo ? 'animate-pop' : ''}
      >{`${value} 🪙`}</div>
    </div>
  );
}
