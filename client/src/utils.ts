import type { AnyCharacter, GameStore, Rect } from './types';
import type { Animation } from './model/animations/animation';
import { Grid } from './model/grid';
import type { Attack } from './model/entities/attack';
import type { Enemy } from './model/entities/enemy';
import type { EnemyAction } from './model/entities/character';

export function getRectMiddle(rect: Rect): { x: number; y: number } {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
}

export function collideRect(a: Rect, b: Rect): boolean {
  return !(
    a.x + a.width < b.x ||
    a.x > b.x + b.width ||
    a.y + a.height < b.y ||
    a.y > b.y + b.height
  );
}

export function setupDeathResurrect(
  deathAnimation: Animation,
  resurrectAnimation: Animation,
  setState: (state: 'idle' | 'dead') => void,
) {
  deathAnimation.onFrame(deathAnimation.nFrame - 1, () => setState('dead'));
  resurrectAnimation.onFrame(resurrectAnimation.nFrame - 1, () =>
    setState('idle'),
  );
}
export function registerAttackToGrid(
  grid: Grid,
  entity: AnyCharacter,
  callback: () => Attack,
  frames: number[],
  animation: Animation,
  range: number,
) {
  const registration = () => {
    for (let i = 0; i <= range; i++) {
      const pos = entity.pos;
      if (!pos) return;
      const area = grid.getAreaFromPos(pos, i);

      if (!area) return;
      area?.registerEntity(callback());
    }
  };
  frames.forEach((frame) => {
    if (frame > animation.nFrame - 1) return;
    animation.onFrame(frame, registration);
  });
}
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function removeExpired<T extends { isAlive: boolean }>(
  entities: Set<T>,
) {
  for (const e of [...entities]) {
    if (!e.isAlive) entities.delete(e);
  }
}

export function isLevelCleared(
  store: Pick<
    GameStore,
    'grid' | 'levels' | 'currentLevel' | 'currentWave' | 'levelEventHandler'
  >,
) {
  const isLastWave =
    store.levels[store.currentLevel].waves.length === store.currentWave;
  const noMoreEvents = store.levelEventHandler.events.size === 0;
  const hasLivingEnemies = store.grid
    .getEnemies()
    .some((enemy) => enemy.state !== 'dead' && enemy.state !== 'death');

  return isLastWave && noMoreEvents && !hasLivingEnemies;
}

export function createStoreCallbacksForLevel(store: GameStore) {
  return (enemy?: Enemy<EnemyAction>) => {
    store.addGold(enemy?.bounty ?? 0);
    if (isLevelCleared(store)) {
      store.setGameOver();
    }
  };
}
export function createStoreCallbacksForLevelFromGetter(
  getStore: () => GameStore,
) {
  return (enemy?: Enemy<EnemyAction>) => {
    const store = getStore();
    store.addGold(enemy?.bounty ?? 0);
    if (isLevelCleared(store)) {
      store.setGameOver('level-complete');
    }
  };
}
export function calculateScore(gold: number, grid: Grid) {
  const characters = grid.getCharacters();
  const totalLevels = characters.reduce((sum, c) => sum + c.level, 0);

  return totalLevels * 200 + Math.floor(gold / 10);
}
