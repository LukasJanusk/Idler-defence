import { useAnimation } from './hooks/useAnimation';
import type { Animation } from '@/model/animations/animation';
import useSpriteLoad from './hooks/useSpriteLoad';

type SpriteProps = {
  animation: Animation;
  entity: 'character' | 'enemy';
  scale?: number;
};

export default function Sprite({ animation, entity, scale = 1 }: SpriteProps) {
  const frame = useAnimation(animation);
  const size = useSpriteLoad(animation);
  if (!size || !animation) return <div>Loading sprite...</div>;
  const width = size.width;
  const height = size.height;

  return (
    <img
      alt="animation"
      src={animation.sheet.img.src}
      style={{
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
