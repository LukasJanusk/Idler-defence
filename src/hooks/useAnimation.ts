import { useState, useRef, useEffect } from 'react';
import { Animation } from '@/model/animations/animation';
import { useGameClock } from '@/context/useGameClock';

export function useAnimation(
  animation: Animation | undefined | null,
  onAnimationEnd?: () => void,
) {
  const [frame, setFrame] = useState<number | null | undefined>(0);
  const gameClock = useGameClock();
  const animationRef = useRef(animation);

  useEffect(() => {
    function onTick(dt: number) {
      if (!animation) {
        setFrame(null);
        return;
      }
      if (animation !== animationRef.current) {
        animationRef.current = animation;
        animationRef.current.frame = 0;
        setFrame(0);
        return;
      }
      if (
        animationRef.current &&
        (animationRef.current.name === 'death' ||
          animationRef.current.name === 'resurrect') &&
        animationRef.current.frame === animationRef.current.nFrame - 1
      ) {
        if (onAnimationEnd) {
          onAnimationEnd();
        }
        animationRef.current.frame = 0;
        setFrame(0);
        return;
      }
      const prev = animationRef.current.frame;
      animationRef.current.tick(dt);
      if (animationRef.current.frame >= animationRef.current.nFrame) {
        animationRef.current.frame = 0;
      }
      if (animationRef.current.frame !== prev) {
        setFrame(animationRef.current.frame);
      }
    }
    gameClock.subscribe(onTick);

    return () => gameClock.unsubscribe(onTick);
  }, [animation, gameClock, onAnimationEnd]);

  return frame;
}
