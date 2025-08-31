import { createSavageZombie, createZombieOne } from '@/defaults';
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

const createEnemy = (
  type: EnemyType,
  grid: Grid,
  onEnemyDeath?: (enemy: Enemy<EnemyAction>) => void,
) => {
  let enemy = createZombieOne();
  if (type === 'zombieOne') {
    enemy = createZombieOne();
  }
  if (type === 'savageZombie') {
    enemy = createSavageZombie();
  }
  // if (type === 'zombieThree') {
  //   enemy = createZombieThree();
  // }
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

export const createTestLevel = (
  grid: Grid,
  onEnemyDeath: (enemy?: Enemy) => void,
  enemyCount: number,
) => {
  const createZombie = () => {
    const zombie = createEnemy('zombieOne', grid, onEnemyDeath);
    grid.addEnemies(2, 8, [zombie]);
  };
  const events = createLevelEvents(10000, enemyCount, createZombie);
  return events;
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
  {
    enemyType: 'zombieOne',
    count: 5,
    interval: 10000,
    startTime: 0,
  },
];

export const waveTwoEventsData: CreateEnemyEventData[] = [
  {
    enemyType: 'zombieOne',
    count: 7,
    interval: 10000,
    startTime: 0,
  },
];
export const waveThreeEventsData: CreateEnemyEventData[] = [
  {
    enemyType: 'zombieOne',
    count: 10,
    interval: 8000,
    startTime: 0,
  },
  { enemyType: 'savageZombie', count: 1, interval: 0, startTime: 90000 },
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
  return {
    id: 'Level-1',
    name: 'Level 1',
    waves: [waveOne, waveTwo, waveThree],
  };
};
