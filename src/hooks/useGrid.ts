import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '@/store';
import { UPDATE_RATE } from '@/constants';

export default function useGrid() {
  const gameClock = useGameStore((store) => store.gameClock);
  const grid = useGameStore((store) => store.grid);
  const elapsed = useRef(0);
  const interval = UPDATE_RATE;
  const [enemies, setEnemies] = useState(grid.getEnemies());
  const [projectiles, setProjectiles] = useState(grid.getProjectiles());
  const [characters, setCharacters] = useState(grid.getCharacters());
  const [party, setParty] = useState(grid.getParty());

  useEffect(() => {
    function onTick(dt: number) {
      elapsed.current += dt;
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
  }, [gameClock, grid, interval]);

  return { grid, enemies, projectiles, characters, party };
}
