import type { Grid } from '@/model/grid';
import { createContext, useContext } from 'react';

export const GameGridContext = createContext<Grid | null>(null);

export function useGameGridContext() {
  const gameGrid = useContext(GameGridContext);
  if (!gameGrid)
    throw new Error('useGameGrid must be used within GameGridProvider');
  return gameGrid;
}
