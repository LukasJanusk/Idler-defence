import { createZombieOne } from '@/defaults';
import type { Grid } from '@/model/grid';
import { LevelEventHandler, type LevelEvent } from '@/model/levelEventHandler';
import type { Enemy } from '../enemy';
import type { EnemyAction } from '../character';
import type { EnemyType } from '@/types';

export const createLevelEvents = (
  interval: number,
  n: number,
  callback: (eventHandler?: LevelEventHandler) => void = () => {},
) => {
  const levelEvents: Set<LevelEvent> = new Set();
  for (let i = 0; i < n; i++) {
    const event = { time: (interval + 1) * i, callback: callback };
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
) => {
  const createZombie = () => {
    const zombie = createEnemy('zombieOne', grid, onEnemyDeath);
    grid.addEnemies(2, 8, [zombie]);
  };
  const events = createLevelEvents(10000, 20, createZombie);
  return events;
};
