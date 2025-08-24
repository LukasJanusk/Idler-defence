import { useState, useEffect } from 'react';
import { Animation } from '@/model/animations/animation';
import { useGameStore } from '@/store';

export function useAnimation(animation: Animation | undefined | null) {
  const [frame, setFrame] = useState<number | null>(0);
  const gameClock = useGameStore((store) => store.gameClock);

  useEffect(() => {
    if (!animation) {
      setFrame(null);
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
