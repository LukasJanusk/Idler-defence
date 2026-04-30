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

export const waveEightEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 4, interval: 14000, startTime: 0 },
  { enemyType: 'fastZombie', count: 24, interval: 1400, startTime: 4000 },
  { enemyType: 'savageZombie', count: 20, interval: 3800, startTime: 8000 },
  { enemyType: 'zombieOne', count: 18, interval: 3200, startTime: 13000 },
];

export const waveNineEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 5, interval: 12460, startTime: 0 },
  { enemyType: 'fastZombie', count: 29, interval: 1246, startTime: 3000 },
  { enemyType: 'savageZombie', count: 24, interval: 3382, startTime: 7000 },
  { enemyType: 'zombieOne', count: 22, interval: 2848, startTime: 12000 },
];

export const waveTenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 7, interval: 10715, startTime: 0 },
  { enemyType: 'fastZombie', count: 37, interval: 1200, startTime: 2000 },
  { enemyType: 'savageZombie', count: 30, interval: 2908, startTime: 6000 },
  { enemyType: 'zombieOne', count: 28, interval: 2449, startTime: 11000 },
];

export const waveElevenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 10, interval: 8893, startTime: 0 },
  { enemyType: 'fastZombie', count: 49, interval: 1200, startTime: 1000 },
  { enemyType: 'savageZombie', count: 39, interval: 2413, startTime: 5000 },
  { enemyType: 'zombieOne', count: 37, interval: 2032, startTime: 10000 },
];

export const waveTwelveEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 14, interval: 7114, startTime: 0 },
  { enemyType: 'fastZombie', count: 67, interval: 1200, startTime: 0 },
  { enemyType: 'savageZombie', count: 53, interval: 1930, startTime: 4000 },
  { enemyType: 'zombieOne', count: 50, interval: 1625, startTime: 9000 },
];

export const waveThirteenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 20, interval: 5477, startTime: 0 },
  { enemyType: 'fastZombie', count: 94, interval: 1200, startTime: 0 },
  { enemyType: 'savageZombie', count: 75, interval: 1486, startTime: 3000 },
  { enemyType: 'zombieOne', count: 70, interval: 1251, startTime: 8000 },
];

export const waveFourteenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 29, interval: 4052, startTime: 0 },
  { enemyType: 'fastZombie', count: 137, interval: 1200, startTime: 0 },
  { enemyType: 'savageZombie', count: 109, interval: 1200, startTime: 2000 },
  { enemyType: 'zombieOne', count: 102, interval: 1200, startTime: 7000 },
];

export const waveFifteenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 44, interval: 2876, startTime: 0 },
  { enemyType: 'fastZombie', count: 206, interval: 1200, startTime: 0 },
  { enemyType: 'savageZombie', count: 164, interval: 1200, startTime: 1000 },
  { enemyType: 'zombieOne', count: 153, interval: 1200, startTime: 6000 },
];

export const waveSixteenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 69, interval: 2013, startTime: 0 },
  { enemyType: 'fastZombie', count: 320, interval: 1200, startTime: 0 },
  { enemyType: 'savageZombie', count: 255, interval: 1200, startTime: 0 },
  { enemyType: 'zombieOne', count: 238, interval: 1200, startTime: 5000 },
];

const levelTenWaves: CreateEnemyEventData[][] = [
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
  waveFourteenEventsData,
  waveFifteenEventsData,
  waveSixteenEventsData,
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
