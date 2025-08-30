import type { Skill } from '@/types';
import magicArrow from '@/assets/skill_icons/magic_arrow_icon.png';
import magicSphere from '@/assets/skill_icons/magic_sphere_icon.png';
import arcaneBlast from '@/assets/skill_icons/arcane_blast_icon.png';
import wizardRecover from '@/assets/skill_icons/wizard_recover_icon.png';

export const wizardSkills: Skill[] = [
  {
    id: 'Wizard-Recover',
    name: 'Recover',
    description:
      'Wizard shares arcane knowledge with his companions to increase their Energy recovery.',
    url: new URL(wizardRecover, import.meta.url).href,
    baseDamage: 0,
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
    url: new URL(magicArrow, import.meta.url).href,
    baseDamage: 80,
    damage: 80,
    duration: 0.9,
    speed: 1,
    action: 'magicArrow',
    cost: 15,
    multiplier: 1,

    level: 1,
  },
  {
    id: 'Wizard-MagicBall',
    name: 'Arcane Blast',
    description: 'Devastating attack of energy that explodes on inpact.',
    url: new URL(arcaneBlast, import.meta.url).href,
    baseDamage: 60,
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
    url: new URL(magicSphere, import.meta.url).href,
    baseDamage: 220,
    damage: 220,
    duration: 1.6,
    speed: 1,
    action: 'magicSphere',
    level: 1,
    cost: 70,
    multiplier: 30,
  },
];
