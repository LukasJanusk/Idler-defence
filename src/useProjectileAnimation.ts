import { useState, useRef, useEffect } from 'react';
import { useGameClock } from './useGameClock';
import type { ProjectileAnimation } from './projectile';

export function useProjectileAnimation(animation: ProjectileAnimation) {
  const [frame, setFrame] = useState<number>(animation.frame);
  const gameClock = useGameClock();
  const animationRef = useRef(animation);

  useEffect(() => {
    function onTick(dt: number) {
      if (!animation) {
        setFrame(0);
        return;
      }
      if (animation !== animationRef.current) {
        animationRef.current = animation;
        animationRef.current.frame = 0;
        setFrame(0);
      }
      const prev = animation.frame;
      animation.tick(dt);
      if (!animation.alive) {
        animation.frame = 0;
        gameClock.unsubscribe(onTick);
        return;
      }
      if (animation.frame !== prev) {
        setFrame(animation.frame);
      }
    }
    gameClock.subscribe(onTick);

    return () => gameClock.unsubscribe(onTick);
  }, [animation, gameClock]);

  return frame;
}
