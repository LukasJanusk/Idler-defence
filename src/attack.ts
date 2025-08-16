import type { BaseAction } from './character';
import type { Rect } from './types';

export class Attack {
  damage: number;
  rect: Rect;
  triggerFrame: number;
  didHit: boolean;
  source: 'player' | 'enemy';
  onHit?: () => void;
  multiplier: number;

  constructor(
    damage: number,
    rect: Rect,
    triggerFrame: number,
    didHit: boolean = false,
    source: 'player' | 'enemy',
    onHit?: () => void,
    multiplier?: number,
  ) {
    this.damage = damage;
    this.rect = rect;
    this.triggerFrame = triggerFrame;
    this.didHit = didHit;
    this.source = source;
    this.onHit = onHit;
    this.multiplier = multiplier || 1;
  }

  hit(target: { health: number; state: unknown | BaseAction }) {
    if (!this.didHit) {
      target.health -= this.damage;
      target.state = 'hit';
      this.didHit = true;
      this.onHit?.();
    }
  }
}
