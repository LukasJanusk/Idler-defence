import type { Rect, SpriteAnimations } from '@/types';
import type { Attack } from './attack';
import type { EnemyAction } from './character';

export class Enemy<T extends string> {
  id: string;
  health: number;
  range: number;
  damage: number;
  speed: number;
  animations: SpriteAnimations<T>;
  actions: EnemyAction[];
  state: EnemyAction;
  rect: Rect;
  attack: Attack;
  constructor(
    id: string,
    health: number,
    range: number,
    damage: number,
    speed: number,
    animations: SpriteAnimations<T>,
    actions: EnemyAction[],
    rect: Rect,
    attack: Attack,
    state: EnemyAction,
  ) {
    this.id = id;
    this.health = health;
    this.range = range;
    this.damage = damage;
    this.speed = speed;
    this.animations = animations;
    this.actions = actions;
    this.rect = rect;
    this.attack = attack;
    this.state = state;
  }
  update(dt: number) {
    this.rect = { ...this.rect, x: this.rect.x - (this.speed + dt) * 0.001 };
  }
}
