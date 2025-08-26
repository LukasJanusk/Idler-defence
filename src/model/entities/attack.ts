import { collideRect } from '@/utils';
import type { BaseAction } from './character';
import type { Rect } from '@/types';

// Range explanation:

// 0: grid area of occupant
// 1: adjesent area
// 2: one after adjesent area
// ...

export class Attack {
  id: string;
  damage: number;
  rect: Rect;
  triggerFrame: number;
  didHit: boolean;
  source: 'player' | 'enemy';
  range: number;
  onHit?: ({ health }: { health: number }) => void;
  multiplier: number;
  duration: number = 100;
  elapsed: number = 0;
  hitEntities: string[] = [];

  constructor(
    id: string,
    damage: number,
    rect: Rect,
    triggerFrame: number,
    source: 'player' | 'enemy',
    range?: number,
    onHit?: ({ health }: { health: number }) => void,
    multiplier?: number,
  ) {
    this.id = id;
    this.damage = damage;
    this.rect = rect;
    this.triggerFrame = triggerFrame;
    this.source = source;
    this.range = range || 1;
    this.onHit = onHit;
    this.multiplier = multiplier || 1;
    this.didHit = false;
  }

  hit(target: {
    id: string;
    health: number;
    state: unknown | BaseAction;
    rect: Rect;
  }) {
    if (this.hitEntities.some((e) => e === target.id)) return;
    if (collideRect(this.rect, target.rect)) {
      target.health -= this.damage;
      target.state = 'hit';
      this.hitEntities.push(target.id);
      this.onHit?.(target);
    }
  }
  update(dt: number) {
    this.elapsed += dt;
    if (this.elapsed >= this.duration) {
      this.didHit = true;
    }
  }
}
