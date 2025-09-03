import { useEffect } from 'react';
import { useGameStore } from '@/store';

export function useParticles(
  canvas: React.RefObject<HTMLCanvasElement | null>,
) {
  const gameClock = useGameStore((store) => store.gameClock);
  const grid = useGameStore((store) => store.grid);
  const splashBlood = (x: number, y: number, n: number) => {
    grid.generateParticles('blood', x, y, n);
  };
  const splashEmbers = (x: number, y: number, n: number) => {
    grid.generateParticles('ember', x, y, n);
  };
  const splashArcane = (x: number, y: number, n: number) => {
    grid.generateParticles('arcane', x, y, n);
  };
  const splashSparks = (x: number, y: number, n: number) => {
    grid.generateParticles('spark', x, y, n);
  };
  const splashHealth = (x: number, y: number, n: number) => {
    grid.generateParticles('health', x, y, n);
  };
  const splashMagic = (x: number, y: number, n: number) => {
    grid.generateParticles('magic', x, y, n);
  };
  useEffect(() => {
    const onTick = (dt: number) => {
      const ctx = canvas.current?.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      grid.filterExpiredParticles();
      grid.updateAndDrawParticles(dt, ctx);
    };
    gameClock.subscribe(onTick);

    return () => gameClock.unsubscribe(onTick);
  }, [gameClock, canvas, grid]);

  return {
    splashBlood,
    splashEmbers,
    splashArcane,
    splashSparks,
    splashHealth,
    splashMagic,
  };
}
