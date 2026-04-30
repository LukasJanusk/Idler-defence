import { describe, expect, it } from 'vitest';
import { calculateScore } from '@/utils';
import { createDefaultGrid, createTestKnight } from '@/model/test/utils';

describe('calculateScore', () => {
  it('uses total party levels as the main score driver with gold as a small bonus', () => {
    const grid = createDefaultGrid();
    const knightOne = createTestKnight({ id: 'knight-1', name: 'Knight One' });
    const knightTwo = createTestKnight({ id: 'knight-2', name: 'Knight Two' });

    knightOne.level = 10;
    knightTwo.level = 5;

    grid.setCharacterToPosition('pos1', knightOne);
    grid.setCharacterToPosition('pos2', knightTwo);

    expect(calculateScore(95, grid)).toBe(3009);
  });

  it('does not change the level contribution based on party size', () => {
    const singleCharacterGrid = createDefaultGrid();
    const splitPartyGrid = createDefaultGrid();
    const soloKnight = createTestKnight({
      id: 'solo-knight',
      name: 'Solo Knight',
    });
    const firstSplitKnight = createTestKnight({
      id: 'split-knight-1',
      name: 'Split Knight One',
    });
    const secondSplitKnight = createTestKnight({
      id: 'split-knight-2',
      name: 'Split Knight Two',
    });

    soloKnight.level = 15;
    firstSplitKnight.level = 7;
    secondSplitKnight.level = 8;

    singleCharacterGrid.setCharacterToPosition('pos1', soloKnight);
    splitPartyGrid.setCharacterToPosition('pos1', firstSplitKnight);
    splitPartyGrid.setCharacterToPosition('pos2', secondSplitKnight);

    expect(calculateScore(120, singleCharacterGrid)).toBe(
      calculateScore(120, splitPartyGrid),
    );
  });
});
