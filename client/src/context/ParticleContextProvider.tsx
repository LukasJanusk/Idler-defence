import { useRef, type ReactNode } from 'react';
import { ParticleContext } from './ParticleContext';
import { useParticles } from '@/hooks/useParticles';
import { GAME_HEIGHT, GAME_WIDTH } from '../constants';
import Background from '@/components/Background';

type Props = {
  children: ReactNode;
};
export default function ParticleContextProvider({ children }: Props) {
  const ref = useRef<null | HTMLCanvasElement>(null);
  const {
    splashBlood,
    splashEmbers,
    splashArcane,
    splashHealth,
    splashMagic,
    splashSparks,
    splashLines,
    splashHollowSquares,
  } = useParticles(ref);

  return (
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
  );
}
