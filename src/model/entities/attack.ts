import type { BaseAction } from './character';
import type { Rect } from '@/types';

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

  hit(target: { health: number; state: unknown | BaseAction }) {
    if (!this.didHit) {
      target.health -= this.damage;
      target.state = 'hit';
      this.didHit = true;
      this.onHit?.(target);
    }
  }
}
