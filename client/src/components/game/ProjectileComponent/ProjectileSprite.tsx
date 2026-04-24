import type { Projectile } from '@/model/entities/projectile';
import Sprite from '@/components/reusable/Sprite';

type Props = {
  projectile: Projectile;
};

export default function ProjectileSprite({ projectile }: Props) {
  return (
    <div
      aria-label={`${projectile.name} projectile`}
      className="border-box pointer-events-none absolute"
      style={{
        left: projectile.rect.x,
        top: projectile.rect.y,
        transform: `rotate(${projectile.rotation}deg)`,
        transformOrigin: '50% 50%',
      }}
    >
      <Sprite animation={projectile.animation} entity={projectile.source} />
    </div>
  );
}
