import type { Skill } from '@/types';
import knightStab from '@/assets/skill_icons/knight_stab_icon.png';
import knightIntimidate from '@/assets/skill_icons/knight_intimidate_icon.png';
import knightGuard from '@/assets/skill_icons/knight_guard_icon.png';
import knightDefend from '@/assets/skill_icons/knight_defend_icon.png';

export const KnightSkills: Skill[] = [
  {
    id: 'Knight-Intimidate',
    name: 'Intimidate',
    description:
      'Knight presence strikes fear into enemies hearts slowing them down.',
    url: new URL(knightIntimidate, import.meta.url).href,
    baseDamage: 0,
    damage: 0,
    duration: 0.7,
    speed: 1,
    action: 'idle',
    level: 1,
    cost: -1,
    multiplier: 1,
  },
  {
    id: 'Knight-PowerfulStab',
    name: 'Powerful Stab',
    description: 'A powerful attack thant penetrates light armour.',
    url: new URL(knightStab, import.meta.url).href,
    baseDamage: 80,
    damage: 80,
    duration: 0.4,
    speed: 1,
    action: 'attack',
    level: 1,
    cost: 5,
    multiplier: 1,
  },
  {
    id: 'Knight-GuardAlly',
    name: 'Guard Allies',
    description:
      'Knight shields his allies with large shield, increasing their defensive abilities.',
    url: new URL(knightGuard, import.meta.url).href,
    baseDamage: 0,
    damage: 0,
    duration: 0.5,
    speed: 1,
    action: 'guard',
    level: 1,
    cost: 1,
    multiplier: 1,
    armor: 15,
  },
  {
    id: 'Knight-Defend',
    name: 'Defend',
    description: 'Knight stands still blocking most damage from enemy attacks',
    url: new URL(knightDefend, import.meta.url).href,
    baseDamage: 0,
    damage: 0,
    duration: 0.1,
    speed: 1,
    action: 'protect',
    level: 1,
    cost: 1,
    multiplier: 1,
    armor: 50,
  },
];
