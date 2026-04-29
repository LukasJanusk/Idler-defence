import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import { Grid } from '@/model/grid';
import type { CreateEnemyEventData, Level } from '@/types';
import { createEnemyWaveEvents } from './levelUtils';

const tutorialWaveData: CreateEnemyEventData[] = [
  { enemyType: 'testEnemy', count: 1, interval: 0, startTime: 0 },
];

export const createTutorialLevel = (
  grid: Grid,
  onEnemyDeath?: (enemy?: Enemy<EnemyAction>) => void,
): Level => {
  const waveOne = createEnemyWaveEvents(tutorialWaveData, grid, onEnemyDeath);

  return {
    id: 'tutorial',
    name: 'Tutorial',
    waves: [waveOne],
  };
};