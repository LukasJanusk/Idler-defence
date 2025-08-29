import { Attack } from '@/model/entities/attack';
import { v4 } from 'uuid';
import type { EnemyAction, Knight } from '../entities/character';
import type { Grid } from '../grid';
import { registerAttackToGrid } from '@/utils';
import { Debuff } from '../entities/debuff';
import { GRID_AREA_SIZE } from '@/constants';
import type { Enemy } from '../entities/enemy';
import type { AnyCharacter } from '@/types';
import { Buff } from '../entities/buff';

export const createKnightStabAttack = (
  x: number,
  y: number,
  multiplier: number = 1,
  damage: number = 80,
) => {
  const attack = new Attack(
    `KnightStabAttack-${v4()}`,
    damage,
    { x, y, width: 128, height: 128 },
    'player',
    0,
  );
  attack.multiplier = multiplier;
  return attack;
};
export const createKnightIntimidateAttack = (
  x: number,
  y: number,
  multiplier: number = 0,
  damage: number = 0,
) => {
  const debuff = new Debuff(
    'Knight-intimidate',
    'player',
    { speed: -1 },
    9,
    600,
  );
  const applyDebuff = (target?: Enemy<EnemyAction> | AnyCharacter) => {
    target?.registerDebuff(debuff);
  };
  const attack = new Attack(
    `Knight-intimidate-Attack${v4()}`,
    damage,
    { x, y, width: GRID_AREA_SIZE, height: GRID_AREA_SIZE },
    'player',
    9,
    applyDebuff,
    multiplier,
  );
  attack.stun = false;
  attack.duration = 50;
  return attack;
};
export const initKnightAttacks = (grid: Grid, knight: Knight) => {
  registerAttackToGrid(
    grid,
    knight,
    () =>
      createKnightStabAttack(
        knight.rect.x,
        knight.rect.y,
        knight.skills.find((s) => s.action === 'attack')?.multiplier,
        knight.skills.find((s) => s.action === 'attack')?.damage,
      ),
    [2],
    knight.animations.attack,
    0,
  );
  knight.animations.guard.onFrame(0, () => (knight.armor = 30));

  registerAttackToGrid(
    grid,
    knight,
    () =>
      createKnightIntimidateAttack(
        knight.rect.x,
        knight.rect.y,
        knight.skills.find((s) => s.action === 'idle')?.multiplier,
        knight.skills.find((s) => s.action === 'idle')?.damage,
      ),
    [3],
    knight.animations.idle,
    9,
  );
  const buff = () => {
    const buff = new Buff(
      `Knight-Guard`,
      'player',
      { armor: knight.getCurrentSkill()?.armor || 15 },
      600,
    );
    return buff;
  };
  knight.animations.guard.onFrame(4, () =>
    Buff.registerBuffToPlayers(grid, buff()),
  );
  knight.attacksLoaded = true;
};
