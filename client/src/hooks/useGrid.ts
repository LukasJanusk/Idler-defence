import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '@/store';
import { GRID_AREA_SIZE, UPDATE_RATE } from '@/constants';

export default function useGrid() {
  const gameClock = useGameStore((store) => store.gameClock);
  const grid = useGameStore((store) => store.grid);
  const elapsed = useRef(0);
  const settings = useGameStore((store) => store.settings);
  const setGameOver = useGameStore((store) => store.setGameOver);
  const interval = UPDATE_RATE;
  const [enemies, setEnemies] = useState(grid.getEnemies());
  const [projectiles, setProjectiles] = useState(grid.getProjectiles());
  const [party, setParty] = useState(grid.getParty());

  useEffect(() => {
    function onTick(dt: number) {
      if (settings.pause) return;
      elapsed.current += dt;
      const currentEnemies = grid.getEnemies();
      const gameOver = currentEnemies.some(
        (e) => e.rect.x < 0 - GRID_AREA_SIZE,
      );
      if (gameOver) {
        setGameOver();
      } else if (elapsed.current >= interval) {
        grid.update(dt);
        setEnemies(currentEnemies);
        setProjectiles(grid.getProjectiles());

        setParty(grid.getParty());
        elapsed.current %= interval;
      }
    }
    gameClock.subscribe(onTick);

    return () => gameClock.unsubscribe(onTick);
  }, [gameClock, grid, interval, setGameOver, settings]);

  return { grid, projectiles, party, enemies };
}
