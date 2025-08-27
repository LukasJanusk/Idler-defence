import { it, describe, expect } from 'vitest';
import { createDefaultGrid, createTestKnight } from './utils';
import { GRID_AREA_SIZE, PARTY_POSITIO_ROW } from '@/constants';

describe('getAreaFromPos', () => {
  it('returns expected area from position', () => {
    const grid = createDefaultGrid();
    const area1 = grid.getAreaFromPos('pos1');
    const area2 = grid.getAreaFromPos('pos2');
    const area3 = grid.getAreaFromPos('pos3');
    const area4 = grid.getAreaFromPos('pos4');

    expect(area1.row).toBe(2);
    expect(area2.row).toBe(2);
    expect(area3.row).toBe(2);
    expect(area4.row).toBe(2);
    expect(area1.column).toBe(3);
    expect(area2.column).toBe(2);
    expect(area3.column).toBe(1);
    expect(area4.column).toBe(0);
  });
});

describe('getCharacterFromPosition', () => {
  it('returns Character from position1', () => {
    const grid = createDefaultGrid();
    const knight = createTestKnight();
    grid.grid[PARTY_POSITIO_ROW][3].characters.push(knight);
    const character = grid.getCharacterFromPosition('pos1');
    expect(character).toEqual(knight);
  });
  it('returns Character from position2', () => {
    const grid = createDefaultGrid();
    const knight = createTestKnight();
    grid.grid[PARTY_POSITIO_ROW][2].characters.push(knight);
    const character = grid.getCharacterFromPosition('pos2');
    expect(character).toEqual(knight);
  });
  it('returns Character from position3', () => {
    const grid = createDefaultGrid();
    const knight = createTestKnight();
    grid.grid[PARTY_POSITIO_ROW][1].characters.push(knight);
    const character = grid.getCharacterFromPosition('pos3');
    expect(character).toEqual(knight);
  });
  it('returns Character from position3', () => {
    const grid = createDefaultGrid();
    const knight = createTestKnight();
    grid.grid[PARTY_POSITIO_ROW][0].characters.push(knight);
    const character = grid.getCharacterFromPosition('pos4');
    expect(character).toEqual(knight);
  });
  it('returns null when no character in position', () => {
    const grid = createDefaultGrid();
    expect(grid.getCharacterFromPosition('pos1')).toEqual(null);
    expect(grid.getCharacterFromPosition('pos2')).toEqual(null);
    expect(grid.getCharacterFromPosition('pos3')).toEqual(null);
    expect(grid.getCharacterFromPosition('pos4')).toEqual(null);
  });
});
describe('setCharacterToPosition', () => {
  it('sets Character to position1', () => {
    const col = 3;
    const grid = createDefaultGrid();
    const knight = createTestKnight();
    expect(knight.rect).toEqual({
      x: 0,
      y: 0,
      width: GRID_AREA_SIZE,
      height: GRID_AREA_SIZE,
    });
    grid.setCharacterToPosition('pos1', knight);
    expect(grid.grid[PARTY_POSITIO_ROW][col].characters[0]).toEqual(knight);
    expect(knight.rect).toEqual({
      x: GRID_AREA_SIZE * col,
      y: PARTY_POSITIO_ROW * GRID_AREA_SIZE,
      width: GRID_AREA_SIZE,
      height: GRID_AREA_SIZE,
    });
  });
  it('sets Character to position2', () => {
    const col = 2;
    const grid = createDefaultGrid();
    const knight = createTestKnight();
    expect(knight.rect).toEqual({
      x: 0,
      y: 0,
      width: GRID_AREA_SIZE,
      height: GRID_AREA_SIZE,
    });
    grid.setCharacterToPosition('pos2', knight);
    expect(grid.grid[PARTY_POSITIO_ROW][col].characters[0]).toEqual(knight);
    expect(knight.rect).toEqual({
      x: GRID_AREA_SIZE * col,
      y: PARTY_POSITIO_ROW * GRID_AREA_SIZE,
      width: GRID_AREA_SIZE,
      height: GRID_AREA_SIZE,
    });
  });
  it('sets Character to position3', () => {
    const col = 1;
    const grid = createDefaultGrid();
    const knight = createTestKnight();
    expect(knight.rect).toEqual({
      x: 0,
      y: 0,
      width: GRID_AREA_SIZE,
      height: GRID_AREA_SIZE,
    });
    grid.setCharacterToPosition('pos3', knight);
    expect(grid.grid[PARTY_POSITIO_ROW][col].characters[0]).toEqual(knight);
    expect(knight.rect).toEqual({
      x: GRID_AREA_SIZE * col,
      y: PARTY_POSITIO_ROW * GRID_AREA_SIZE,
      width: GRID_AREA_SIZE,
      height: GRID_AREA_SIZE,
    });
  });
  it('sets Character to position4', () => {
    const col = 0;
    const grid = createDefaultGrid();
    const knight = createTestKnight();
    expect(knight.rect).toEqual({
      x: 0,
      y: 0,
      width: GRID_AREA_SIZE,
      height: GRID_AREA_SIZE,
    });
    grid.setCharacterToPosition('pos4', knight);
    expect(grid.grid[PARTY_POSITIO_ROW][col].characters[0]).toEqual(knight);
    expect(knight.rect).toEqual({
      x: GRID_AREA_SIZE * col,
      y: GRID_AREA_SIZE * PARTY_POSITIO_ROW,
      width: GRID_AREA_SIZE,
      height: GRID_AREA_SIZE,
    });
  });
});

describe('removeCharacterFromPosition', () => {
  it('returns null when no character in that position', () => {
    const grid = createDefaultGrid();
    expect(grid.removeCharactersFromPosition('pos1')).toEqual(null);
    expect(grid.removeCharactersFromPosition('pos2')).toEqual(null);
    expect(grid.removeCharactersFromPosition('pos3')).toEqual(null);
    expect(grid.removeCharactersFromPosition('pos4')).toEqual(null);
  });

  it('returns removed character and area host no characters', () => {
    const grid = createDefaultGrid();
    const knight = createTestKnight();
    grid.grid[PARTY_POSITIO_ROW][0].characters.push(knight);
    expect(grid.grid[PARTY_POSITIO_ROW][0].characters.length).toEqual(1);
    const character = grid.removeCharactersFromPosition('pos4');
    expect(character).toEqual(knight);
    expect(grid.grid[PARTY_POSITIO_ROW][0].characters).toEqual([]);
  });
});
