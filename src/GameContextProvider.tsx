import { useEffect, useReducer, useState } from 'react';
import { initializeGameState } from './defaults';
import { gameReducer } from './gameReducer';
import { GameContext } from './useGameContext';
import ProjectileSprite from './ProjectileSprite';

type GameContextProps = { children: React.ReactNode };

export function GameContextProvider({ children }: GameContextProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [state, dispatch] = useReducer(gameReducer, {
    party: { pos1: null, pos2: null, pos3: null, pos4: null },
    availableCharacters: [],
    projectiles: [],
  });

  useEffect(() => {
    initializeGameState().then((initialState) => {
      dispatch({ type: 'init', payload: initialState });
    });
  }, []);
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
      {`x: ${mouse.x}, y: ${mouse.y}`}
      {state.projectiles.map((proj) => (
        <ProjectileSprite projectile={proj} key={proj.id} />
      ))}
      {children}
    </GameContext.Provider>
  );
}
