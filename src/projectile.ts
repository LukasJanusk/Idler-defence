import { v4 } from 'uuid';
import { Sheet } from './animation';
import type { Rect } from './types';
import { collideRect, getRectMiddle } from './utils';
import fireball from './assets/Fire_Wizard/Charge.png';

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
      this.frame++;
      if (this.frame >= this.nFrame) {
        this.alive = false;
        return;
      }
    } else {
      this.frame = (this.frame + 1) % this.hitFrame;
    }
  }

  tick(dt: number) {
    this.elapsed += dt;
    if (this.elapsed >= this.frameDuration) {
      this.updateFrame();
      this.elapsed -= this.frameDuration;
    }
    if (this.didHit && !this.onHitDidTrigger && this.onHit) {
      this.onHit();
      this.onHitDidTrigger = true;
    }
    if (!this.alive && this.onEnd) {
      this.onEnd();
    }
  }
  clone(): ProjectileAnimation {
    const clone = new ProjectileAnimation(
      this.sheet,
      this.nFrame,
      this.hitFrame,
      this.frameDuration,
      this.name,
      this.onHit,
    );
    clone.frame = this.frame;
    clone.didHit = this.didHit;
    clone.elapsed = this.elapsed;
    clone.alive = this.alive;
    clone.onHitDidTrigger = this.onHitDidTrigger;
    return clone;
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
  animation: ProjectileAnimation;
  targetRect: Rect;
  targetId: string | null;
  speed: number;
  rect: Rect;
  gravity: number;
  didHit: boolean;
  isAlive: boolean;
  onHit?: () => void;

  constructor(
    id: string,
    name: string,
    animation: ProjectileAnimation,
    rect: Rect,
    targetRect: Rect,
    speed: number,
    targetId: string | null,
    gravity: number = 10,
    onHit?: (proj: Projectile) => void,
  ) {
    this.id = id;
    this.name = name;
    this.animation = animation;
    this.rect = rect;
    this.targetId = targetId;
    this.targetRect = targetRect;
    this.speed = speed;
    this.rect = rect;
    this.gravity = gravity;
    this.didHit = false;
    this.isAlive = true;
    this.onHit = onHit ? () => onHit(this) : undefined;
  }
  update(dt: number) {
    if (!this.didHit && collideRect(this.rect, this.targetRect)) {
      this.didHit = true;
      this.animation.didHit = true;
      if (this.animation.onHit) {
        this.animation.onHit();
      }
      if (this.onHit) {
        this.onHit();
      }
      setTimeout(() => {
        this.isAlive = false;
      }, 1000);
      this.didHit = true;
      this.animation.didHit = true;
      return;
    }

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
}

export const createFireBall = (
  x: number,
  y: number,
  targetX: number,
  targetY: number,
  onHit?: (proj: Projectile) => void,
) => {
  const fireballUrl = new URL(fireball, import.meta.url).href;
  const fireBallAnimation = createProjectileAnimation(
    fireballUrl,
    12,
    5,
    100,
    'fireball',
  );
  const fireBallProjectile = new Projectile(
    `test-${v4()}`,
    'Firebal Projectile',
    fireBallAnimation,
    {
      x,
      y,
      width: 64,
      height: 64,
    },
    {
      x: targetX,
      y: targetY,
      width: 64,
      height: 64,
    },
    100,
    'test-target',
    10,
    onHit,
  );
  return fireBallProjectile;
};
