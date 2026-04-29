import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { Grid } from '@/model/grid';
import type { CreateEnemyEventData, Level } from '@/types';
import { createEnemyWaveEvents } from './levelUtils';

export const waveOneEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 12, interval: 7000, startTime: 0 },
  { enemyType: 'fastZombie', count: 8, interval: 5000, startTime: 8000 },
];

export const waveTwoEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 10, interval: 8000, startTime: 0 },
  { enemyType: 'fastZombie', count: 12, interval: 3500, startTime: 12000 },
];

export const waveThreeEventsData: CreateEnemyEventData[] = [
  { enemyType: 'hungryZombie', count: 10, interval: 5500, startTime: 0 },
  { enemyType: 'zombieOne', count: 10, interval: 7000, startTime: 3000 },
  { enemyType: 'savageZombie', count: 2, interval: 12000, startTime: 50000 },
];

export const waveFourEventsData: CreateEnemyEventData[] = [
  { enemyType: 'fastZombie', count: 18, interval: 2500, startTime: 0 },
  { enemyType: 'zombieOne', count: 10, interval: 7000, startTime: 6000 },
  { enemyType: 'savageZombie', count: 3, interval: 12000, startTime: 42000 },
];

export const waveFiveEventsData: CreateEnemyEventData[] = [
  { enemyType: 'zombieOne', count: 12, interval: 6000, startTime: 0 },
  { enemyType: 'fastZombie', count: 12, interval: 3000, startTime: 5000 },
  { enemyType: 'savageZombie', count: 5, interval: 9000, startTime: 30000 },
];

export const waveSixEventsData: CreateEnemyEventData[] = [
  { enemyType: 'fastZombie', count: 16, interval: 2800, startTime: 0 },
  { enemyType: 'savageZombie', count: 8, interval: 7000, startTime: 10000 },
];

export const waveSevenEventsData: CreateEnemyEventData[] = [
  { enemyType: 'greenGorgon', count: 1, interval: 0, startTime: 0 },
  { enemyType: 'savageZombie', count: 4, interval: 10000, startTime: 12000 },
];

export const createLevelTwo = (
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
    id: 'Level-2',
    name: 'Level 2',
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
