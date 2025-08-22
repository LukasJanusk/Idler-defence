import { useAnimation } from './hooks/useAnimation';
import type { Animation } from '@/model/animations/animation';
import useSpriteLoad from './hooks/useSpriteLoad';

type SpriteProps = {
  animation: Animation;
  entity: 'character' | 'enemy';
  onAnimationEnd?: () => void;
  scale?: number;
};

export default function Sprite({
  animation,
  onAnimationEnd,
  entity,
  scale = 1,
}: SpriteProps) {
  const onEnd = () => {
    if (!onAnimationEnd) return;
    onAnimationEnd();
  };
  const current = animation;
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
        transform: entity === 'enemy' ? `scaleX(-1)` : `scaleX(1)`,
      }}
    />
  );
}
