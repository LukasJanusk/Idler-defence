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

const levelEightWaves: CreateEnemyEventData[][] = [
  waveOneEventsData,
  waveTwoEventsData,
  waveThreeEventsData,
  waveFourEventsData,
  waveFiveEventsData,
  waveSixEventsData,
  waveSevenEventsData,
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
