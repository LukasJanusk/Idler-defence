import { useRef, type ReactNode } from 'react';
import { GameRenderContext } from './GameRenderContext';
import { ParticleContext } from './ParticleContext';
import { useGameRenderer } from '@/hooks/useGameRenderer';
import { GAME_HEIGHT, GAME_WIDTH } from '../constants';
import Background from '@/components/game/Background';

type Props = {
  children: ReactNode;
};
export default function ParticleContextProvider({ children }: Props) {
  const ref = useRef<null | HTMLCanvasElement>(null);
  const {
    renderState,
    splashBlood,
    splashEmbers,
    splashArcane,
    splashHealth,
    splashMagic,
    splashSparks,
    splashLines,
    splashHollowSquares,
  } = useGameRenderer(ref);

  return (
    <GameRenderContext.Provider value={renderState}>
      <ParticleContext.Provider
        value={{
          splashBlood,
          splashEmbers,
          splashArcane,
          splashHealth,
          splashMagic,
          splashSparks,
          splashLines,
          splashHollowSquares,
        }}
      >
        <Background />
        <canvas
          ref={ref}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="pointer-events-none absolute left-0 top-0 z-10"
        />
        {children}
      </ParticleContext.Provider>
    </GameRenderContext.Provider>
  );
}
