import type { EnemyAction } from '@/model/entities/character';
import Sprite from './Sprite';
import type { Enemy } from '@/model/entities/enemy';
type EnemyProps = {
  enemy: Enemy<EnemyAction>;
};

export default function EnemyComponent({ enemy }: EnemyProps) {
  const currentState = enemy.state;
  return (
    <>
      <Sprite
        animations={enemy.animations}
        state={currentState}
        scale={1}
        onAnimationEnd={() => {}}
      />
    </>
  );
}
