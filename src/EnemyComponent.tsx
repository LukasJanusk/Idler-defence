import Bar from './components/reusable/Bar';
import Sprite from './components/reusable/Sprite';

import type { EnemyAction } from './model/entities/character';
import { Enemy } from './model/entities/enemy';

type Props = {
  enemies: Enemy<EnemyAction>[];
};
export default function EnemyComponent({ enemies }: Props) {
  return (
    <div className="pointer-events-none relative left-0 top-0 h-full w-full">
      {enemies.map((enemy) => {
        return (
          <div
            key={enemy.id}
            className="absolute z-10"
            style={{
              left: enemy.rect.x,
              top: enemy.rect.y - 10,
              width: enemy.rect.width,
              height: enemy.rect.height,
            }}
          >
            <div className="absolute left-1/2 w-[64px] -translate-x-1/2">
              <Bar value={enemy.health} maxValue={enemy.maxHealth} size="sm" />
            </div>
            <Sprite animation={enemy.animations[enemy.state]} entity="enemy" />
          </div>
        );
      })}
    </div>
  );
}
