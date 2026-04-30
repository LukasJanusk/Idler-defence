import { describe, expect, it } from 'vitest';
import { Grid } from '@/model/grid';
import {
  createLevelEight,
  createLevelFive,
  createLevelFour,
  createLevelOne,
  createLevelNine,
  createLevelSeven,
  createLevelSix,
  createLevelTen,
  createLevelThree,
  createLevelTwo,
} from '.';

const levelFactories = [
  { factory: createLevelOne, waveCount: 7 },
  { factory: createLevelTwo, waveCount: 8 },
  { factory: createLevelThree, waveCount: 9 },
  { factory: createLevelFour, waveCount: 10 },
  { factory: createLevelFive, waveCount: 11 },
  { factory: createLevelSix, waveCount: 12 },
  { factory: createLevelSeven, waveCount: 13 },
  { factory: createLevelEight, waveCount: 14 },
  { factory: createLevelNine, waveCount: 15 },
  { factory: createLevelTen, waveCount: 16 },
];

describe('level data', () => {
  it.each(levelFactories)(
    'creates $waveCount populated waves for $factory',
    ({ factory, waveCount }) => {
      const level = factory(new Grid(9, 5, 128));

      expect(level.waves).toHaveLength(waveCount);
      level.waves.forEach((wave) => {
        expect(wave.size).toBeGreaterThan(0);
      });
    },
  );
});
