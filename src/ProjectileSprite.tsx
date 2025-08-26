import type { Projectile } from './model/entities/projectile';
import Sprite from './components/reusable/Sprite';

type ProjectileProps = {
  projectile: Projectile;
};

export default function ProjectileSprite({ projectile }: ProjectileProps) {
  return (
    <>
      <div
        className="absolute"
        style={{ left: projectile.rect.x, top: projectile.rect.y }}
      >
        <Sprite animation={projectile.animation} entity={projectile.source} />
      </div>
    </>
  );
}
