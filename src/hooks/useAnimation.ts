import { useState, useEffect } from 'react';
import { Animation } from '@/model/animations/animation';
import { useGameStore } from '@/store';
import type { ProjectileAnimation } from '@/model/entities/projectile';

export function useAnimation(
  animation: Animation | ProjectileAnimation | undefined | null,
) {
  const [frame, setFrame] = useState<number>(0);
  const gameClock = useGameStore((store) => store.gameClock);

  useEffect(() => {
    if (!animation) {
      setFrame(0);
      return;
    }
    setFrame(0);
    function onTick(dt: number) {
      if (!animation) return;
      const prev = animation.frame;
      animation.tick(dt);

      if (animation.frame !== prev) {
        setFrame(animation.frame);
      }
    }

    gameClock.subscribe(onTick);
    return () => gameClock.unsubscribe(onTick);
  }, [animation, gameClock]);

  return frame;
}
