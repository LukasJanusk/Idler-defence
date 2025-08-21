import { useEffect, useReducer, useState } from 'react';
import { initializeGameState } from '../defaults';
import { gameReducer } from '@/gameReducer';
import { GameContext } from './useGameContext';

type GameContextProps = { children: React.ReactNode };

export function GameContextProvider({ children }: GameContextProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [state, dispatch] = useReducer(gameReducer, null, initializeGameState);

  const value = {
    state,
    dispatch,
  };

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      setMouse({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('mousemove', handleMove);

    return () => window.removeEventListener('mousemove', handleMove);
  });
  return (
    <GameContext.Provider value={value}>
      <div className="relative h-full w-full overflow-hidden">
        <span className="fixed left-0 top-0 z-20">{`x: ${mouse.x}, y: ${mouse.y}`}</span>
        {children}
      </div>
    </GameContext.Provider>
  );
}
