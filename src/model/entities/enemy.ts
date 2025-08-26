import type { Rect, SpriteAnimations } from '@/types';
import type { Attack } from './attack';
import type { EnemyAction } from './character';

export class Enemy<T extends string = never> {
  id: string;
  health: number;
  range: number;
  damage: number;
  speed: number;
  animations: SpriteAnimations<EnemyAction | T>;
  rect: Rect;
  attack: Attack;
  actions: (EnemyAction | T)[];
  state: EnemyAction | T;

  stunRecovery = 100;
  stunDuration = 0;
  onDead: Set<() => void> = new Set();
  onDeath: Set<() => void> = new Set();

  constructor(
    id: string,
    health: number,
    range: number,
    damage: number,
    speed: number,
    animations: SpriteAnimations<EnemyAction | T>,
    rect: Rect,
    attack: Attack,
    actions?: (EnemyAction | T)[],
    state?: EnemyAction | T,
  ) {
    this.id = id;
    this.health = health;
    this.range = range;
    this.damage = damage;
    this.speed = speed;
    this.animations = animations;
    this.rect = rect;
    this.attack = attack;
    this.actions = actions || [
      'idle',
      'attack',
      'dead',
      'death',
      'move',
      'resurrect',
    ];
    this.state = state || 'idle';
    // automate state change to 'dead' once death animation finished
    this.animations.death.onFrame(this.animations.death.nFrame - 1, () => {
      this.state = 'dead';
      console.log('enemy died');
    });
  }
  registerOnDeath(fn: () => void) {
    this.onDeath.add(fn);
  }
  registerOnDead(fn: () => void) {
    this.onDead.add(fn);
  }

  checkStun(dt: number) {
    if (this.state !== 'hit') return;
    if (this.stunDuration >= this.stunRecovery) {
      this.state = 'idle';
      this.stunDuration = 0;
      return;
    }
    this.stunDuration += dt;
  }
  checkIfDead() {
    if (this.state === 'dead') {
      // this.onDead.forEach((fn) => fn());
      // this.onDead.clear();
      return;
    }
    if (this.health <= 0) {
      console.log(this.state);
      this.state = 'death';
      this.onDeath.forEach((fn) => fn());
      this.onDeath.clear();
    }
  }
  setAttack() {
    if (this.state === 'dead' && this.state === 'death') {
      if (this.state === 'attack') return;
      this.state = 'attack';
    }
  }
  setDefaultAction() {
    if (this.state !== 'dead' && this.state !== 'death') this.state = 'move';
  }
  update(dt: number) {
    if (this.health <= 0) this.health = 0;
    this.checkIfDead();
    this.checkStun(dt);
    if (this.state === 'move') {
      this.rect = { ...this.rect, x: this.rect.x - (this.speed + dt) * 0.001 };
    }
  }
}
