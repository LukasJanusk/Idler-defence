import type { Skill } from '@/types';

export const KnightSkills: Skill[] = [
  {
    id: 'Knight-Intimidate',
    name: 'Intimidate',
    description: 'Knight presence strikes fear into enemies hearts.',
    url: '',
    damage: 0,
    duration: 0.7,
    speed: 1,
    action: 'idle',
  },
  {
    id: 'Knight-PowerfulStab',
    name: 'Powerful Stab',
    description: 'A powerful attack thant penetrates light armour.',
    url: '',
    damage: 80,
    duration: 0.4,
    speed: 1,
    action: 'attack',
  },
  {
    id: 'Knight-GuardAlly',
    name: 'Guard Ally',
    description:
      'Knight shields his allies with large shield, increasing allies defensive abilities.',
    url: '',
    damage: 0,
    duration: 0.5,
    speed: 1,
    action: 'guard',
  },
  {
    id: 'Knight-Defend',
    name: 'Defend',
    description:
      'Knight stands still like an immovable colossus, preventing most damage from enemy attacks.',
    url: '',
    damage: 0,
    duration: 0.1,
    speed: 1,
    action: 'protect',
  },
];
