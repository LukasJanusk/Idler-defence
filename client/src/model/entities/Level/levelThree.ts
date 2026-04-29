import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { Grid } from '@/model/grid';
import type { CreateEnemyEventData, Level } from '@/types';
import { createLevelFromWaveData } from './levelUtils';

export const waveOneEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 14, interval: 6000, startTime: 0 },
  { enemyType: 'fastZombie', count: 10, interval: 4200, startTime: 8000 },
];

export const waveTwoEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 12, interval: 6500, startTime: 0 },
  { enemyType: 'fastZombie', count: 10, interval: 3000, startTime: 12000 },
];

export const waveThreeEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 12, interval: 5000, startTime: 0 },
  { enemyType: 'zombieOne', count: 10, interval: 6500, startTime: 6000 },
  { enemyType: 'savageZombie', count: 3, interval: 12000, startTime: 42000 },
];

export const waveFourEventsData: CreateEnemyEventData[] = [
  { enemyType: 'fastZombie', count: 20, interval: 2400, startTime: 0 },
  { enemyType: 'zombieOne', count: 10, interval: 6000, startTime: 4000 },
  { enemyType: 'savageZombie', count: 4, interval: 10000, startTime: 32000 },
];

export const waveFiveEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 14, interval: 5500, startTime: 0 },
  { enemyType: 'fastZombie', count: 14, interval: 2800, startTime: 6000 },
  { enemyType: 'savageZombie', count: 5, interval: 8500, startTime: 26000 },
];

export const waveSixEventsData: CreateEnemyEventData[] = [
  { enemyType: 'fastZombie', count: 18, interval: 2600, startTime: 0 },
  { enemyType: 'savageZombie', count: 8, interval: 6500, startTime: 8000 },
  { enemyType: 'zombieOne', count: 6, interval: 7000, startTime: 20000 },
];

export const waveSevenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 1, interval: 0, startTime: 0 },
  { enemyType: 'fastZombie', count: 8, interval: 3200, startTime: 10000 },
  { enemyType: 'savageZombie', count: 4, interval: 9000, startTime: 18000 },
];

const levelThreeWaves: CreateEnemyEventData[][] = [
  waveOneEventsData,
  waveTwoEventsData,
  waveThreeEventsData,
  waveFourEventsData,
  waveFiveEventsData,
  waveSixEventsData,
  waveSevenEventsData,
];

export const createLevelThree = (
  grid: Grid,
  onEnemyDeath?: (enemy?: Enemy<EnemyAction>) => void,
): Level =>
  createLevelFromWaveData(
    'Level-3',
    'Level 3',
    levelThreeWaves,
    grid,
    onEnemyDeath,
  );
