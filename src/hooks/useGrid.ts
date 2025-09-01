import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '@/store';
import { GRID_AREA_SIZE, UPDATE_RATE } from '@/constants';

export default function useGrid() {
  const gameClock = useGameStore((store) => store.gameClock);
  const grid = useGameStore((store) => store.grid);
  const elapsed = useRef(0);
  const setGameOver = useGameStore((store) => store.setGameOver);
  const interval = UPDATE_RATE;
  const [enemies, setEnemies] = useState(grid.getEnemies());
  const [projectiles, setProjectiles] = useState(grid.getProjectiles());
  const [characters, setCharacters] = useState(grid.getCharacters());
  const [party, setParty] = useState(grid.getParty());

  useEffect(() => {
    function onTick(dt: number) {
      elapsed.current += dt;
      if (enemies.some((e) => e.rect.x < 0 - GRID_AREA_SIZE)) {
        setGameOver();
      }
      if (elapsed.current >= interval) {
        grid.update(dt);
        setEnemies(grid.getEnemies());
        setProjectiles(grid.getProjectiles());
        setCharacters(grid.getCharacters());
        setParty(grid.getParty());
        elapsed.current %= interval;
      }
    }
    gameClock.subscribe(onTick);

    return () => gameClock.unsubscribe(onTick);
  }, [gameClock, grid, interval, enemies, setGameOver]);

  return { grid, enemies, projectiles, characters, party };
}
