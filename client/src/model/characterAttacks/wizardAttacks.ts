import { Attack } from '@/model/entities/attack';
import { v4 } from 'uuid';
import type { Wizard } from '../entities/character';
import type { Grid } from '../grid';
import { getRandomInt, registerAttackToGrid } from '@/utils';
import { GRID_AREA_SIZE, PARTY_POSITIO_ROW } from '@/constants';
import { Buff } from '../entities/buff';
import magicSphere from '@/assets/Wanderer_Magican/Charge_1.png';
import magicArrow from '@/assets/Wanderer_Magican/Charge_2.png';
import { Projectile } from '../entities/projectile';
import { createAnimation } from '../animations/animation';
import { createKnockbackDebuff } from '../entities/debuff';

export const createWizardMagicBallAttack = (
  x: number,
  y: number,
  multiplier: number = 1,
  damage: number = 60,
) => {
  const attack = new Attack(
    `Wizard-Magic-Ball-${v4()}`,
    damage,
    { x, y, width: 128, height: 128 },
    'player',
    1,
  );
  attack.multiplier = multiplier;
  return attack;
};
export const createWizardMagicSphereAttack = (
  x: number,
  y: number,
  multiplier: number = 1,
  damage: number,
) => {
  const animation = createAnimation(magicSphere, 9, 100, 'magicSphere');
  const projectile = new Projectile(
    `magicSphere-${v4()}`,
    'Magic Sphere',
    animation,
    damage * multiplier,
    'character',
    { x: x + 64, y: y + 42, width: 32, height: 64 },
    { x: 1280, y: y, width: GRID_AREA_SIZE, height: GRID_AREA_SIZE },
    150,
    null,
  );
  projectile.onHit = (target) =>
    target?.registerDebuff(createKnockbackDebuff(100, 200));
  return projectile;
};
export const createWizardMagicArrowAttack = (
  x: number,
  y: number,
  multiplier: number = 1,
  damage: number = 120,
) => {
  const animation = createAnimation(magicArrow, 5, 100, 'magicSphere');
  const projectile = new Projectile(
    `magicSphere-${v4()}`,
    'Magic Sphere',
    animation,
    damage * multiplier,
    'character',
    { x: x + 64, y: y + 42, width: 16, height: 64 },
    { x: 1280, y: y, width: GRID_AREA_SIZE, height: GRID_AREA_SIZE },
    350,
    null,
  );
  projectile.stun = false;
  return projectile;
};
export const initWizardAttacks = (grid: Grid, wizard: Wizard) => {
  const buff = () => {
    const getValue = () => {
      let value = 0.005;
      const cost = wizard.getCurrentSkill()?.cost;
      if (cost) value = cost / 1000;
      return value;
    };

    const buff = new Buff(
      `Wizard-Regeneration`,
      'player',
      {
        healthRecovery: getValue(),
        energyRecovery: getValue(),
      },
      1000,
    );
    return buff;
  };
  wizard.animations.idle.onFrame(5, () =>
    Buff.registerBuffToPlayers(grid, buff()),
  );
  const magicArrow = () => {
    const arrow = createWizardMagicArrowAttack(
      wizard.rect.x,
      wizard.rect.y,
      wizard.skills.find((s) => s.action === 'magicArrow')?.multiplier,
      wizard.skills.find((s) => s.action === 'magicArrow')?.damage,
    );
    arrow.onHit = (target) =>
      grid.generateParticles(
        'magic',
        target
          ? target.rect.x + target.rect.width / 2
          : arrow.rect.x + arrow.rect.width / 2,
        target
          ? target.rect.y + target.rect.height / 2
          : arrow.rect.y + arrow.rect.height / 2,
        3,
      );
    const pos = wizard.pos;
    if (!pos) return;
    const area = grid.getAreaFromPos(pos);
    area?.registerEntity(arrow);
  };
  wizard.animations.magicArrow.onFrame(6, magicArrow);
  const magicBall = () => {
    const ball = createWizardMagicBallAttack(
      wizard.rect.x,
      wizard.rect.y,
      wizard.skills.find((s) => s.action === 'magicBall')?.multiplier,
      wizard.skills.find((s) => s.action === 'magicBall')?.damage,
    );
    ball.onHit = (target) =>
      grid.generateParticles(
        'magic',
        target
          ? target.rect.x + target.rect.width / 2
          : ball.rect.x + ball.rect.width / 2,
        target
          ? target.rect.y + target.rect.height / 2
          : ball.rect.y + ball.rect.height / 2,
        4,
      );
    return ball;
  };
  registerAttackToGrid(
    grid,
    wizard,
    magicBall,
    [3, 4],
    wizard.animations.magicBall,
    1,
  );

  wizard.animations.magicSphere.onFrame(13, () => {
    const projectile = createWizardMagicSphereAttack(
      wizard.rect.x,
      wizard.rect.y,
      1,
      wizard.getCurrentSkill()?.damage || 220,
    );
    projectile.animation.onFrame(4, () => {
      projectile.animation.frame = 0;
    });
    const prevOnHit = projectile.onHit;
    projectile.onHit = (target) => {
      if (prevOnHit) {
        prevOnHit(target);
      }
      grid.generateParticles(
        'magic',
        target
          ? target.rect.x + target.rect.width / 2
          : projectile.rect.x + projectile.rect.width / 2,
        target
          ? target.rect.y + target.rect.height / 2
          : projectile.rect.y + projectile.rect.height / 2,
        50,
      );
      projectile.animation.frame = 5;
    };
    projectile.animation.onFrame(
      projectile.animation.nFrame - 1,
      () => (projectile.isAlive = false),
    );
    const pos = wizard.pos;
    if (!pos) return;
    const area = grid.getAreaFromPos(pos);
    area?.registerEntity(projectile);
  });
  const generateHealth = () => {
    grid.generateParticles(
      'health',
      getRandomInt(0, GRID_AREA_SIZE * 4),
      (PARTY_POSITIO_ROW + 1) * GRID_AREA_SIZE - 10,
      1,
    );
  };
  const generateEnergy = () => {
    grid.generateParticles(
      'arcane',
      getRandomInt(0, GRID_AREA_SIZE * 4),
      (PARTY_POSITIO_ROW + 1) * GRID_AREA_SIZE - 10,
      1,
    );
  };
  wizard.animations.idle.onFrame(1, generateEnergy);
  wizard.animations.idle.onFrame(1, generateHealth);
  wizard.animations.idle.onFrame(5, generateEnergy);
  wizard.animations.idle.onFrame(5, generateHealth);

  wizard.attacksLoaded = true;
};
