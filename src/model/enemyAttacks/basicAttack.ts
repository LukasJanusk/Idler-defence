import { Attack } from '@/model/entities/attack';
import { v4 } from 'uuid';

export const createBasicAttack = (
  x: number,
  y: number,
  damage: number,
  multiplier: number = 1,
  size: number = 1,
) => {
  const attack = new Attack(
    `basicAttack-${v4()}`,
    damage,
    { x, y, width: 128 * size, height: 128 * size },
    1,
    'enemy',
  );
  attack.onHit = (entity: { health: number }) => {
    entity.health -= attack.damage;
  };
  attack.multiplier = multiplier;
  return attack;
};
