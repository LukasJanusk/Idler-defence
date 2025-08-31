import type { Skill } from '@/types';
import zap from '@/assets/skill_icons/lightning_mage_zap_icon.png';
import strike from '@/assets/skill_icons/lightning_mage_strike_icon.png';
import chargedBolts from '@/assets/skill_icons/lightning_mage_charged_bolt_icon.png';
import discharge from '@/assets/skill_icons/lightning_mage_discharge_icon.png';
import type { LightningMageAction } from '../character';

export const lightningMageSkills: Skill<LightningMageAction>[] = [
  {
    id: 'LightningMage-Zap',
    name: 'Zap',
    description:
      'Generates a static field that periodically electrifies all enemies.',

    url: new URL(zap, import.meta.url).href,
    baseDamage: 4,
    damage: 4,
    duration: 0.7,
    speed: 1,
    action: 'idle',
    level: 1,
    cost: -1,
    multiplier: 1,
  },
  {
    id: 'LightningMage-LightningStrike',
    name: 'Lightning Strike',
    description:
      'Lightnig mage attaks summon lightning strikes to random areas on the field.',
    url: new URL(strike, import.meta.url).href,
    baseDamage: 150,
    damage: 150,
    duration: 1,
    speed: 1,
    action: 'attack',
    level: 1,
    cost: 15,
    multiplier: 1,
  },
  {
    id: 'LightningMage-ChargedBolts',
    name: 'Charged Bolts',
    description: 'Shoot small moving particles of electricity.',
    url: new URL(chargedBolts, import.meta.url).href,
    baseDamage: 20,
    damage: 25,
    duration: 0.4,
    speed: 1,
    action: 'chargedBolts',
    level: 1,
    cost: 10,
    multiplier: 1,
  },
  {
    id: 'LightningMage-LightningStream',
    name: 'Discharge',
    description: 'Release continous stream of electricity to closeby enemies.',
    url: new URL(discharge, import.meta.url).href,
    baseDamage: 40,
    damage: 40,
    duration: 1.3,
    speed: 1,
    action: 'discharge',
    level: 1,
    cost: 20,
    multiplier: 1,
  },
];
