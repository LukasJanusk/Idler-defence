import type { EnemyAction } from '@/model/entities/character';
import Sprite from './components/reusable/Sprite';
import type { Enemy } from '@/model/entities/enemy';
type EnemyProps = {
  enemy: Enemy<EnemyAction>;
};

export default function EnemyComponent({ enemy }: EnemyProps) {
  return (
    <div className="absolute">
      <Sprite animation={enemy.animations[enemy.state]} entity="enemy" />
    </div>
  );
}
