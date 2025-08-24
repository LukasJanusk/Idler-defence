import type { Skill } from '@/types';

export const lightningMageSkills: Skill[] = [
  {
    id: 'LightningMage-Zap',
    name: 'Zap',
    description:
      'Generates Static field of electricity periodically zapping all enemies',
    url: '',
    damage: 20,
    duration: 0.7,
    speed: 1,
    action: 'idle',
  },
  {
    id: 'LightningMage-LightningStrike',
    name: 'Lightning Strike',
    description:
      'Lightning mages can summon lighting from the blue skies strikes all enemies neraby.',
    url: '',
    damage: 110,
    duration: 1,
    speed: 1,
    action: 'attack',
  },
  {
    id: 'LightningMage-ChargedBolts',
    name: 'Charged Bolts',
    description: 'Shoot small moving particles of electricity to zap.',
    url: '',
    damage: 60,
    duration: 0.4,
    speed: 1,
    action: 'chargedBolts',
  },
  {
    id: 'LightningMage-LightningStream',
    name: 'Lightning Stream',
    description: 'Release continous stream of electricity to closeby enemies.',
    url: '',
    damage: 40,
    duration: 1.3,
    speed: 1,
    action: 'chargedBolts',
  },
];
