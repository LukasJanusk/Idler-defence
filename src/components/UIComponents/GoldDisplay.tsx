import { useGameStore } from '@/store';
import { useEffect, useState } from 'react';

export default function GoldDisplay() {
  const value = useGameStore((store) => store.gold);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 600);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="absolute left-1/2 top-4 z-30 -translate-x-1/2 rounded bg-medieval-dark/80 p-2 text-2xl font-bold text-medieval-parchment">
      <div className={animate ? 'animate-pop' : ''}>{`${value} 🪙`}</div>
    </div>
  );
}
