import { Grid } from '@/model/grid';
import type { Enemy } from '@/model/entities/enemy';
import type { EnemyAction } from '@/model/entities/character';
import type { CreateEnemyEventData } from '@/types';
import { createEnemyWaveEvents } from './levelUtils';

const testLevelWaveData: CreateEnemyEventData[] = [
  { enemyType: 'testEnemy', count: 1, interval: 0, startTime: 0 },
];

export const createTestLevel = (
  grid: Grid,
  onEnemyDeath?: (enemy?: Enemy<EnemyAction>) => void,
) => {
  const waveOne = createEnemyWaveEvents(testLevelWaveData, grid, onEnemyDeath);
  return { id: 'test', name: 'test-level', waves: [waveOne] };
};

export { createEnemyWaveEvents } from './levelUtils';
