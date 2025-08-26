import { useEffect, useState } from 'react';
import { useGameStore } from '@/store';

export default function useGrid() {
  const gameClock = useGameStore((store) => store.gameClock);
  const grid = useGameStore((store) => store.grid);
  const [enemies, setEnemies] = useState(grid.getEnemies());
  const [projectiles, setProjectiles] = useState(grid.getProjectiles());

  useEffect(() => {
    function onTick(dt: number) {
      grid.update(dt);
      setEnemies(grid.getEnemies());
      setProjectiles(grid.getProjectiles());
    }
    gameClock.subscribe(onTick);

    return () => gameClock.unsubscribe(onTick);
  }, [gameClock, grid]);

  return { enemies, projectiles };
}
