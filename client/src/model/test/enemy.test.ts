import { describe, expect, it, vi } from 'vitest';
import { createZombieOne } from '@/defaults';
import { createDefaultGrid } from './utils';
import { UPDATE_RATE } from '@/constants';
import { createEnemyWaveEvents } from '@/model/entities/Level/testLevel';

describe('Enemy movement', () => {
  it('scales movement with accumulated game speed ticks', () => {
    const enemy = createZombieOne();
    const grid = createDefaultGrid();

    enemy.state = 'move';
    enemy.rect.x = 300;

    enemy.update(UPDATE_RATE, grid);
    const singleStepDistance = 300 - enemy.rect.x;

    enemy.rect.x = 300;
    enemy.update(UPDATE_RATE * 3, grid);
    const tripleStepDistance = 300 - enemy.rect.x;

    expect(singleStepDistance).toBeGreaterThan(0);
    expect(tripleStepDistance).toBeCloseTo(singleStepDistance * 2);
  });

  it('fires the enemy death callback when the last gorgon reaches dead state', () => {
    const grid = createDefaultGrid();
    const onEnemyDeath = vi.fn();
    const events = createEnemyWaveEvents(
      [{ enemyType: 'greenGorgon', count: 1, interval: 0, startTime: 0 }],
      grid,
      onEnemyDeath,
    );

    const spawnEvent = Array.from(events)[0];
    spawnEvent.callback();

    const [gorgon] = grid.getEnemies();
    gorgon.onDeath.clear();
    gorgon.state = 'dead';

    gorgon.checkIfDead();

    expect(onEnemyDeath).toHaveBeenCalledTimes(1);
    expect(onEnemyDeath).toHaveBeenCalledWith(gorgon);
  });
});
