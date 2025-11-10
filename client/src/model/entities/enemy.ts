import type { Rect, SpriteAnimations } from '@/types';
import type { Attack } from './attack';
import type { EnemyAction } from './character';
import type { Grid } from '../grid';
import { createBasicAttack } from '../enemyAttacks/basicAttack';
import type { Debuff } from './debuff';
import type { Buff } from './buff';
import { UPDATE_RATE } from '@/constants';

export class Enemy<T extends string = never> {
  id: string;
  name: string;
  health: number;
  range: number;
  damage: number;
  speed: number;
  animations: SpriteAnimations<EnemyAction | T>;
  rect: Rect;
  attack: Attack;
  actions: (EnemyAction | T)[];
  state: EnemyAction | T;
  bounty: number = 10;
  experience: number = 10;
  score: number = 10;
  stunRecovery = 300;
  stunDuration = 0;
  onDead: Set<() => void> = new Set();
  onDeath: Set<() => void> = new Set();
  onHit: Set<() => void> = new Set();
  maxHealth: number = 1000;
  armor: number = 0;
  healthRecovery: number = 0;
  attacksInit: boolean = false;
  debuffs: Set<Debuff> = new Set();
  buffs: Set<Buff> = new Set();
  private elapsed = 0;
  private interval = UPDATE_RATE;
  description?: string;

  constructor(
    id: string,
    name: string,
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
    this.name = name;
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
    this.animations.death.onFrame(this.animations.death.nFrame - 1, () => {
      this.state = 'dead';
    });
    this.maxHealth = health;
  }
  initAttacks(grid: Grid) {
    if (this.attacksInit) return;
    this.animations.attack.onFrame(this.animations.attack.nFrame - 1, () => {
      const attackArea = grid.getClosestArea(this.rect);
      grid.grid[attackArea.row][attackArea.column - this.range].registerEntity(
        createBasicAttack(this.rect.x - 64, this.rect.y, this.damage, 1, 1),
      );
    });
    this.attacksInit = true;
  }
  registerOnDeath(fn: () => void) {
    this.onDeath.add(fn);
  }
  registerOnDead(fn: () => void) {
    this.onDead.add(fn);
  }
  registerOnHit(fn: () => void) {
    this.onHit.add(fn);
  }
  registerBuff(buff: Buff) {
    if (Array.from(this.buffs).some((b) => b.id === buff.id)) return;
    this.buffs.add(buff);
    if (buff.effect.armor) this.armor += buff.effect.armor;
    if (buff.effect.damage) this.damage += buff.effect.damage;
    if (buff.effect.speed) this.speed += buff.effect.speed;
    if (buff.effect.healthRecovery)
      this.healthRecovery += buff.effect.healthRecovery;
  }
  registerDebuff(debuff: Debuff) {
    if (Array.from(this.debuffs).some((db) => db.id === debuff.id)) return;
    this.debuffs.add(debuff);
    if (debuff.effect.armor) this.armor += debuff.effect.armor;
    if (debuff.effect.damage) this.damage += debuff.effect.damage;
    if (debuff.effect.speed) this.speed += debuff.effect.speed;
    if (debuff.effect.healthRecovery)
      this.healthRecovery += debuff.effect.healthRecovery;
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
      this.state = 'death';
      this.onDeath.forEach((fn) => fn());
      this.onDeath.clear();
    }
  }

  setAttack() {
    if (
      this.state !== 'dead' &&
      this.state !== 'death' &&
      this.state !== 'hit'
    ) {
      if (this.state === 'attack') return;
      this.state = 'attack';
    }
  }
  setDefaultAction() {
    if (this.state !== 'dead' && this.state !== 'death' && this.state !== 'hit')
      this.state = 'move';
  }

  updateBuffs(dt: number) {
    const toRemove: Buff[] = [];
    this.buffs.forEach((buff) => {
      buff.update(dt);
      if (buff.elapsed >= buff.duration) {
        if (buff.effect.armor) this.armor += buff.effect.armor;
        if (buff.effect.damage) this.damage += buff.effect.damage;
        if (buff.effect.speed) this.speed += buff.effect.speed;
        if (buff.effect.healthRecovery)
          this.healthRecovery += buff.effect.healthRecovery;

        toRemove.push(buff);
      }
    });

    toRemove.forEach((b) => this.buffs.delete(b));
  }
  updateDebuffs(dt: number) {
    const toRemove: Debuff[] = [];
    this.debuffs.forEach((db) => {
      db.update(dt);
      if (db.elapsed >= db.duration) {
        if (db.effect.armor) this.armor -= db.effect.armor;
        if (db.effect.damage) this.damage -= db.effect.damage;
        if (db.effect.speed) this.speed -= db.effect.speed;
        if (db.effect.healthRecovery)
          this.healthRecovery -= db.effect.healthRecovery;

        toRemove.push(db);
      }
    });

    toRemove.forEach((b) => this.debuffs.delete(b));
  }
  updateHealth(ticks: number) {
    if (this.health <= 0) {
      this.state = 'death' as T;
      this.health = 0;
      return;
    }
    this.health = Math.min(
      this.health + ticks * this.healthRecovery,
      this.maxHealth,
    );

    this.health = Math.max(this.health, 0);
  }
  update(dt: number, grid: Grid) {
    if (this.state === 'death' || this.state === 'dead') return;

    this.elapsed += dt;
    if (this.elapsed >= this.interval) {
      let ticks = Math.floor(this.elapsed / this.interval);
      if (ticks > 2) ticks = 2;
      this.elapsed %= this.interval;
      this.updateHealth(ticks);
      this.updateBuffs(dt);
      this.updateDebuffs(dt);
      this.initAttacks(grid);
      this.attack.rect = {
        ...this.attack.rect,
        x: this.rect.x - this.range,
        y: this.rect.y,
      };
      this.checkIfDead();
      this.checkStun(dt);
      if (this.state === 'hit') this.onHit.forEach((fn) => fn());
      if (this.state === 'move') {
        this.rect = {
          ...this.rect,
          x: this.rect.x - this.speed * 0.1,
        };
      }
    }
  }
}
