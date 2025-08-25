import { useEffect } from 'react';

import { useGameStore } from '@/store';

export function useParticles(
  canvas: React.RefObject<HTMLCanvasElement | null>,
) {
  const gameClock = useGameStore((store) => store.gameClock);
  const grid = useGameStore((store) => store.grid);
  const splashBl = (x: number, y: number, n: number) => {
    grid.generateParticles('blood', x, y, n);
  };
  const splashEmb = (x: number, y: number, n: number) => {
    grid.generateParticles('ember', x, y, n);
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

  return { splashBl, splashEmb };
}
