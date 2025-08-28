import type { Skill } from '@/types';

export const wizardSkills: Skill[] = [
  {
    id: 'Wizard-Recover',
    name: 'Recover',
    description:
      'Wizard shares arcane knowledge with his companions to increase their Energy recovery.',
    url: '',
    damage: 0,
    duration: 0.8,
    speed: 1,
    action: 'idle',
    level: 1,
    cost: -5,
    multiplier: 1,
  },
  {
    id: 'Wizard-MagicArrow',
    name: 'Magic Arrow',
    description: 'Shoots a powerful fast movig projectile toawrds an enemy.',
    url: '',
    damage: 120,
    duration: 0.9,
    speed: 1,
    action: 'magicArrow',
    cost: 15,
    multiplier: 1,

    level: 1,
  },
  {
    id: 'Wizard-MagicBall',
    name: 'Arcane Ball',
    description: 'Devastating ball of energy that explodes on inpact.',
    url: '',
    damage: 60,
    duration: 0.7,
    speed: 1,
    action: 'magicBall',
    level: 1,
    cost: 25,
    multiplier: 1,
  },
  {
    id: 'Wizard-MagicSphere',
    name: 'Magic Sphere',
    description:
      'Releases enourmous discharge of pure arcane energy. Only the most elite wizards can master this technique.',
    url: '',
    damage: 220,
    duration: 1.6,
    speed: 1,
    action: 'magicSphere',
    level: 1,
    cost: 1,
    multiplier: 30,
  },
];
