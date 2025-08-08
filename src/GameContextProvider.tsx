import { useEffect, useReducer } from 'react';
import { initializeGameState } from './defaults';
import { gameReducer } from './gameReducer';
import { GameContext } from './useGameContext';

type GameContextProps = { children: React.ReactNode };

export function GameContextProvider({ children }: GameContextProps) {
  const [state, dispatch] = useReducer(gameReducer, {
    party: { pos1: null, pos2: null, pos3: null, pos4: null },
    availableCharacters: [],
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

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
