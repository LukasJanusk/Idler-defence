import type { Projectile } from './projectile';
import { useProjectileAnimation } from './useProjectileAnimation';
import { useState, useEffect } from 'react';

type ProjectileProps = {
  projectile: Projectile;
};

export default function ProjectileSprite({ projectile }: ProjectileProps) {
  const frame = useProjectileAnimation(projectile.animation);
  const current = projectile.animation;

  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );

  useEffect(() => {
    if (current.sheet.img.complete && current.sheet.img.naturalWidth) {
      setSize({
        width: current.sheet.img.naturalWidth / current.nFrame,
        height: current.sheet.img.naturalHeight,
      });
    } else {
      const onLoad = () => {
        setSize({
          width: current.sheet.img.naturalWidth / current.nFrame,
          height: current.sheet.img.naturalHeight,
        });
      };
      current.sheet.img.addEventListener('load', onLoad);
      return () => current.sheet.img.removeEventListener('load', onLoad);
    }
  }, [current.sheet.img, current.nFrame]);

  if (!size) return <div>Loading sprite...</div>;

  return (
    <>
      <img
        style={{
          zIndex: 20,
          position: 'absolute',
          left: projectile.position.x - size.width / 2,
          top: projectile.position.y - size.height / 2,
          width: size.width,
          height: size.height,
          objectFit: 'none',
          objectPosition: `-${frame * size.width}px 0`,
        }}
        src={current.sheet.img.src}
        alt={current.name}
      />
    </>
  );
}
