import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { Grid } from '@/model/grid';
import type { CreateEnemyEventData, Level } from '@/types';
import { createLevelFromWaveData } from './levelUtils';

export const waveOneEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 24, interval: 3800, startTime: 0 },
  { enemyType: 'fastZombie', count: 24, interval: 2200, startTime: 4000 },
];

export const waveTwoEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 24, interval: 4200, startTime: 0 },
  { enemyType: 'fastZombie', count: 24, interval: 1800, startTime: 5000 },
];

export const waveThreeEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 20, interval: 3200, startTime: 0 },
  { enemyType: 'zombieOne', count: 20, interval: 3800, startTime: 2500 },
  { enemyType: 'savageZombie', count: 14, interval: 5000, startTime: 14000 },
];

export const waveFourEventsData: CreateEnemyEventData[] = [
  { enemyType: 'fastZombie', count: 34, interval: 1500, startTime: 0 },
  { enemyType: 'zombieOne', count: 24, interval: 3600, startTime: 2000 },
  { enemyType: 'savageZombie', count: 16, interval: 4600, startTime: 14000 },
];

export const waveFiveEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 26, interval: 3600, startTime: 0 },
  { enemyType: 'fastZombie', count: 24, interval: 1600, startTime: 2500 },
  { enemyType: 'savageZombie', count: 18, interval: 4200, startTime: 12000 },
];

export const waveSixEventsData: CreateEnemyEventData[] = [
  { enemyType: 'savageZombie', count: 20, interval: 3800, startTime: 0 },
  { enemyType: 'fastZombie', count: 26, interval: 1600, startTime: 3000 },
  { enemyType: 'zombieOne', count: 18, interval: 3600, startTime: 9000 },
];

export const waveSevenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 3, interval: 18000, startTime: 0 },
  { enemyType: 'fastZombie', count: 18, interval: 1700, startTime: 5000 },
  { enemyType: 'savageZombie', count: 14, interval: 4200, startTime: 10000 },
  { enemyType: 'zombieOne', count: 10, interval: 3600, startTime: 18000 },
];

const levelTenWaves: CreateEnemyEventData[][] = [
  waveOneEventsData,
  waveTwoEventsData,
  waveThreeEventsData,
  waveFourEventsData,
  waveFiveEventsData,
  waveSixEventsData,
  waveSevenEventsData,
];

export const createLevelTen = (
  grid: Grid,
  onEnemyDeath?: (enemy?: Enemy<EnemyAction>) => void,
): Level =>
  createLevelFromWaveData(
    'Level-10',
    'Level 10',
    levelTenWaves,
    grid,
    onEnemyDeath,
  );
