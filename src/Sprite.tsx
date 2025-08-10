import { useAnimation } from './hooks/useAnimation';
import type { SpriteAnimations } from './types';
import useSpriteLoad from './hooks/useSpriteLoad';

type SpriteProps<T extends string> = {
  animations: Partial<SpriteAnimations<T>>;
  state: T;
  onAnimationEnd: (state: T) => void;
  scale?: number;
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
  const current = animations[state];
  const frame = useAnimation(current, onEnd);
  const size = useSpriteLoad(current);
  if (!size || !current) return <div>Loading sprite...</div>;
  const width = size.width;
  const height = size.height;

  return (
    <img
      alt="animation"
      src={current.sheet.img.src}
      style={{
        border: '1px solid red',
        width,
        height,
        objectFit: 'none',
        scale,
        objectPosition: `-${frame && frame * width}px 0`,
      }}
    />
  );
}
