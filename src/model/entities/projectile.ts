import { v4 } from 'uuid';
import { Sheet } from '@/model/animations/animation';
import type { AnyCharacter, Rect } from '@/types';
import { collideRect, getRectMiddle } from '@/utils';
import { Animation } from '@/model/animations/animation';
import type { EnemyAction } from './character';
import type { Enemy } from './enemy';

export class ProjectileAnimation {
  id: string = 'ProjAnim' + v4();
  name: string;
  nFrame: number;
  hitFrame: number;
  frame: number = 0;
  elapsed: number = 0;
  didHit: boolean = false;
  alive: boolean = true;
  frameDuration: number;
  sheet: Sheet;
  onHit?: () => void;
  onEnd?: () => void;
  private onHitDidTrigger: boolean = false;

  constructor(
    sheet: Sheet,
    nFrame: number,
    hitFrame: number,
    frameDuration: number,
    name: string,
    onHit?: () => void,
    onEnd?: () => void,
  ) {
    this.sheet = sheet;
    this.nFrame = nFrame;
    this.hitFrame = hitFrame;
    this.frameDuration = frameDuration;
    this.name = name;
    this.onHit = onHit;
    this.onEnd = onEnd;
  }
  updateFrame() {
    if (this.didHit) {
      this.frame = Math.min(this.frame + 1, this.nFrame - 1);
      if (this.frame >= this.nFrame - 1) this.alive = false;
    } else {
      this.frame = (this.frame + 1) % this.hitFrame;
    }
  }

  tick(dt: number) {
    this.elapsed += dt;

    while (this.elapsed >= this.frameDuration) {
      this.elapsed -= this.frameDuration;
      this.updateFrame();
    }
    if (this.didHit && !this.onHitDidTrigger && this.onHit) {
      this.onHit();
      this.onHitDidTrigger = true;
    }

    if (!this.alive && this.onEnd) {
      this.onEnd();
    }
  }
}

export function createProjectileAnimation(
  url: string,
  nFrame: number,
  hitFrame: number,
  frameDuration: number,
  name: string,
  onHit?: () => void,
): ProjectileAnimation {
  const sheet = new Sheet(url);
  const anim = new ProjectileAnimation(
    sheet,
    nFrame,
    hitFrame,
    frameDuration,
    name,
    onHit,
  );
  return anim;
}

export class Projectile {
  id: string;
  name: string;
  animation: Animation;
  damage: number;
  source: 'character' | 'enemy';
  targetRect: Rect;
  targetId: string | null;
  speed: number;
  rect: Rect;
  gravity: number;
  didHit: boolean;
  isAlive: boolean;
  rotation: number = 0;
  stun: boolean = true;
  onHit?: (target?: AnyCharacter | Enemy<EnemyAction>) => void;
  private hitEntities: Set<string> = new Set();

  constructor(
    id: string,
    name: string,
    animation: Animation,
    damage: number,
    source: 'character' | 'enemy',
    rect: Rect,
    targetRect: Rect,
    speed: number,
    targetId: string | null,
    gravity: number = 10,
    onHit?: () => void,
  ) {
    this.id = id;
    this.name = name;
    this.animation = animation;
    this.damage = damage;
    this.source = source;
    this.rect = rect;
    this.targetId = targetId;
    this.targetRect = targetRect;
    this.speed = speed;
    this.rect = rect;
    this.gravity = gravity;
    this.didHit = false;
    this.isAlive = true;
    this.onHit = onHit;
    const projMiddle = getRectMiddle(this.rect);
    const targetMiddle = getRectMiddle(this.targetRect);
    const dx = targetMiddle.x - projMiddle.x;
    const dy = targetMiddle.y - projMiddle.y;
    this.rotation = (Math.atan2(dy, dx) * 180) / Math.PI;
  }
  shouldStun() {
    return this.source === 'character' && this.stun;
  }
  update(dt: number) {
    if (!this.isAlive) return;

    const projMiddle = getRectMiddle(this.rect);
    const targetMiddle = getRectMiddle(this.targetRect);
    const dx = targetMiddle.x - projMiddle.x;
    const dy = targetMiddle.y - projMiddle.y;
    const length = Math.hypot(dx, dy);
    if (length === 0) return;
    const velX = (dx / length) * this.speed;
    const velY = (dy / length) * this.speed;
    this.rect.x += velX * 0.001 * dt;
    this.rect.y += velY * 0.001 * dt;
  }
  hit(target: AnyCharacter | Enemy<EnemyAction>) {
    if (target.state === 'dead' || target.state === 'death') return;
    if (this.hitEntities.has(target.id)) return;
    if (collideRect(this.rect, target.rect)) {
      this.hitEntities.add(target.id);
      if (this.shouldStun()) {
        target.state = 'hit';
      }
      target.health -= this.damage;

      if (this.onHit && !this.didHit) {
        this.onHit(target);
      }
      if (!this.didHit) {
        this.animation.onFrame(this.animation.nFrame - 1, () => {
          this.isAlive = false;
        });
        this.didHit = true;
      }
    }
  }
}
