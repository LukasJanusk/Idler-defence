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

export const waveEightEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 2, interval: 16000, startTime: 0 },
  { enemyType: 'fastZombie', count: 20, interval: 1700, startTime: 6000 },
  { enemyType: 'savageZombie', count: 14, interval: 5000, startTime: 11000 },
  { enemyType: 'zombieOne', count: 14, interval: 4200, startTime: 16000 },
];

export const waveNineEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 3, interval: 14240, startTime: 0 },
  { enemyType: 'fastZombie', count: 24, interval: 1513, startTime: 5000 },
  { enemyType: 'savageZombie', count: 17, interval: 4450, startTime: 10000 },
  { enemyType: 'zombieOne', count: 17, interval: 3738, startTime: 15000 },
];

export const waveTenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 4, interval: 12246, startTime: 0 },
  { enemyType: 'fastZombie', count: 30, interval: 1301, startTime: 4000 },
  { enemyType: 'savageZombie', count: 22, interval: 3827, startTime: 9000 },
  { enemyType: 'zombieOne', count: 22, interval: 3214, startTime: 14000 },
];

export const waveElevenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 6, interval: 10164, startTime: 0 },
  { enemyType: 'fastZombie', count: 39, interval: 1200, startTime: 3000 },
  { enemyType: 'savageZombie', count: 29, interval: 3176, startTime: 8000 },
  { enemyType: 'zombieOne', count: 29, interval: 2667, startTime: 13000 },
];

export const waveTwelveEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 9, interval: 8131, startTime: 0 },
  { enemyType: 'fastZombie', count: 53, interval: 1200, startTime: 2000 },
  { enemyType: 'savageZombie', count: 40, interval: 2540, startTime: 7000 },
  { enemyType: 'zombieOne', count: 40, interval: 2133, startTime: 12000 },
];

export const waveThirteenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 13, interval: 6260, startTime: 0 },
  { enemyType: 'fastZombie', count: 75, interval: 1200, startTime: 1000 },
  { enemyType: 'savageZombie', count: 56, interval: 1955, startTime: 6000 },
  { enemyType: 'zombieOne', count: 56, interval: 1642, startTime: 11000 },
];

const levelSevenWaves: CreateEnemyEventData[][] = [
  waveOneEventsData,
  waveTwoEventsData,
  waveThreeEventsData,
  waveFourEventsData,
  waveFiveEventsData,
  waveSixEventsData,
  waveSevenEventsData,
  waveEightEventsData,
  waveNineEventsData,
  waveTenEventsData,
  waveElevenEventsData,
  waveTwelveEventsData,
  waveThirteenEventsData,
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
