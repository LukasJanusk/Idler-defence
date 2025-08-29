import type { ReactNode } from 'react';
import ProjectileSprite from './ProjectileSprite';
import type { Projectile } from '@/model/entities/projectile';

type Props = {
  projectiles: Projectile[];
  children: ReactNode;
};
export default function ProjectileComponent({ projectiles, children }: Props) {
  return (
    <div className="relative left-0 top-0 z-0">
      {projectiles.map(
        (proj) =>
          proj.isAlive && <ProjectileSprite key={proj.id} projectile={proj} />,
      )}
      {children}
    </div>
  );
}
