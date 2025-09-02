import Sprite from '../reusable/Sprite';
import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import Bar from '../reusable/Bar';
import type React from 'react';

type EnemySpriteProps = {
  enemy: Enemy<EnemyAction>;
  setInfo: React.Dispatch<React.SetStateAction<Enemy<EnemyAction> | null>>;
};
export default function EnemySprite({ enemy, setInfo }: EnemySpriteProps) {
  return (
    <div
      onMouseEnter={() => setInfo(enemy)}
      onMouseLeave={() => setInfo(null)}
      key={enemy.id}
      className="absolute"
      style={{
        left: enemy.rect.x,
        top: enemy.rect.y - 10,
        width: enemy.rect.width,
        height: enemy.rect.height,
        pointerEvents: enemy.state === 'dead' ? 'none' : 'auto',
      }}
    >
      {enemy.state !== 'death' && enemy.state !== 'dead' && (
        <div className="absolute left-1/2 w-[64px] -translate-x-1/2">
          <Bar value={enemy.health} maxValue={enemy.maxHealth} size="sm" />
        </div>
      )}
      <Sprite animation={enemy.animations[enemy.state]} entity="enemy" />
    </div>
  );
}
