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

export const waveEightEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 3, interval: 15000, startTime: 0 },
  { enemyType: 'fastZombie', count: 22, interval: 1500, startTime: 5000 },
  { enemyType: 'savageZombie', count: 18, interval: 4200, startTime: 9000 },
  { enemyType: 'zombieOne', count: 16, interval: 3600, startTime: 14000 },
];

export const waveNineEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 4, interval: 13350, startTime: 0 },
  { enemyType: 'fastZombie', count: 27, interval: 1335, startTime: 4000 },
  { enemyType: 'savageZombie', count: 22, interval: 3738, startTime: 8000 },
  { enemyType: 'zombieOne', count: 20, interval: 3204, startTime: 13000 },
];

export const waveTenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 5, interval: 11481, startTime: 0 },
  { enemyType: 'fastZombie', count: 34, interval: 1200, startTime: 3000 },
  { enemyType: 'savageZombie', count: 28, interval: 3214, startTime: 7000 },
  { enemyType: 'zombieOne', count: 25, interval: 2755, startTime: 12000 },
];

export const waveElevenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 7, interval: 9529, startTime: 0 },
  { enemyType: 'fastZombie', count: 45, interval: 1200, startTime: 2000 },
  { enemyType: 'savageZombie', count: 37, interval: 2667, startTime: 6000 },
  { enemyType: 'zombieOne', count: 33, interval: 2286, startTime: 11000 },
];

export const waveTwelveEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 10, interval: 7623, startTime: 0 },
  { enemyType: 'fastZombie', count: 61, interval: 1200, startTime: 1000 },
  { enemyType: 'savageZombie', count: 50, interval: 2133, startTime: 5000 },
  { enemyType: 'zombieOne', count: 45, interval: 1828, startTime: 10000 },
];

export const waveThirteenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 14, interval: 5869, startTime: 0 },
  { enemyType: 'fastZombie', count: 86, interval: 1200, startTime: 0 },
  { enemyType: 'savageZombie', count: 70, interval: 1642, startTime: 4000 },
  { enemyType: 'zombieOne', count: 63, interval: 1407, startTime: 9000 },
];

export const waveFourteenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 21, interval: 4343, startTime: 0 },
  { enemyType: 'fastZombie', count: 125, interval: 1200, startTime: 0 },
  { enemyType: 'savageZombie', count: 102, interval: 1215, startTime: 3000 },
  { enemyType: 'zombieOne', count: 92, interval: 1200, startTime: 8000 },
];

export const waveFifteenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 32, interval: 3083, startTime: 0 },
  { enemyType: 'fastZombie', count: 188, interval: 1200, startTime: 0 },
  { enemyType: 'savageZombie', count: 153, interval: 1200, startTime: 2000 },
  { enemyType: 'zombieOne', count: 138, interval: 1200, startTime: 7000 },
];

const levelNineWaves: CreateEnemyEventData[][] = [
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
