import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '@/store';
import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { UPDATE_RATE } from '@/constants';

export function useEnemies() {
  const [enemies, setEnemies] = useState<Enemy<EnemyAction>[]>([]);
  const elapsed = useRef(0);
  const grid = useGameStore((store) => store.grid);
  const gameClock = useGameStore((store) => store.gameClock);
  useEffect(() => {
    const onTick = (dt: number) => {
      elapsed.current += dt;
      if (elapsed.current >= UPDATE_RATE) {
        const currentEnemies = grid.getEnemies();

        setEnemies(currentEnemies);
        elapsed.current %= UPDATE_RATE;
      }
    };
    gameClock.subscribe(onTick);
    return () => gameClock.unsubscribe(onTick);
  }, [gameClock, grid]);

  return enemies;
}
