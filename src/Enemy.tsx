import Sprite from './Sprite';
import type { Enemy } from './enemy';
type EnemyProps = {
  enemy: Enemy;
};

export default function EnemyComponent({ enemy }: EnemyProps) {
  const currentState = enemy.state;
  const currentAnimation = enemy.animations[currentState];

  return (
    <>
      <Sprite
        animations={currentAnimation}
        state={currentState}
        scale={1}
        onAnimationEnd={() => {}}
      />
    </>
  );
}
