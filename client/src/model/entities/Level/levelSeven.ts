import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { Grid } from '@/model/grid';
import type { CreateEnemyEventData, Level } from '@/types';
import { createLevelFromWaveData } from './levelUtils';

export const waveOneEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 20, interval: 4500, startTime: 0 },
  { enemyType: 'fastZombie', count: 18, interval: 2800, startTime: 5000 },
];

export const waveTwoEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 20, interval: 5000, startTime: 0 },
  { enemyType: 'fastZombie', count: 18, interval: 2200, startTime: 7000 },
];

export const waveThreeEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 18, interval: 3800, startTime: 0 },
  { enemyType: 'zombieOne', count: 16, interval: 4400, startTime: 3000 },
  { enemyType: 'savageZombie', count: 8, interval: 7000, startTime: 22000 },
];

export const waveFourEventsData: CreateEnemyEventData[] = [
  { enemyType: 'fastZombie', count: 28, interval: 1800, startTime: 0 },
  { enemyType: 'zombieOne', count: 18, interval: 4200, startTime: 3000 },
  { enemyType: 'savageZombie', count: 10, interval: 6400, startTime: 20000 },
];

export const waveFiveEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 20, interval: 4200, startTime: 0 },
  { enemyType: 'fastZombie', count: 18, interval: 2000, startTime: 3000 },
  { enemyType: 'savageZombie', count: 12, interval: 5800, startTime: 16000 },
];

export const waveSixEventsData: CreateEnemyEventData[] = [
  { enemyType: 'savageZombie', count: 14, interval: 5000, startTime: 0 },
  { enemyType: 'fastZombie', count: 20, interval: 1900, startTime: 5000 },
  { enemyType: 'zombieOne', count: 12, interval: 4600, startTime: 12000 },
];

export const waveSevenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 2, interval: 22000, startTime: 0 },
  { enemyType: 'fastZombie', count: 14, interval: 2100, startTime: 7000 },
  { enemyType: 'savageZombie', count: 10, interval: 5600, startTime: 13000 },
];

const levelSevenWaves: CreateEnemyEventData[][] = [
  waveOneEventsData,
  waveTwoEventsData,
  waveThreeEventsData,
  waveFourEventsData,
  waveFiveEventsData,
  waveSixEventsData,
  waveSevenEventsData,
];

export const createLevelSeven = (
  grid: Grid,
  onEnemyDeath?: (enemy?: Enemy<EnemyAction>) => void,
): Level =>
  createLevelFromWaveData(
    'Level-7',
    'Level 7',
    levelSevenWaves,
    grid,
    onEnemyDeath,
  );
