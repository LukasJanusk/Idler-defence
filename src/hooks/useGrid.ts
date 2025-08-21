import { useGameClock } from '@/context/useGameClock';
import type { Grid } from '@/model/grid';

import { useEffect } from 'react';
export default function useGrid(grid: Grid) {
  const gameClock = useGameClock();
  useEffect(() => {
    function onTick(_dt: number) {
      grid.update();
    }
    gameClock.subscribe(onTick);

    return () => gameClock.unsubscribe(onTick);
  }, [gameClock, grid]);
}
