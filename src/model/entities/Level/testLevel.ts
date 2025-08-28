import { createZombieOne } from '@/defaults';
import type { Grid } from '@/model/grid';
import { LevelEventHandler, type LevelEvent } from '@/model/levelEventHandler';
import type { Enemy } from '../enemy';

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

export const createTestLevel = (
  grid: Grid,
  onEnemyDeath: (enemy?: Enemy) => void,
) => {
  const createZombie = () => {
    const zombie = createZombieOne();
    const onDeath = () => onEnemyDeath(zombie);
    zombie.registerOnDeath(onDeath);
    grid.addEnemies(2, 8, [zombie]);
  };
  const events = createLevelEvents(10000, 10, createZombie);
  return events;
};
