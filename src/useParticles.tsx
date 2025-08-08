import { useEffect, useRef } from 'react';
import { useGameClock } from './useGameClock';
import { Particle, splashBlood } from './particles';

export function useParticles(
  canvas: React.RefObject<HTMLCanvasElement | null>,
) {
  const particles = useRef<Particle[]>([]);
  const gameClock = useGameClock();
  const splash = (x: number, y: number, n: number) => {
    particles.current.push(...splashBlood(x, y, n));
  };
  useEffect(() => {
    const onTick = (dt: number) => {
      const ctx = canvas.current?.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      particles.current = particles.current.filter((p) => p.isAlive());
      particles.current.forEach((p) => {
        p.update(dt);
        p.draw(ctx);
      });
    };
    gameClock.subscribe(onTick);

    return () => gameClock.unsubscribe(onTick);
  }, [gameClock, canvas]);

  return splash;
}
