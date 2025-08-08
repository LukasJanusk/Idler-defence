import { useAnimation } from './useAnimation';
import type { SpriteAnimations } from './types';

export type SpriteProps<T extends string> = {
  state: T;
  animations: SpriteAnimations<T>;
  scale: number;
  onAnimationEnd?: (state: T) => void;
};
export default function Sprite<T extends string>({
  state,
  animations,
  onAnimationEnd,
  scale = 1,
}: SpriteProps<T>) {
  const onEnd = () => {
    if (!onAnimationEnd) return;
    onAnimationEnd(state);
  };

  const frame = useAnimation(animations[state], onEnd);
  const width = animations[state].sheet.width / animations[state].nFrame;
  const height = animations[state].sheet.height;

  return (
    <img
      src={animations[state].sheet.image.src}
      style={{
        width: width,
        height: height,
        objectFit: 'none',
        scale: scale,
        objectPosition: `-${frame * width}px 0`,
      }}
    ></img>
  );
}
