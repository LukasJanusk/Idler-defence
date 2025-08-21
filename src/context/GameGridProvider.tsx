import { useMemo, type ReactNode } from 'react';
import { GameGridContext } from './useGameGrid';
import { Grid } from '@/model/grid';
import { GRID_AREA_SIZE } from '@/constants';

type Props = {
  children: ReactNode;
};
export function GameGridProvider({ children }: Props) {
  const grid = useMemo(() => new Grid(9, 5, GRID_AREA_SIZE), []);

  return (
    <GameGridContext.Provider value={grid}>{children}</GameGridContext.Provider>
  );
}
