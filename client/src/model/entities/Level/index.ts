import config from '@/config';
import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { Grid } from '@/model/grid';
import { createLevelOne } from './levelOne';
import { createTestLevel } from './testLevel';
import { createTutorialLevel } from './tutorialLevel';

export { createLevelOne } from './levelOne';
export { createTestLevel } from './testLevel';
export { createTutorialLevel } from './tutorialLevel';
export {
  attachCallbackToEvent,
  createEnemyWaveEvents,
  createLevelEvents,
} from './levelUtils';

export const createLevels = (
  grid: Grid,
  onEnemyDeath?: (enemy?: Enemy<EnemyAction>) => void,
) => {
  if (config.env === 'test') {
    return [createTestLevel(grid, onEnemyDeath)];
  }

  return [
    createTutorialLevel(grid, onEnemyDeath),
    createLevelOne(grid, onEnemyDeath),
  ];
};