import { describe, expect, it, vi } from 'vitest';
import { createDefaultGrid } from './utils';
import { GAME_HEIGHT } from '@/constants';
import { GridRenderer } from '@/model/gridRenderer';
import {
  createLightningStrikeAttack,
  initLightningMageAttacks,
} from '@/model/characterAttacks/lightningMageAttacks';
import { LightningMage } from '@/model/entities/character';
import { createLightningMageAnimations } from '@/model/animations/lightningMageAnimations';

class MockImage {
  complete = true;
  naturalWidth = 128;
  naturalHeight = 512;
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  src = '';
}

vi.stubGlobal('Image', MockImage);

afterEach(() => {
  vi.restoreAllMocks();
});

describe('lightningMageAttacks', () => {
  it('spawns one visual lightning strike per area at the fixed strike floor', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);
    const grid = createDefaultGrid();
    const renderer = new GridRenderer(grid);
    const spawnLightningStrike = vi.spyOn(renderer, 'spawnLightningStrike');
    const lightningMage = new LightningMage(
      'lightning-mage',
      'Tempest',
      createLightningMageAnimations(),
    );
    lightningMage.pos = 'pos1';
    grid.setCharacterToPosition('pos1', lightningMage);

    initLightningMageAttacks(grid, renderer, lightningMage);

    const struckArea = grid.grid[2][4];
    const attackArea = grid.getAreaFromPos('pos1');

    lightningMage.animations.attack.tick(700);
    const triggeredAttack = attackArea ? [...attackArea.attacks][0] : null;
    triggeredAttack?.onHit?.();

    expect(spawnLightningStrike).toHaveBeenCalledTimes(grid.vertical);
    expect(spawnLightningStrike).toHaveBeenNthCalledWith(
      1,
      grid.grid[0][4].rect.x + grid.grid[0][4].rect.width / 2,
      GAME_HEIGHT - 256,
    );
    expect(spawnLightningStrike).toHaveBeenNthCalledWith(
      3,
      struckArea.rect.x + struckArea.rect.width / 2,
      GAME_HEIGHT - 256,
    );
    expect(grid.getColumn(4)?.every((area) => area.attacks.size === 1)).toBe(
      true,
    );
  });

  it('creates base lightning strike hitbox without changing combat values', () => {
    const strike = createLightningStrikeAttack(256, 128, 1.75, 120);

    expect(strike.rect).toEqual({ x: 256, y: 128, width: 128, height: 128 });
    expect(strike.damage).toBe(120);
    expect(strike.multiplier).toBe(1.75);
  });
});
