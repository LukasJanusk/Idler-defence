import { useAnimation } from '@/hooks/useAnimation';
import type { Animation } from '@/model/animations/animation';
import useSpriteLoad from '@/hooks/useSpriteLoad';
import { LoaderCircleIcon } from 'lucide-react';

type SpriteProps = {
  animation: Animation;
  entity: 'character' | 'enemy';
  scale?: number;
};

export default function Sprite({ animation, entity, scale = 1 }: SpriteProps) {
  const frame = useAnimation(animation);
  const size = useSpriteLoad(animation);
  if (!animation) return <div>Animation not found!</div>;
  if (!size || !animation)
    return (
      <div className="w-ful h-full items-center justify-center text-medieval-parchment">
        <LoaderCircleIcon aria-label="loading" className="animate-spin" />
      </div>
    );
  const width = size.width;
  const height = size.height;

  return (
    <img
      alt={`${entity} animation`}
      src={animation.sheet.img.src}
      style={{
        width,
        height,
        objectFit: 'none',
        scale,
        objectPosition: `-${frame && frame * width}px 0`,
        transform: entity === 'enemy' ? `scaleX(-1)` : `scaleX(1)`,
      }}
      className={`pointer-events-none ${animation.id === 'Lightning-mage-discharge' ? 'ml-[32px]' : ''}`}
    />
  );
}
