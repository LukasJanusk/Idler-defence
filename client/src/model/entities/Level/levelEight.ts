import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { Grid } from '@/model/grid';
import type { CreateEnemyEventData, Level } from '@/types';
import { createLevelFromWaveData } from './levelUtils';

export const waveOneEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 20, interval: 4200, startTime: 0 },
  { enemyType: 'fastZombie', count: 20, interval: 2600, startTime: 5000 },
];

export const waveTwoEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 20, interval: 4600, startTime: 0 },
  { enemyType: 'fastZombie', count: 20, interval: 2100, startTime: 7000 },
];

export const waveThreeEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 18, interval: 3600, startTime: 0 },
  { enemyType: 'zombieOne', count: 18, interval: 4200, startTime: 3000 },
  { enemyType: 'savageZombie', count: 10, interval: 6200, startTime: 18000 },
];

export const waveFourEventsData: CreateEnemyEventData[] = [
  { enemyType: 'fastZombie', count: 30, interval: 1700, startTime: 0 },
  { enemyType: 'zombieOne', count: 20, interval: 4000, startTime: 2000 },
  { enemyType: 'savageZombie', count: 12, interval: 5600, startTime: 18000 },
];

export const waveFiveEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 22, interval: 4000, startTime: 0 },
  { enemyType: 'fastZombie', count: 20, interval: 1800, startTime: 3000 },
  { enemyType: 'savageZombie', count: 14, interval: 5200, startTime: 15000 },
];

export const waveSixEventsData: CreateEnemyEventData[] = [
  { enemyType: 'savageZombie', count: 16, interval: 4600, startTime: 0 },
  { enemyType: 'fastZombie', count: 22, interval: 1800, startTime: 5000 },
  { enemyType: 'zombieOne', count: 14, interval: 4200, startTime: 10000 },
];

export const waveSevenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 2, interval: 18000, startTime: 0 },
  { enemyType: 'fastZombie', count: 16, interval: 1900, startTime: 6000 },
  { enemyType: 'savageZombie', count: 12, interval: 5200, startTime: 12000 },
];

export const waveEightEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 3, interval: 18000, startTime: 0 },
  { enemyType: 'fastZombie', count: 20, interval: 1600, startTime: 5000 },
  { enemyType: 'savageZombie', count: 16, interval: 4600, startTime: 10000 },
  { enemyType: 'zombieOne', count: 14, interval: 4000, startTime: 15000 },
];

export const waveNineEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 4, interval: 16020, startTime: 0 },
  { enemyType: 'fastZombie', count: 24, interval: 1424, startTime: 4000 },
  { enemyType: 'savageZombie', count: 20, interval: 4094, startTime: 9000 },
  { enemyType: 'zombieOne', count: 17, interval: 3560, startTime: 14000 },
];

export const waveTenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 5, interval: 13777, startTime: 0 },
  { enemyType: 'fastZombie', count: 30, interval: 1224, startTime: 3000 },
  { enemyType: 'savageZombie', count: 25, interval: 3520, startTime: 8000 },
  { enemyType: 'zombieOne', count: 22, interval: 3061, startTime: 13000 },
];

export const waveElevenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 7, interval: 11434, startTime: 0 },
  { enemyType: 'fastZombie', count: 39, interval: 1200, startTime: 2000 },
  { enemyType: 'savageZombie', count: 33, interval: 2921, startTime: 7000 },
  { enemyType: 'zombieOne', count: 29, interval: 2540, startTime: 12000 },
];

export const waveTwelveEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 10, interval: 9147, startTime: 0 },
  { enemyType: 'fastZombie', count: 53, interval: 1200, startTime: 1000 },
  { enemyType: 'savageZombie', count: 45, interval: 2336, startTime: 6000 },
  { enemyType: 'zombieOne', count: 40, interval: 2032, startTime: 11000 },
];

export const waveThirteenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 14, interval: 7043, startTime: 0 },
  { enemyType: 'fastZombie', count: 75, interval: 1200, startTime: 0 },
  { enemyType: 'savageZombie', count: 63, interval: 1798, startTime: 5000 },
  { enemyType: 'zombieOne', count: 56, interval: 1564, startTime: 10000 },
];

export const waveFourteenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 21, interval: 5211, startTime: 0 },
  { enemyType: 'fastZombie', count: 109, interval: 1200, startTime: 0 },
  { enemyType: 'savageZombie', count: 92, interval: 1330, startTime: 4000 },
  { enemyType: 'zombieOne', count: 82, interval: 1200, startTime: 9000 },
];

const levelEightWaves: CreateEnemyEventData[][] = [
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
];

export const createLevelEight = (
  grid: Grid,
  onEnemyDeath?: (enemy?: Enemy<EnemyAction>) => void,
): Level =>
  createLevelFromWaveData(
    'Level-8',
    'Level 8',
    levelEightWaves,
    grid,
    onEnemyDeath,
  );
