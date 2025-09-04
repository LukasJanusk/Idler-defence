import { Grid } from '@/model/grid';
import { Knight, type KnightAction } from '@/model/entities/character';
import type { Rect, SpriteAnimations } from '@/types';
import { Projectile } from '@/model/entities/projectile';
import { createAnimation } from '@/model/animations/animation';
import type { Animation } from '@/model/animations/animation';
import { Attack } from '@/model/entities/attack';
import { GRID_AREA_SIZE } from '@/constants';

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
  knight.initAudio = () => {};
  return knight;
}

export function createTestProjectile(
  override: {
    id?: string;
    name?: string;
    animation?: Animation;
    damage?: number;
    source?: 'character' | 'enemy';
    rect?: Rect;
    targetRect?: Rect;
    speed?: number;
    targetId?: string;
    gravity?: number;
    onHit?: () => void;
  } = {},
) {
  const projAnimation = createAnimation('', 8, 100, 'magicArrow');

  return new Projectile(
    override.id ?? 'test-projectile',
    override.name ?? 'test-projectile',
    override.animation ?? projAnimation,
    override.damage ?? 10,
    override.source ?? 'character',
    override.rect ?? { x: 0, y: 0, width: 64, height: 64 },
    override.targetRect ?? { x: 0, y: 0, width: 128, height: 128 },
    override.speed ?? 300,
    override.targetId ?? null,
    override.gravity ?? 0,
    override.onHit ?? (() => {}),
  );
}

export function createTestAttack(
  override: {
    id?: string;
    damage?: number;
    rect?: Rect;
    source?: 'player' | 'enemy';
    range?: number;
    onHit?: () => void;
    multiplier?: number;
  } = {},
) {
  return new Attack(
    override.id ?? 'test-attack',
    override.damage ?? 10,
    override.rect ?? {
      x: 0,
      y: 0,
      width: GRID_AREA_SIZE,
      height: GRID_AREA_SIZE,
    },
    override.source ?? 'player',
    override.range ?? 0,
    override.onHit ?? (() => {}),
    override.multiplier ?? 1,
  );
}
