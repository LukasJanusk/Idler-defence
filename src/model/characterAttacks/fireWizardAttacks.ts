import { Attack } from '../entities/attack';
import { v4 } from 'uuid';
import { createProjectileAnimation, Projectile } from '../entities/projectile';
import fireballSheetImg from '@/assets/Fire_Wizard/Charge.png';

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
  const animation = createProjectileAnimation(
    fireballSheetImg,
    11,
    5,
    100,
    'fireball',
  );

  const projectile = new Projectile(
    `fireball-${v4()}`,
    'fireball',
    animation,
    50 * multiplier,
    'player',
    { x, y, width: 64, height: 64 },
    { x: 1152, y: y + 64, width: 128, height: 128 },
    300,
    null,
  );
  return projectile;
};
