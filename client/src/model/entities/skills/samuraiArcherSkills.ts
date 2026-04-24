import type { Skill } from '@/types';
import recoveryIcon from '@/assets/skill_icons/samurai_archer_recovery_icon.png';
import slashIcon from '@/assets/skill_icons/samurai_archer_slash_icon.png';
import drawCutIcon from '@/assets/skill_icons/samurai_archer_draw_cut_icon.png';
import bowShotIcon from '@/assets/skill_icons/samurai_archer_bow_shot_icon.png';
import type { SamuraiArcherAction } from '../character';
import {
  samuraiArcherBowShotLevelUpData,
  samuraiArcherDrawCutLevelUpData,
  samuraiArcherRecoveryLevelUpData,
  samuraiArcherSlashLevelUpData,
} from './skillLevelData';

export const samuraiArcherSkills: Skill<SamuraiArcherAction>[] = [
  {
    id: 'SamuraiArcher-SecondWind',
    name: 'Second Wind',
    description:
      'Focus and breathing drills restore stamina and steady the next exchange.',
    url: new URL(recoveryIcon, import.meta.url).href,
    baseDamage: 0,
    damage: 0,
    duration: 0.9,
    speed: 1,
    action: 'idle',
    level: 1,
    cost: -3,
    multiplier: 1,
    skillLevelUpData: samuraiArcherRecoveryLevelUpData,
  },
  {
    id: 'SamuraiArcher-RisingSlash',
    name: 'Rising Slash',
    description: 'A fast sword strike for enemies in melee range.',
    url: new URL(slashIcon, import.meta.url).href,
    baseDamage: 68,
    damage: 68,
    duration: 0.5,
    speed: 1,
    action: 'attack',
    level: 1,
    cost: 4,
    multiplier: 1,
    skillLevelUpData: samuraiArcherSlashLevelUpData,
  },
  {
    id: 'SamuraiArcher-DrawCut',
    name: 'Draw Cut',
    description: 'A heavier sword cut that reaches one area farther.',
    url: new URL(drawCutIcon, import.meta.url).href,
    baseDamage: 96,
    damage: 96,
    duration: 0.6,
    speed: 1,
    action: 'drawCut',
    level: 1,
    cost: 8,
    multiplier: 1,
    skillLevelUpData: samuraiArcherDrawCutLevelUpData,
  },
  {
    id: 'SamuraiArcher-BowShot',
    name: 'Bow Shot',
    description: 'Launch a precise arrow at distant enemies.',
    url: new URL(bowShotIcon, import.meta.url).href,
    baseDamage: 108,
    damage: 108,
    duration: 1.4,
    speed: 460,
    action: 'bowShot',
    level: 1,
    cost: 10,
    multiplier: 1,
    skillLevelUpData: samuraiArcherBowShotLevelUpData,
  },
];
