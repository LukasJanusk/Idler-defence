import { useState, useRef, useEffect } from 'react';
import { Animation } from './animation';
import { useGameClock } from './useGameClock';

export function useAnimation(
  animation: Animation,
  onAnimationEnd?: () => void,
) {
  const [frame, setFrame] = useState(animation.frame);
  const gameClock = useGameClock();
  const animationRef = useRef(animation);

  useEffect(() => {
    function onTick(dt: number) {
      if (animation !== animationRef.current) {
        animationRef.current = animation;
        animationRef.current.frame = 0;
        setFrame(0);
      }
      if (
        (animation.name === 'death' || animation.name === 'resurrect') &&
        animation.frame === animation.nFrame - 1
      ) {
        if (onAnimationEnd) {
          onAnimationEnd();
        }
        return;
      }
      const prev = animation.frame;
      animation.tick(dt);
      if (animation.frame >= animation.nFrame) {
        animation.frame = 0;
      }
      if (animation.frame !== prev) {
        setFrame(animation.frame);
      }
    }
    gameClock.subscribe(onTick);

    return () => gameClock.unsubscribe(onTick);
  }, [animation, gameClock, onAnimationEnd]);

  return frame;
}
