import { Grid } from '@/model/grid';
import { Knight, type KnightAction } from '../character';
import type { SpriteAnimations } from '@/types';

type GridDefaults = {
  horizontal?: number;
  vertical?: number;
  areaSize?: number;
};
export function createDefaultGrid(options: GridDefaults = {}) {
  const horizontal = options.horizontal ?? 9;
  const vertical = options.vertical ?? 5;
  const areaSize = options.areaSize ?? 128;

  return new Grid(horizontal, vertical, areaSize);
}

export function createTestKnight(options: { id?: string; name?: string } = {}) {
  const id = options.id ?? 'test-knight';
  const charName = options.name ?? 'Knight';
  const defaultAnimations: SpriteAnimations<KnightAction> = {
    idle: { onFrame: () => {} },
    attack: { onFrame: () => {} },
    hit: { onFrame: () => {} },
    death: { onFrame: (_frame: number, cb: () => void) => cb() },
    dead: { onFrame: () => {} },
    resurrect: { onFrame: (_frame: number, cb: () => void) => cb() },
    guard: { onFrame: () => {} },
    protect: { onFrame: () => {} },
  } as unknown as SpriteAnimations<KnightAction>;
  const knight = new Knight(id, charName, defaultAnimations, [
    'idle',
    'attack',
    'hit',
    'death',
    'dead',
    'resurrect',
    'guard',
    'protect',
  ] as KnightAction[]) satisfies Knight;
  return knight;
}
