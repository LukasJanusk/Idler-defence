import { collideRect } from '@/utils';
import type { EnemyAction } from './character';
import type { AnyCharacter, Rect } from '@/types';
import type { Enemy } from './enemy';
import { GAME_HEIGHT, GAME_WIDTH } from '@/constants';

export class Attack {
  id: string;
  damage: number;
  rect: Rect;
  source: 'player' | 'enemy';
  range: number = 0;
  onHit?: (target?: AnyCharacter | Enemy<EnemyAction>) => void;
  multiplier: number = 1;
  duration: number = 100;
  elapsed: number = 0;
  hitEntities: Set<string> = new Set();
  stun: boolean = true;
  isAlive: boolean = true;
  didHit: boolean = false;

  constructor(
    id: string,
    damage: number,
    rect: Rect,
    source: 'player' | 'enemy',
    range?: number,
    onHit?: () => void,
    multiplier?: number,
  ) {
    this.id = id;
    this.damage = damage;
    this.rect = rect;
    this.source = source;
    this.range = range || 0;
    this.onHit = onHit;
    this.multiplier = multiplier || 1;
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
    if (this.hitEntities.has(target.id)) return;
    if (collideRect(this.rect, target.rect)) {
      this.hitEntities.add(target.id);
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
      if (this.onHit) {
        this.onHit?.(target);
        this.didHit = true;
      }
    }
  }
  update(dt: number) {
    if (
      this.rect.x + this.rect.width < 0 ||
      this.rect.x > GAME_WIDTH ||
      this.rect.y > GAME_HEIGHT + this.rect.height ||
      this.rect.y + this.rect.height < 0
    ) {
      this.isAlive = false;
      return;
    }
    this.elapsed += dt;
    if (this.elapsed >= this.duration) {
      this.isAlive = false;
    }
  }
}
