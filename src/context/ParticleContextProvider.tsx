import { useRef, type ReactNode } from 'react';
import { ParticleContext } from './ParticleContext';
import { useParticles } from '../hooks/useParticles';
import { GAME_HEIGHT, GAME_WIDTH } from '../constants';

type ParticleContextProps = {
  children: ReactNode;
};
export default function ParticleContextProvider({
  children,
}: ParticleContextProps) {
  const ref = useRef<null | HTMLCanvasElement>(null);
  const { splashBl, splashEmb } = useParticles(ref);
  const splashBlood = splashBl;
  const splashEmbers = splashEmb;
  return (
    <ParticleContext.Provider value={{ splashBlood, splashEmbers }}>
      {' '}
      <canvas
        ref={ref}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className="absolute left-0 top-0 z-10 h-full w-full"
      />
      {children}
    </ParticleContext.Provider>
  );
}
