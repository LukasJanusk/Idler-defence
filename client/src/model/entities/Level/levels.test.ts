import { describe, expect, it } from 'vitest';
import { Grid } from '@/model/grid';
import {
  createLevelEight,
  createLevelFive,
  createLevelFour,
  createLevelNine,
  createLevelSeven,
  createLevelSix,
  createLevelTen,
  createLevelThree,
} from '.';

const levelFactories = [
  createLevelThree,
  createLevelFour,
  createLevelFive,
  createLevelSix,
  createLevelSeven,
  createLevelEight,
  createLevelNine,
  createLevelTen,
];

describe('late-game level data', () => {
  it.each(levelFactories)('creates seven populated waves for %p', (factory) => {
    const level = factory(new Grid(9, 5, 128));

    expect(level.waves).toHaveLength(7);
    level.waves.forEach((wave) => {
      expect(wave.size).toBeGreaterThan(0);
    });
  });
});
