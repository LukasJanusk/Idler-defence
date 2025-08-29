import lightningStrike from '@/assets/Lightning_Mage/Charge.png';
import { v4 } from 'uuid';
import { LightningMage } from '../entities/character';
import { type Grid } from '../grid';
import { registerAttackToGrid } from '@/utils';
import { GRID_AREA_SIZE } from '@/constants';
import { Projectile } from '../entities/projectile';
import { createAnimation } from '../animations/animation';
import { Attack } from '../entities/attack';

export const createLightningChargeAttack = (
  x: number,
  y: number,
  multiplier: number = 1,
  damage: number = 60,
) => {
  const animation = createAnimation(lightningStrike, 5, 100, 'chargedBolts');
  const projectile = new Projectile(
    `Charged-Bolt${v4()}`,
    'Charged Bolt',
    animation,
    damage * multiplier,
    'character',
    { x: x + 64, y: y + 42, width: 16, height: 64 },
    { x: 1280, y: y, width: GRID_AREA_SIZE, height: GRID_AREA_SIZE },
    100,
    null,
  );
  return projectile;
};
export const createLightningStrikeAttack = (
  x: number,
  y: number,
  multiplier: number = 1,
  damage: number = 100,
) => {
  const attack = new Attack(
    `Lightning-Strike-${v4()}`,
    damage,
    { x, y, width: 128, height: 128 },
    'player',
    1,
  );
  attack.multiplier = multiplier;
  return attack;
};

// export const createWizardMagicSphereAttack = (
//   x: number,
//   y: number,
//   multiplier: number = 1,
//   damage: number,
// ) => {
//   const animation = createAnimation(magicSphere, 9, 100, 'magicSphere');
//   const projectile = new Projectile(
//     `magicSphere-${v4()}`,
//     'Magic Sphere',
//     animation,
//     damage * multiplier,
//     'character',
//     { x: x + 64, y: y + 42, width: 32, height: 64 },
//     { x: 1280, y: y, width: GRID_AREA_SIZE, height: GRID_AREA_SIZE },
//     150,
//     null,
//   );
//   return projectile;
// };
// export const createWizardMagicArrowAttack = (
//   x: number,
//   y: number,
//   multiplier: number = 1,
//   damage: number = 120,
// ) => {
//   const animation = createAnimation(magicArrow, 5, 100, 'magicSphere');
//   const projectile = new Projectile(
//     `magicSphere-${v4()}`,
//     'Magic Sphere',
//     animation,
//     damage * multiplier,
//     'character',
//     { x: x + 64, y: y + 42, width: 16, height: 64 },
//     { x: 1280, y: y, width: GRID_AREA_SIZE, height: GRID_AREA_SIZE },
//     350,
//     null,
//   );
//   projectile.stun = false;
//   return projectile;
// };
const createZapAttack = (
  x: number,
  y: number,
  multiplier: number = 1,
  damage: number = 5,
) => {
  const attack = new Attack(
    `Lightning-Zap-${v4()}`,
    damage,
    { x, y, width: 128, height: 128 },
    'player',
    1,
  );
  attack.multiplier = multiplier;
  return attack;
};

