import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { Grid } from '@/model/grid';
import type { CreateEnemyEventData, Level } from '@/types';
import { createLevelFromWaveData } from './levelUtils';

export const waveOneEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 22, interval: 4000, startTime: 0 },
  { enemyType: 'fastZombie', count: 22, interval: 2400, startTime: 4000 },
];

export const waveTwoEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 22, interval: 4400, startTime: 0 },
  { enemyType: 'fastZombie', count: 22, interval: 2000, startTime: 6000 },
];

export const waveThreeEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 20, interval: 3400, startTime: 0 },
  { enemyType: 'zombieOne', count: 18, interval: 4000, startTime: 3000 },
  { enemyType: 'savageZombie', count: 12, interval: 5600, startTime: 16000 },
];

export const waveFourEventsData: CreateEnemyEventData[] = [
  { enemyType: 'fastZombie', count: 32, interval: 1600, startTime: 0 },
  { enemyType: 'zombieOne', count: 22, interval: 3800, startTime: 2000 },
  { enemyType: 'savageZombie', count: 14, interval: 5200, startTime: 16000 },
];

export const waveFiveEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 24, interval: 3800, startTime: 0 },
  { enemyType: 'fastZombie', count: 22, interval: 1700, startTime: 3000 },
  { enemyType: 'savageZombie', count: 16, interval: 4800, startTime: 14000 },
];

export const waveSixEventsData: CreateEnemyEventData[] = [
  { enemyType: 'savageZombie', count: 18, interval: 4200, startTime: 0 },
  { enemyType: 'fastZombie', count: 24, interval: 1700, startTime: 4000 },
  { enemyType: 'zombieOne', count: 16, interval: 3800, startTime: 10000 },
];

export const waveSevenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 3, interval: 22000, startTime: 0 },
  { enemyType: 'fastZombie', count: 16, interval: 1800, startTime: 5000 },
  { enemyType: 'savageZombie', count: 12, interval: 4800, startTime: 11000 },
];

const levelNineWaves: CreateEnemyEventData[][] = [
  waveOneEventsData,
  waveTwoEventsData,
  waveThreeEventsData,
  waveFourEventsData,
  waveFiveEventsData,
  waveSixEventsData,
  waveSevenEventsData,
];

export const createLevelNine = (
  grid: Grid,
  onEnemyDeath?: (enemy?: Enemy<EnemyAction>) => void,
): Level =>
  createLevelFromWaveData(
    'Level-9',
    'Level 9',
    levelNineWaves,
    grid,
    onEnemyDeath,
  );
