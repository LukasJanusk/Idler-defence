import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '@/store';
import { UPDATE_RATE } from '@/constants';
import { Projectile } from '@/model/entities/projectile';

export function useProjectiles() {
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const elapsed = useRef(0);
  const grid = useGameStore((store) => store.grid);
  const gameClock = useGameStore((store) => store.gameClock);
  useEffect(() => {
    const onTick = (dt: number) => {
      elapsed.current += dt;
      if (elapsed.current >= UPDATE_RATE) {
        const currentProjectiles = grid.getProjectiles();
        setProjectiles(currentProjectiles);
        elapsed.current %= UPDATE_RATE;
      }
    };
    gameClock.subscribe(onTick);
    return () => gameClock.unsubscribe(onTick);
  }, [gameClock, grid]);

  return projectiles;
}
