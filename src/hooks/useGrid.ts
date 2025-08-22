import { useGameClock } from '@/context/useGameClock';
import type { Grid } from '@/model/grid';

import { useEffect } from 'react';
export default function useGrid(grid: Grid) {
  const gameClock = useGameClock();
  useEffect(() => {
    function onTick(dt: number) {
      grid.update(dt);
    }
    gameClock.subscribe(onTick);

    return () => gameClock.unsubscribe(onTick);
  }, [gameClock, grid]);
}
