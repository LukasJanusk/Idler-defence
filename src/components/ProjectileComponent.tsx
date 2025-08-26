import ProjectileSprite from '@/ProjectileSprite';
import type { Projectile } from '@/model/entities/projectile';

type Props = {
  projectiles: Projectile[];
};
export default function ProjectileComponent({ projectiles }: Props) {
  return (
    <div className="pointer-events-none relative left-0 top-0 z-0">
      {projectiles.map(
        (proj) =>
          proj.isAlive && <ProjectileSprite key={proj.id} projectile={proj} />,
      )}
    </div>
  );
}
