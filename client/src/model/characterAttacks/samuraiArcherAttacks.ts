import arrowSprite from '@/assets/Samurai_Archer/Arrow.png';
import { GRID_AREA_SIZE } from '@/constants';
import { createAnimation } from '@/model/animations/animation';
import { Attack } from '@/model/entities/attack';
import { Buff } from '@/model/entities/buff';
import type { EnemyAction, SamuraiArcher } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { Projectile } from '@/model/entities/projectile';
import type { AnyCharacter } from '@/types';
import { getRandomInt, getRectMiddle, registerAttackToGrid } from '@/utils';
import { v4 } from 'uuid';
import type { Grid } from '../grid';
import type { GridRenderer } from '../gridRenderer';

const createRecoveryBuff = (samuraiArcher: SamuraiArcher) => {
  const skillCost = Math.abs(
    samuraiArcher.skills.find((s) => s.action === 'idle')?.cost || 1,
  );

  return new Buff(
    `SamuraiArcher-SecondWind-${v4()}`,
    'player',
    { energyRecovery: skillCost / 160, healthRecovery: skillCost / 600 },
    600,
  );
};

const generateRecoveryEffect = (
  renderer: GridRenderer,
  samuraiArcher: SamuraiArcher,
) => {
  const bubbleX = getRandomInt(
    samuraiArcher.rect.x + 28,
    samuraiArcher.rect.x + GRID_AREA_SIZE - 28,
  );
  const bubbleY = samuraiArcher.rect.y + GRID_AREA_SIZE - 12;

  renderer.generateParticles('health', bubbleX, bubbleY, 1);
  renderer.generateParticles('arcane', bubbleX, bubbleY, 1);
};

const addHitParticles = (
  renderer: GridRenderer,
  target?: Enemy<EnemyAction> | AnyCharacter,
) => {
  if (!target) return;
  const middle = getRectMiddle(target.rect);

  renderer.generateParticles('line', middle.x, middle.y + 12, 1, 0);
  renderer.generateParticles('blood', middle.x, middle.y + 12, 4);
};

export const createSamuraiArcherSlashAttack = (
  x: number,
  y: number,
  renderer: GridRenderer,
  multiplier: number = 1,
  damage: number = 60,
) => {
  const attack = new Attack(
    `SamuraiArcher-Slash-${v4()}`,
    damage,
    { x, y, width: GRID_AREA_SIZE, height: GRID_AREA_SIZE },
    'player',
    0,
  );

  attack.multiplier = multiplier;
  attack.onHit = (target) => addHitParticles(renderer, target);
  return attack;
};

export const createSamuraiArcherDrawCutAttack = (
  x: number,
  y: number,
  renderer: GridRenderer,
  multiplier: number = 1,
  damage: number = 85,
) => {
  const attack = new Attack(
    `SamuraiArcher-DrawCut-${v4()}`,
    damage,
    { x, y, width: GRID_AREA_SIZE, height: GRID_AREA_SIZE },
    'player',
    1,
  );

  attack.multiplier = multiplier;
  attack.onHit = (target) => addHitParticles(renderer, target);
  return attack;
};

export const createSamuraiArcherArrowAttack = (
  x: number,
  y: number,
  multiplier: number = 1,
  damage: number = 95,
  speed: number = 460,
) => {
  const targetYOffset = GRID_AREA_SIZE / 2;
  const animation = createAnimation(arrowSprite, 1, 100, 'bowShot');
  const projectile = new Projectile(
    `samurai-arrow-${v4()}`,
    'samurai-arrow',
    animation,
    damage * multiplier,
    'character',
    { x: x + 74, y: y + 34, width: 64, height: 64 },
    {
      x: 1280,
      y: y + targetYOffset,
      width: GRID_AREA_SIZE,
      height: GRID_AREA_SIZE,
    },
    speed,
    null,
  );

  projectile.stun = false;
  projectile.arcHeight = 42;
  return projectile;
};

export const initSamuraiArcherAttacks = (
  grid: Grid,
  renderer: GridRenderer,
  samuraiArcher: SamuraiArcher,
) => {
  registerAttackToGrid(
    grid,
    samuraiArcher,
    () =>
      createSamuraiArcherSlashAttack(
        samuraiArcher.rect.x,
        samuraiArcher.rect.y,
        renderer,
        samuraiArcher.skills.find((s) => s.action === 'attack')?.multiplier,
        samuraiArcher.skills.find((s) => s.action === 'attack')?.damage,
      ),
    [3],
    samuraiArcher.animations.attack,
    0,
  );

  registerAttackToGrid(
    grid,
    samuraiArcher,
    () =>
      createSamuraiArcherDrawCutAttack(
        samuraiArcher.rect.x,
        samuraiArcher.rect.y,
        renderer,
        samuraiArcher.skills.find((s) => s.action === 'drawCut')?.multiplier,
        samuraiArcher.skills.find((s) => s.action === 'drawCut')?.damage,
      ),
    [4],
    samuraiArcher.animations.drawCut,
    1,
  );

  const recover = () => {
    if (samuraiArcher.energy >= samuraiArcher.maxEnergy) return;
    samuraiArcher.registerBuff(createRecoveryBuff(samuraiArcher));
    generateRecoveryEffect(renderer, samuraiArcher);
  };

  samuraiArcher.animations.idle.onFrame(1, recover);
  samuraiArcher.animations.idle.onFrame(4, recover);
  samuraiArcher.animations.idle.onFrame(7, recover);

  samuraiArcher.animations.bowShot.onFrame(8, () => {
    const projectile = createSamuraiArcherArrowAttack(
      samuraiArcher.rect.x,
      samuraiArcher.rect.y,
      samuraiArcher.skills.find((s) => s.action === 'bowShot')?.multiplier,
      samuraiArcher.skills.find((s) => s.action === 'bowShot')?.damage,
      samuraiArcher.skills.find((s) => s.action === 'bowShot')?.speed,
    );

    projectile.onHit = (target) => {
      if (!target) return;
      const middle = getRectMiddle(target.rect);
      renderer.generateParticles('line', middle.x, middle.y, 1, 0);
      renderer.generateParticles('blood', middle.x, middle.y, 3);
    };
    const pos = samuraiArcher.pos;
    if (!pos) return;
    const area = grid.getAreaFromPos(pos);
    area?.registerEntity(projectile);
  });

  samuraiArcher.attacksLoaded = true;
};
