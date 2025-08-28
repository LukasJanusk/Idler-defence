import { Attack } from '@/model/entities/attack';
import { v4 } from 'uuid';
import { Projectile } from '@/model/entities/projectile';
import fireballSheetImg from '@/assets/Fire_Wizard/Charge.png';
import { GRID_AREA_SIZE } from '@/constants';
import { createAnimation } from '../animations/animation';
import type { FireMage } from '../entities/character';
import type { Grid } from '../grid';
import { registerAttackToGrid } from '@/utils';

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
  attack.onHit = (entity: { health: number }) => {
    entity.health -= attack.damage;
  };
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
) => {
  const animation = createAnimation(fireballSheetImg, 12, 100, 'fireball');
  const projectile = new Projectile(
    `fireball-${v4()}`,
    'fireball',
    animation,
    50 * multiplier,
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
  registerAttackToGrid(
    grid,
    fireWizard,
    () =>
      createFireWizardFlameJetAttack(
        fireWizard.rect.x,
        fireWizard.rect.y,
        fireWizard.skills.find((s) => s.action === 'flamejet')?.multiplier,
        fireWizard.skills.find((s) => s.action === 'flamejet')?.damage,
      ),
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
    );
    projectile.animation.onFrame(5, () => {
      projectile.animation.frame = 0;
    });
    projectile.onHit = () => {
      grid.generateParticles(
        'ember',
        projectile.rect.x + projectile.rect.width / 2,
        projectile.rect.y + projectile.rect.height / 2,
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

  // Init skill cost
  fireWizard.animations.idle.onFrame(0, () => {
    fireWizard.energy -= fireWizard.getCurrentSkill()?.cost || 0;
  });
  fireWizard.animations.attack.onFrame(0, () => {
    fireWizard.energy -= fireWizard.getCurrentSkill()?.cost || 0;
  });
  fireWizard.animations.fireball.onFrame(0, () => {
    fireWizard.energy -= fireWizard.getCurrentSkill()?.cost || 0;
  });
  fireWizard.animations.flamejet.onFrame(0, () => {
    fireWizard.energy -= fireWizard.getCurrentSkill()?.cost || 0;
  });

  fireWizard.attacksLoaded = true;
};
