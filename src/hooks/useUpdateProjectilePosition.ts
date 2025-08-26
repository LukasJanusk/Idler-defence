import { useEffect, useRef, useState } from 'react';
import type { Projectile } from '../model/entities/projectile';
import { useGameStore } from '@/store';

export default function useUpdateProjectilePosition(projectile: Projectile) {
  const [position, setPosition] = useState({
    x: projectile.rect.x,
    y: projectile.rect.y,
    rotation: 0,
  });
  const prevPos = useRef(position);
  const gameClock = useGameStore((store) => store.gameClock);

  useEffect(() => {
    const tick = (dt: number) => {
      projectile.update(dt);

      const prev = prevPos.current;
      const { x, y } = projectile.rect;

      if (prev.x !== x || prev.y !== y) {
        const dx = x - prev.x;
        const dy = y - prev.y;
        const rotation = Math.atan2(dy, dx) * (180 / Math.PI);

        const updated = { x, y, rotation };
        setPosition(updated);
        prevPos.current = updated;
      }
    };

    gameClock.subscribe(tick);
    return () => gameClock.unsubscribe(tick);
  }, [projectile, gameClock]);

  return position;
}
