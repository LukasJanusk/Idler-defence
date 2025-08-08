import { useContext, createContext } from 'react';
import type { GameContextType } from './types';

export const GameContext = createContext<GameContextType | null>(null);

export function useGameContext() {
  const gameContext = useContext(GameContext);
  if (!gameContext) {
    throw new Error('useGameContext must be used within GameContextProvider');
  }
  return gameContext;
}
