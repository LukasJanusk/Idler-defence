import {
  createFastZombie,
  createGreenGorgon,
  createHungryZombie,
  createSavageZombie,
  createZombieOne,
  createTestEnemy,
} from '@/defaults';
import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { Grid } from '@/model/grid';
import { LevelEventHandler, type LevelEvent } from '@/model/levelEventHandler';
import type { CreateEnemyEventData, EnemyType, Level } from '@/types';

export const createLevelEvents = (
  interval: number,
  n: number,
  callback: (eventHandler?: LevelEventHandler) => void = () => {},
  startTime: number = 0,
) => {
  const levelEvents: Set<LevelEvent> = new Set();
  for (let i = 0; i < n; i++) {
    const event = { time: startTime + interval * i, callback };
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
    case 'greenGorgon':
      return createGreenGorgon();
    case 'testEnemy':
      return createTestEnemy();
  }
};

const createEnemy = (
  type: EnemyType,
  grid: Grid,
  onEnemyDeath?: (enemy: Enemy<EnemyAction>) => void,
) => {
  const enemy = createEnemyByType(type);
  if (onEnemyDeath) {
    let callbackDidRun = false;
    const onRemoved = () => {
      if (callbackDidRun) return;
      callbackDidRun = true;
      onEnemyDeath(enemy);
    };
    enemy.registerOnDeath(onRemoved);
    enemy.registerOnDead(onRemoved);
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

export const createLevelFromWaveData = (
  id: string,
  name: string,
  wavesData: CreateEnemyEventData[][],
  grid: Grid,
  onEnemyDeath?: (enemy?: Enemy<EnemyAction>) => void,
): Level => ({
  id,
  name,
  waves: wavesData.map((waveData) =>
    createEnemyWaveEvents(waveData, grid, onEnemyDeath),
  ),
});
