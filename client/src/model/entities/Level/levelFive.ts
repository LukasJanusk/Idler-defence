import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { Grid } from '@/model/grid';
import type { CreateEnemyEventData, Level } from '@/types';
import { createLevelFromWaveData } from './levelUtils';

export const waveOneEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 18, interval: 5200, startTime: 0 },
  { enemyType: 'fastZombie', count: 14, interval: 3400, startTime: 7000 },
];

export const waveTwoEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 16, interval: 5800, startTime: 0 },
  { enemyType: 'fastZombie', count: 14, interval: 2600, startTime: 9000 },
];

export const waveThreeEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 14, interval: 4200, startTime: 0 },
  { enemyType: 'zombieOne', count: 14, interval: 5200, startTime: 4000 },
  { enemyType: 'savageZombie', count: 5, interval: 9000, startTime: 30000 },
];

export const waveFourEventsData: CreateEnemyEventData[] = [
  { enemyType: 'fastZombie', count: 24, interval: 2100, startTime: 0 },
  { enemyType: 'zombieOne', count: 14, interval: 5200, startTime: 4000 },
  { enemyType: 'savageZombie', count: 6, interval: 7800, startTime: 24000 },
];

export const waveFiveEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 18, interval: 4800, startTime: 0 },
  { enemyType: 'fastZombie', count: 14, interval: 2400, startTime: 4000 },
  { enemyType: 'savageZombie', count: 7, interval: 7200, startTime: 22000 },
];

export const waveSixEventsData: CreateEnemyEventData[] = [
  { enemyType: 'fastZombie', count: 20, interval: 2200, startTime: 0 },
  { enemyType: 'savageZombie', count: 12, interval: 5600, startTime: 5000 },
  { enemyType: 'zombieOne', count: 10, interval: 5400, startTime: 15000 },
];

export const waveSevenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 1, interval: 0, startTime: 0 },
  { enemyType: 'fastZombie', count: 12, interval: 2400, startTime: 8000 },
  { enemyType: 'savageZombie', count: 8, interval: 7000, startTime: 14000 },
];

const levelFiveWaves: CreateEnemyEventData[][] = [
  waveOneEventsData,
  waveTwoEventsData,
  waveThreeEventsData,
  waveFourEventsData,
  waveFiveEventsData,
  waveSixEventsData,
  waveSevenEventsData,
];

export const createLevelFive = (
  grid: Grid,
  onEnemyDeath?: (enemy?: Enemy<EnemyAction>) => void,
): Level =>
  createLevelFromWaveData(
    'Level-5',
    'Level 5',
    levelFiveWaves,
    grid,
    onEnemyDeath,
  );
