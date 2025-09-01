import {
  createFastZombie,
  createHungryZombie,
  createSavageZombie,
  createZombieOne,
} from '@/defaults';
import { Grid } from '@/model/grid';
import { LevelEventHandler, type LevelEvent } from '@/model/levelEventHandler';
import type { Enemy } from '../enemy';
import type { EnemyAction } from '../character';
import type { CreateEnemyEventData, EnemyType, Level } from '@/types';

export const createLevelEvents = (
  interval: number,
  n: number,
  callback: (eventHandler?: LevelEventHandler) => void = () => {},
  startTime: number = 0,
) => {
  const levelEvents: Set<LevelEvent> = new Set();
  for (let i = 0; i < n; i++) {
    const event = { time: startTime + interval * i, callback: callback };
    levelEvents.add(event);
  }
  return levelEvents;
};
export const attachCallbackToEvent = (
  cb: () => void,
  events: Set<LevelEvent>,
) => {
  events.forEach((event) => {
    const original = event.callback;
    event.callback = () => {
      original();
      cb();
    };
  });
};

const createEnemyByType = (type: EnemyType) => {
  switch (type) {
    case 'zombieOne':
      return createZombieOne();
    case 'savageZombie':
      return createSavageZombie();
    case 'fastZombie':
      return createFastZombie();
    case 'hungryZombie':
      return createHungryZombie();
  }
};
const createEnemy = (
  type: EnemyType,
  grid: Grid,
  onEnemyDeath?: (enemy: Enemy<EnemyAction>) => void,
) => {
  const enemy = createEnemyByType(type);
  if (onEnemyDeath) {
    const onDeath = () => onEnemyDeath(enemy);
    enemy.registerOnDeath(onDeath);
  }
  const giveExperience = () => {
    const characters = grid.getCharacters();
    characters.forEach(
      (character) =>
        (character.experience += enemy.experience / characters.length),
    );
  };

  enemy.registerOnDeath(giveExperience);
  return enemy;
};

export const createEnemyWaveEvents = (
  waveData: CreateEnemyEventData[],
  grid: Grid,
  onEnemyDeath?: (enemy?: Enemy) => void,
) => {
  let allEvents = new Set<LevelEvent>();

  waveData.forEach((wave) => {
    const spawnEnemyEvent = () => {
      const enemy = createEnemy(wave.enemyType, grid, onEnemyDeath);
      grid.addEnemies(2, 8, [enemy]);
    };
    const events = createLevelEvents(
      wave.interval,
      wave.count,
      spawnEnemyEvent,
      wave.startTime,
    );
    allEvents = new Set([...allEvents, ...events]);
  });

  return allEvents;
};

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
  { enemyType: 'hungryZombie', count: 10, interval: 10000, startTime: 0 },
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
  { enemyType: 'fastZombie', count: 15, interval: 4000, startTime: 18000 },
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
  { enemyType: 'fastZombie', count: 30, interval: 3000, startTime: 0 },
  { enemyType: 'savageZombie', count: 10, interval: 10000, startTime: 5000 },
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
  const wavefour = createEnemyWaveEvents(
    waveFourEventsData,
    grid,
    onEnemyDeath,
  );
  const wavefive = createEnemyWaveEvents(
    waveFiveEventsData,
    grid,
    onEnemyDeath,
  );
  const waveSix = createEnemyWaveEvents(waveOneEventsData, grid, onEnemyDeath);
  return {
    id: 'Level-1',
    name: 'Level 1',
    waves: [waveOne, waveTwo, waveThree, wavefour, wavefive, waveSix],
  };
};
