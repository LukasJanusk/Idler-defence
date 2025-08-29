import { useEffect } from 'react';

import { GameContext } from './useGameContext';

type GameContextProps = { children: React.ReactNode };

export function GameContextProvider({ children }: GameContextProps) {
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
        <span className="fixed left-0 top-0">{`x: ${mouse.x}, y: ${mouse.y}`}</span>
        {children}
      </div>
    </GameContext.Provider>
  );
}
