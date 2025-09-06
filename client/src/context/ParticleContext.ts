import { useContext, createContext } from 'react';

type ParticleEffects = {
  splashEmbers: (x: number, y: number, n: number) => void;
  splashBlood: (x: number, y: number, n: number) => void;
  splashArcane: (x: number, y: number, n: number) => void;
  splashHealth: (x: number, y: number, n: number) => void;
  splashMagic: (x: number, y: number, n: number) => void;
  splashSparks: (x: number, y: number, n: number) => void;
  splashLines: (x: number, y: number, n: number, arc?: number) => void;
  splashHollowSquares: (x: number, y: number, n: number) => void;
};
export const ParticleContext = createContext<null | ParticleEffects>(null);

export function useParticleContext() {
  const ctx = useContext(ParticleContext);
  if (!ctx)
    throw new Error(
      'useParticleContext must be used within ParticleContextProvider',
    );
  return ctx;
}