const createLightning = (damage: number, grid: Grid) => {
  const makeAttack = () => {
    const lightning = new Attack(
      `Lightning + ${Math.random()}`,
      damage,
      { x: 0, y: 256, width: 128, height: 128 },
      'player',
      9,
    );
    lightning.onHit = () => {
      grid.generateParticles(
        'blood',
        lightning.rect.x + lightning.rect.width / 2,
        lightning.rect.y + lightning.rect.height / 2,
        10,
      );
    };
    return lightning;
  };
  const randomCol = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
  const col = grid.getColumn(randomCol);

  col?.forEach((a) => {
    a.registerEntity(makeAttack());
  });
};
const createDischargeAttack = (
  x: number,
  y: number,
  multiplier: number = 1,
  damage: number = 40,
) => {
  const attack = new Attack(
    `Lightning-Discharge-${v4()}`,
    damage,
    { x, y, width: 128, height: 128 },
    'player',
    2,
  );
  attack.multiplier = multiplier;
  return attack;
};
export const initLightningMageAttacks = (
  grid: Grid,
  lightningMage: LightningMage,
) => {
  const lightningStrike = () => {
    const attack = createLightningStrikeAttack(
      lightningMage.rect.x,
      lightningMage.rect.y,
      lightningMage.skills.find((s) => s.action === 'attack')?.multiplier,
      lightningMage.skills.find((s) => s.action === 'attack')?.damage,
    );
    attack.onHit = (target) => {
      createLightning(
        lightningMage.skills.find((s) => s.action === 'attack')?.damage ||
          attack.damage,
        grid,
      );
      grid.generateParticles(
        'ember',
        target
          ? target.rect.x + target.rect.width / 2
          : attack.rect.x + attack.rect.width / 2,
        target
          ? target.rect.y + target.rect.height / 2
          : attack.rect.y + attack.rect.height / 2,
        10,
      );
    };
    return attack;
  };

  registerAttackToGrid(
    grid,
    lightningMage,
    lightningStrike,
    [7],
    lightningMage.animations.attack,
    0,
  );

  const lightningCharge = () => {
    const charge = createLightningChargeAttack(
      lightningMage.rect.x,
      lightningMage.rect.y,
      lightningMage.skills.find((s) => s.action === 'attack')?.multiplier,
      lightningMage.skills.find((s) => s.action === 'attack')?.damage,
    );
    charge.onHit = (target) =>
      grid.generateParticles(
        'ember',
        target
          ? target.rect.x + target.rect.width / 2
          : charge.rect.x + charge.rect.width / 2,
        target
          ? target.rect.y + target.rect.height / 2
          : charge.rect.y + charge.rect.height / 2,
        10,
      );
    const pos = lightningMage.pos;
    if (!pos) return;
    const area = grid.getAreaFromPos(pos);
    area?.registerEntity(charge);
  };

  lightningMage.animations.chargedBolts.onFrame(3, lightningCharge);
  const zap = () => {
    const zapAttack = createZapAttack(
      lightningMage.rect.x,
      lightningMage.rect.y,
      lightningMage.getCurrentSkill()?.multiplier,
      lightningMage.getCurrentSkill()?.damage,
    );

    zapAttack.onHit = () => {
      grid.generateParticles(
        'ember',
        zapAttack.rect.x + zapAttack.rect.width / 2,
        zapAttack.rect.y + zapAttack.rect.height / 2,
        5,
      );
    };
    return zapAttack;
  };
  registerAttackToGrid(
    grid,
    lightningMage,
    zap,
    [3],
    lightningMage.animations.idle,
    9,
  );
  const stream = () => {
    const charge = createDischargeAttack(
      lightningMage.rect.x,
      lightningMage.rect.y,
      lightningMage.skills.find((s) => s.action === 'discharge')?.multiplier,
      lightningMage.skills.find((s) => s.action === 'discharge')?.damage,
    );
    charge.onHit = () =>
      grid.generateParticles(
        'ember',
        charge.rect.x + charge.rect.width / 2,
        charge.rect.y + charge.rect.height / 2,
        5,
      );
    return charge;
  };
  registerAttackToGrid(
    grid,
    lightningMage,
    stream,
    [5, 6, 7],
    lightningMage.animations.discharge,
    2,
  );
  const generateSparks = (stepX: number) => {
    grid.generateParticles(
      'ember',
      lightningMage.rect.x + stepX,
      lightningMage.rect.y + 76,
      10,
    );
  };

  lightningMage.animations.discharge.onFrame(3, () => generateSparks(178));
  lightningMage.animations.discharge.onFrame(4, () => generateSparks(198));
  lightningMage.animations.discharge.onFrame(5, () => generateSparks(228));
  lightningMage.animations.discharge.onFrame(6, () => generateSparks(258));
  lightningMage.animations.discharge.onFrame(7, () => generateSparks(288));
  lightningMage.animations.discharge.onFrame(8, () => generateSparks(318));

  lightningMage.attacksLoaded = true;
};
