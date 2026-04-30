import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { Grid } from '@/model/grid';
import type { CreateEnemyEventData, Level } from '@/types';
import { createEnemyWaveEvents } from './levelUtils';

export const waveOneEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 10, interval: 9000, startTime: 0 },
  {
    enemyType: 'zombieOne',
    count: 5,
    interval: 18000,
    startTime: 5000,
  },
];

export const waveTwoEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 12, interval: 8000, startTime: 0 },
  {
    enemyType: 'zombieOne',
    count: 7,
    interval: 12000,
    startTime: 23000,
  },
];

export const waveThreeEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 15, interval: 6000, startTime: 0 },
  {
    enemyType: 'zombieOne',
    count: 10,
    interval: 10000,
    startTime: 5000,
  },
  { enemyType: 'savageZombie', count: 1, interval: 0, startTime: 110000 },
];

export const waveFourEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 10, interval: 10000, startTime: 0 },
  { enemyType: 'fastZombie', count: 15, interval: 3000, startTime: 18000 },
  {
    enemyType: 'zombieOne',
    count: 5,
    interval: 25000,
    startTime: 2000,
  },
  { enemyType: 'savageZombie', count: 3, interval: 15000, startTime: 110000 },
];

export const waveFiveEventsData: CreateEnemyEventData[] = [
  { enemyType: 'fastZombie', count: 20, interval: 2500, startTime: 0 },
  {
    enemyType: 'zombieOne',
    count: 7,
    interval: 8000,
    startTime: 20000,
  },
  { enemyType: 'savageZombie', count: 3, interval: 10000, startTime: 55000 },
];

export const waveSixEventsData: CreateEnemyEventData[] = [
  { enemyType: 'fastZombie', count: 20, interval: 4000, startTime: 0 },
  { enemyType: 'savageZombie', count: 10, interval: 8000, startTime: 5000 },
];

export const waveSevenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 1, interval: 0, startTime: 0 },
];

export const createLevelOne = (
  grid: Grid,
  onEnemyDeath?: (enemy?: Enemy<EnemyAction>) => void,
): Level => {
  const waveOne = createEnemyWaveEvents(waveOneEventsData, grid, onEnemyDeath);
  const waveTwo = createEnemyWaveEvents(waveTwoEventsData, grid, onEnemyDeath);
  const waveThree = createEnemyWaveEvents(
    waveThreeEventsData,
    grid,
    onEnemyDeath,
  );
  const waveFour = createEnemyWaveEvents(
    waveFourEventsData,
    grid,
    onEnemyDeath,
  );
  const waveFive = createEnemyWaveEvents(
    waveFiveEventsData,
    grid,
    onEnemyDeath,
  );
  const waveSix = createEnemyWaveEvents(waveSixEventsData, grid, onEnemyDeath);
  const waveSeven = createEnemyWaveEvents(
    waveSevenEventsData,
    grid,
    onEnemyDeath,
  );

  return {
    id: 'Level-1',
    name: 'Level 1',
    waves: [
      waveOne,
      waveTwo,
      waveThree,
      waveFour,
      waveFive,
      waveSix,
      waveSeven,
    ],
  };
};
