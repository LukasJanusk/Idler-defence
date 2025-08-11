import { useContext, createContext } from 'react';
import { GameClock } from '../gameClock';

export const GameClockContext = createContext<GameClock | null>(null);

export function useGameClock() {
  const clock = useContext(GameClockContext);
  if (!clock)
    throw new Error('useGameClock must be used within GameClockProvider');
  return clock;
}
