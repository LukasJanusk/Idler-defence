import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { Grid } from '@/model/grid';
import type { CreateEnemyEventData, Level } from '@/types';
import { createLevelFromWaveData } from './levelUtils';

export const waveOneEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 18, interval: 4800, startTime: 0 },
  { enemyType: 'fastZombie', count: 16, interval: 3000, startTime: 6000 },
];

export const waveTwoEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 18, interval: 5200, startTime: 0 },
  { enemyType: 'fastZombie', count: 16, interval: 2400, startTime: 8000 },
];

export const waveThreeEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 16, interval: 4000, startTime: 0 },
  { enemyType: 'zombieOne', count: 16, interval: 4800, startTime: 3000 },
  { enemyType: 'savageZombie', count: 6, interval: 8200, startTime: 24000 },
];

export const waveFourEventsData: CreateEnemyEventData[] = [
  { enemyType: 'fastZombie', count: 26, interval: 1900, startTime: 0 },
  { enemyType: 'zombieOne', count: 16, interval: 4600, startTime: 3000 },
  { enemyType: 'savageZombie', count: 8, interval: 7200, startTime: 22000 },
];

export const waveFiveEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 18, interval: 4400, startTime: 0 },
  { enemyType: 'fastZombie', count: 16, interval: 2200, startTime: 4000 },
  { enemyType: 'savageZombie', count: 10, interval: 6400, startTime: 18000 },
];

export const waveSixEventsData: CreateEnemyEventData[] = [
  { enemyType: 'savageZombie', count: 12, interval: 5400, startTime: 0 },
  { enemyType: 'fastZombie', count: 18, interval: 2100, startTime: 7000 },
  { enemyType: 'zombieOne', count: 12, interval: 5000, startTime: 14000 },
];

export const waveSevenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 2, interval: 24000, startTime: 0 },
  { enemyType: 'fastZombie', count: 12, interval: 2200, startTime: 8000 },
  { enemyType: 'savageZombie', count: 8, interval: 6200, startTime: 14000 },
];

const levelSixWaves: CreateEnemyEventData[][] = [
  waveOneEventsData,
  waveTwoEventsData,
  waveThreeEventsData,
  waveFourEventsData,
  waveFiveEventsData,
  waveSixEventsData,
  waveSevenEventsData,
];

export const createLevelSix = (
  grid: Grid,
  onEnemyDeath?: (enemy?: Enemy<EnemyAction>) => void,
): Level =>
  createLevelFromWaveData(
    'Level-6',
    'Level 6',
    levelSixWaves,
    grid,
    onEnemyDeath,
  );
