import { createContext, useContext } from 'react';
import type { GridRenderer } from '@/model/gridRenderer';

type GameRenderState = ReturnType<GridRenderer['getRenderState']> & {
  frameVersion: number;
};

export const GameRenderContext = createContext<GameRenderState | null>(null);

export function useGameRenderContext() {
  const ctx = useContext(GameRenderContext);
  if (!ctx) {
    throw new Error(
      'useGameRenderContext must be used within ParticleContextProvider',
    );
  }

  return ctx;
}
