import type { Projectile } from './projectile';
import { useProjectileAnimation } from './hooks/useProjectileAnimation';
import useUpdateProjectilePosition from './hooks/useUpdateProjectilePosition';

type ProjectileProps = {
  projectile: Projectile;
};

export default function ProjectileSprite({ projectile }: ProjectileProps) {
  const frame = useProjectileAnimation(projectile.animation);
  const position = useUpdateProjectilePosition(projectile);
  const animation = projectile.animation;
  const width = projectile.rect.width;
  const height = projectile.rect.height;
  return (
    <>
      <img
        style={{
          zIndex: 20,
          position: 'absolute',
          left: position.x - width / 2,
          top: position.y - height / 2,
          width: width,
          height: height,
          objectFit: 'none',
          transform: `rotate(${position.rotation}deg)`,
          objectPosition: `-${frame * width}px 0`,
        }}
        src={animation.sheet.img.src}
        alt={animation.name}
      />
    </>
  );
}
