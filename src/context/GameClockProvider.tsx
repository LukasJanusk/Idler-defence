import { useEffect, type ReactNode } from 'react';
import { GameClock } from '../model/gameClock';
import { GameClockContext } from './useGameClock';

const gameClock = new GameClock();

type Props = {
  children: ReactNode;
};
export function GameClockProvider({ children }: Props) {
  useEffect(() => {
    gameClock.start();
    return () => gameClock.stop();
  }, []);
  return (
    <GameClockContext.Provider value={gameClock}>
      {children}
    </GameClockContext.Provider>
  );
}
