import { Attack } from '@/model/entities/attack';
import { v4 } from 'uuid';
import { Projectile } from '@/model/entities/projectile';
import fireballSheetImg from '@/assets/Fire_Wizard/Charge.png';
import { GRID_AREA_SIZE } from '@/constants';
import { createAnimation } from '../animations/animation';
import type { FireMage } from '../entities/character';
import type { Grid } from '../grid';

export const createFireWizardStabAttack = (
  x: number,
  y: number,
  multiplier: number = 1,
) => {
  const attack = new Attack(
    `fireWizardStab-${v4()}`,
    60,
    { x, y, width: 128, height: 128 },
    3,
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
) => {
  const attack = new Attack(
    `fireWizardFlameJet-${v4()}`,
    30,
    { x, y, width: 128, height: 128 },
    3,
    'player',
  );
  attack.onHit = (entity: { health: number }) => {
    entity.health -= attack.damage;
  };
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
  fireWizard.animations.attack.onFrame(3, () => {
    const attack = createFireWizardStabAttack(
      fireWizard.rect.x,
      fireWizard.rect.y,
      1,
    );
    attack.rect.x = fireWizard.rect.x + attack.range * GRID_AREA_SIZE;
    if (fireWizard.pos !== 'pos1') return;
    grid.grid[2][4].registerEntity(attack);
  });
  const createJet = () => {
    const attack = createFireWizardFlameJetAttack(
      fireWizard.rect.x,
      fireWizard.rect.y,
      1,
    );
    const attack2 = createFireWizardFlameJetAttack(
      fireWizard.rect.x,
      fireWizard.rect.y,
      1,
    );
    attack.rect.x = fireWizard.rect.x + GRID_AREA_SIZE;
    if (fireWizard.pos !== 'pos1') return;
    grid.grid[2][4].registerEntity(attack);
    grid.grid[2][5].registerEntity(attack2);
  };
  fireWizard.animations.flamejet.onFrame(3, createJet);
  fireWizard.animations.flamejet.onFrame(4, createJet);
  fireWizard.animations.flamejet.onFrame(5, createJet);
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
      projectile.animation.nFrame,
      () => (projectile.isAlive = false),
    );
    switch (fireWizard.pos) {
      case 'pos1':
        grid.grid[3][4].registerEntity(projectile);
        return;
      case 'pos2':
        grid.grid[3][3].registerEntity(projectile);
        return;
      case 'pos3':
        grid.grid[3][2].registerEntity(projectile);
        return;
      case 'pos4':
        grid.grid[3][1].registerEntity(projectile);
        return;
      default:
        return;
    }
  });
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
