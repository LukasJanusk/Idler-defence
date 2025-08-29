import { Attack } from '@/model/entities/attack';
import { v4 } from 'uuid';
import { Projectile } from '@/model/entities/projectile';
import fireballSheetImg from '@/assets/Fire_Wizard/Charge.png';
import { GRID_AREA_SIZE } from '@/constants';
import { createAnimation } from '../animations/animation';
import type { FireMage } from '../entities/character';
import type { Grid } from '../grid';
import { getRandomInt, registerAttackToGrid } from '@/utils';

export const createFireWizardStabAttack = (
  x: number,
  y: number,
  multiplier: number = 1,
  damage: number = 60,
) => {
  const attack = new Attack(
    `fireWizardStab-${v4()}`,
    damage,
    { x, y, width: 128, height: 128 },

    'player',
  );
  attack.stun = false;
  attack.multiplier = multiplier;
  return attack;
};

export const createFireWizardFlameJetAttack = (
  x: number,
  y: number,
  multiplier: number = 1,
  damage: number = 30,
) => {
  const attack = new Attack(
    `fireWizardFlameJet-${v4()}`,
    damage,
    { x, y, width: 128, height: 128 },

    'player',
    2,
  );
  attack.multiplier = multiplier;
  return attack;
};

export const createFireWizardFireballAttack = (
  x: number,
  y: number,
  multiplier: number = 1,
  damage: number = 50,
) => {
  const animation = createAnimation(fireballSheetImg, 12, 100, 'fireball');
  const projectile = new Projectile(
    `fireball-${v4()}`,
    'fireball',
    animation,
    damage * multiplier,
    'character',
    { x: x + 60, y: y + 38, width: 32, height: 64 },
    { x: 1280, y: y, width: GRID_AREA_SIZE, height: GRID_AREA_SIZE },
    300,
    null,
  );
  return projectile;
};

export const initFireWizardAttacks = (grid: Grid, fireWizard: FireMage) => {
  registerAttackToGrid(
    grid,
    fireWizard,
    () =>
      createFireWizardStabAttack(
        fireWizard.rect.x,
        fireWizard.rect.y,
        fireWizard.skills.find((s) => s.action === 'attack')?.multiplier,
        fireWizard.skills.find((s) => s.action === 'attack')?.damage,
      ),
    [3],
    fireWizard.animations.attack,
    0,
  );
  const flameJet = () => {
    const jet = createFireWizardFlameJetAttack(
      fireWizard.rect.x,
      fireWizard.rect.y,
      fireWizard.skills.find((s) => s.action === 'flamejet')?.multiplier,
      fireWizard.skills.find((s) => s.action === 'flamejet')?.damage,
    );
    jet.onHit = () =>
      grid.generateParticles(
        'ember',
        jet.rect.x + jet.rect.width / 2,
        jet.rect.y + jet.rect.height / 2,
        5,
      );
    return jet;
  };
  registerAttackToGrid(
    grid,
    fireWizard,
    flameJet,
    [6, 7, 8, 9],
    fireWizard.animations.flamejet,
    2,
  );
  const generateEmbers = (stepX: number) => {
    grid.generateParticles(
      'ember',
      fireWizard.rect.x + stepX,
      fireWizard.rect.y + 76,
      10,
    );
  };

  fireWizard.animations.flamejet.onFrame(2, () => generateEmbers(138));
  fireWizard.animations.flamejet.onFrame(3, () => generateEmbers(178));
  fireWizard.animations.flamejet.onFrame(4, () => generateEmbers(198));
  fireWizard.animations.flamejet.onFrame(5, () => generateEmbers(228));
  fireWizard.animations.flamejet.onFrame(6, () => generateEmbers(258));
  fireWizard.animations.flamejet.onFrame(7, () => generateEmbers(288));
  fireWizard.animations.flamejet.onFrame(8, () => generateEmbers(318));
  fireWizard.animations.flamejet.onFrame(9, () => generateEmbers(348));
  fireWizard.animations.fireball.onFrame(6, () => {
    const projectile = createFireWizardFireballAttack(
      fireWizard.rect.x,
      fireWizard.rect.y,
      1,
      fireWizard.getCurrentSkill()?.damage,
    );
    projectile.animation.onFrame(5, () => {
      projectile.animation.frame = 0;
    });
    projectile.onHit = (target) => {
      grid.generateParticles(
        'ember',
        target
          ? target.rect.x + target.rect.width / 2
          : projectile.rect.x + projectile.rect.width / 2,

        target
          ? target.rect.y + target.rect.height / 2
          : projectile.rect.y + projectile.rect.height / 2,
        10,
      );
      projectile.animation.frame = 6;
    };
    projectile.animation.onFrame(
      projectile.animation.nFrame - 1,
      () => (projectile.isAlive = false),
    );
    const pos = fireWizard.pos;
    if (!pos) return;
    const area = grid.getAreaFromPos(pos);
    area?.registerEntity(projectile);
  });

  const regenerate = () => {
    if (fireWizard.energy === fireWizard.maxEnergy) return;
    grid.generateParticles(
      'arcane',
      getRandomInt(
        fireWizard.rect.x + 30,
        fireWizard.rect.x + GRID_AREA_SIZE - 50,
      ),
      fireWizard.rect.y + GRID_AREA_SIZE - 10,
      4,
    );
  };
  fireWizard.animations.idle.onFrame(1, regenerate);
  fireWizard.animations.idle.onFrame(3, regenerate);
  fireWizard.animations.idle.onFrame(5, regenerate);
  fireWizard.attacksLoaded = true;
};
