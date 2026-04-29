import config from '@/config';
import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { Grid } from '@/model/grid';
import { createLevelOne } from './levelOne';
import { createLevelEight } from './levelEight';
import { createLevelFive } from './levelFive';
import { createLevelFour } from './levelFour';
import { createLevelNine } from './levelNine';
import { createLevelSeven } from './levelSeven';
import { createLevelSix } from './levelSix';
import { createLevelTen } from './levelTen';
import { createLevelThree } from './levelThree';
import { createLevelTwo } from './levelTwo';
import { createTestLevel } from './testLevel';
import { createTutorialLevel } from './tutorialLevel';

export { createLevelEight } from './levelEight';
export { createLevelFive } from './levelFive';
export { createLevelFour } from './levelFour';
export { createLevelOne } from './levelOne';
export { createLevelNine } from './levelNine';
export { createLevelSeven } from './levelSeven';
export { createLevelSix } from './levelSix';
export { createLevelTen } from './levelTen';
export { createLevelThree } from './levelThree';
export { createLevelTwo } from './levelTwo';
export { createTestLevel } from './testLevel';
export { createTutorialLevel } from './tutorialLevel';
export {
  attachCallbackToEvent,
  createEnemyWaveEvents,
  createLevelFromWaveData,
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
    createLevelTwo(grid, onEnemyDeath),
    createLevelThree(grid, onEnemyDeath),
    createLevelFour(grid, onEnemyDeath),
    createLevelFive(grid, onEnemyDeath),
    createLevelSix(grid, onEnemyDeath),
    createLevelSeven(grid, onEnemyDeath),
    createLevelEight(grid, onEnemyDeath),
    createLevelNine(grid, onEnemyDeath),
    createLevelTen(grid, onEnemyDeath),
  ];
};
