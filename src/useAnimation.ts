import { useState, useRef, useEffect } from 'react';
import { Animation } from './animation';
import { useGameClock } from './useGameClock';

export function useAnimation(animation: Animation) {
  const [frame, setFrame] = useState(animation.frame);
  const gameClock = useGameClock();
  const lastFrame = useRef(animation.frame);
  const prevAnimation = useRef(animation);

  useEffect(() => {
    setFrame(0);
    const onTick = (dt: number) => {
      if (animation !== prevAnimation.current) {
        prevAnimation.current = animation;
        animation.frame = 0;
      }
      const prev = animation.frame;
      animation.tick(dt);
      if (animation.frame !== prev) {
        setFrame(animation.frame);
        lastFrame.current = animation.frame;
      }
    };
    gameClock.subscribe(onTick);

    return () => gameClock.unsubscribe(onTick);
  }, [animation, gameClock]);

  return frame;
}
