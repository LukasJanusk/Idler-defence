import { collideRect } from '@/utils';
import type { EnemyAction } from './character';
import type { AnyCharacter, Rect } from '@/types';
import type { Enemy } from './enemy';
// Range explanation:

// 0: grid area of occupant
// 1: adjesent area
// 2: one after adjesent area
// ...

export class Attack {
  id: string;
  damage: number;
  rect: Rect;
  didHit: boolean;
  source: 'player' | 'enemy';
  range: number;
  onHit?: (target: Enemy<EnemyAction> | AnyCharacter) => void;
  multiplier: number;
  duration: number = 100;
  elapsed: number = 0;
  hitEntities: string[] = [];
  stun: boolean = true;

  constructor(
    id: string,
    damage: number,
    rect: Rect,
    source: 'player' | 'enemy',
    range?: number,
    onHit?: (target: Enemy<EnemyAction> | AnyCharacter) => void,
    multiplier?: number,
  ) {
    this.id = id;
    this.damage = damage;
    this.rect = rect;
    this.source = source;
    this.range = range || 1;
    this.onHit = onHit;
    this.multiplier = multiplier || 1;
    this.didHit = false;
  }
  shouldStun(target: Enemy<EnemyAction> | AnyCharacter) {
    return (
      target.state !== 'death' &&
      target.state !== 'dead' &&
      this.source === 'player' &&
      this.stun
    );
  }
  hit(target: Enemy<EnemyAction> | AnyCharacter) {
    if (this.hitEntities.some((e) => e === target.id)) return;
    if (collideRect(this.rect, target.rect)) {
      if (target.armor) {
        const damage = Math.max(
          Math.round((this.damage * (100 - target.armor)) / 100),
          0,
        );
        target.health -= damage;
      } else {
        target.health -= this.damage;
      }
      if (target.health < 0) {
        target.health = 0;
        return;
      }
      if (this.shouldStun(target)) {
        target.state = 'hit';
      }
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
