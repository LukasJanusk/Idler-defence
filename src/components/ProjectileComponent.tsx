import ProjectileSprite from '@/ProjectileSprite';
import useGrid from '@/hooks/useGrid';

export default function ProjectileComponent() {
  const { projectiles } = useGrid();
  return (
    <div className="pointer-events-none relative left-0 top-0 z-0">
      {projectiles.map(
        (proj) =>
          proj.isAlive && <ProjectileSprite key={proj.id} projectile={proj} />,
      )}
    </div>
  );
}
