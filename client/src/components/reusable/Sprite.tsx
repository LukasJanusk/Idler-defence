import type { Animation } from '@/model/animations/animation';

type Props = {
  animation: Animation;
  entity: 'character' | 'enemy';
  scale?: number;
};

export default function Sprite({ animation, entity, scale = 1 }: Props) {
  if (!animation) return <div>Animation not found!</div>;
  const width = animation.sheet.width / animation.nFrame;
  const height = animation.sheet.height;

  if (!width || !height) return null;

  return (
    <img
      alt={`${entity} animation`}
      src={animation.sheet.img.src}
      style={{
        width,
        height,
        objectFit: 'none',
        scale,
        objectPosition: `-${animation.frame * width}px 0`,
        transform: entity === 'enemy' ? `scaleX(-1)` : `scaleX(1)`,
      }}
      className={`pointer-events-none ${animation.id === 'Lightning-mage-discharge' ? 'ml-[32px]' : ''}`}
    />
  );
}
