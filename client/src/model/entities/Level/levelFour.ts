import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { Grid } from '@/model/grid';
import type { CreateEnemyEventData, Level } from '@/types';
import { createLevelFromWaveData } from './levelUtils';

export const waveOneEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 16, interval: 5600, startTime: 0 },
  { enemyType: 'fastZombie', count: 12, interval: 3600, startTime: 7000 },
];

export const waveTwoEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 14, interval: 6200, startTime: 0 },
  { enemyType: 'fastZombie', count: 12, interval: 2800, startTime: 10000 },
];

export const waveThreeEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 14, interval: 4600, startTime: 0 },
  { enemyType: 'zombieOne', count: 12, interval: 5600, startTime: 5000 },
  { enemyType: 'savageZombie', count: 4, interval: 10000, startTime: 36000 },
];

export const waveFourEventsData: CreateEnemyEventData[] = [
  { enemyType: 'fastZombie', count: 22, interval: 2200, startTime: 0 },
  { enemyType: 'zombieOne', count: 12, interval: 5600, startTime: 4000 },
  { enemyType: 'savageZombie', count: 5, interval: 9000, startTime: 28000 },
];

export const waveFiveEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 16, interval: 5200, startTime: 0 },
  { enemyType: 'fastZombie', count: 12, interval: 2600, startTime: 5000 },
  { enemyType: 'savageZombie', count: 6, interval: 7800, startTime: 24000 },
];

export const waveSixEventsData: CreateEnemyEventData[] = [
  { enemyType: 'fastZombie', count: 18, interval: 2300, startTime: 0 },
  { enemyType: 'savageZombie', count: 10, interval: 6200, startTime: 6000 },
  { enemyType: 'zombieOne', count: 8, interval: 6000, startTime: 16000 },
];

export const waveSevenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 1, interval: 0, startTime: 0 },
  { enemyType: 'fastZombie', count: 10, interval: 2600, startTime: 9000 },
  { enemyType: 'savageZombie', count: 6, interval: 7600, startTime: 16000 },
];

const levelFourWaves: CreateEnemyEventData[][] = [
  waveOneEventsData,
  waveTwoEventsData,
  waveThreeEventsData,
  waveFourEventsData,
  waveFiveEventsData,
  waveSixEventsData,
  waveSevenEventsData,
];

export const createLevelFour = (
  grid: Grid,
  onEnemyDeath?: (enemy?: Enemy<EnemyAction>) => void,
): Level =>
  createLevelFromWaveData(
    'Level-4',
    'Level 4',
    levelFourWaves,
    grid,
    onEnemyDeath,
  );
