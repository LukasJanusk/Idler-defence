import Sprite from './components/reusable/Sprite';
import useGrid from './hooks/useGrid';

export default function EnemyComponent() {
  const { enemies } = useGrid();

  return (
    <div className="pointer-events-none relative left-0 top-0 h-full w-full">
      {enemies.map((enemy) => {
        return (
          <div
            key={enemy.id}
            className="absolute z-20"
            style={{
              left: enemy.rect.x,
              top: enemy.rect.y,
              width: enemy.rect.width,
              height: enemy.rect.height,
            }}
          >
            <Sprite animation={enemy.animations[enemy.state]} entity="enemy" />
          </div>
        );
      })}
    </div>
  );
}
