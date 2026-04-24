import { v4 } from 'uuid';
import { Sheet } from '@/model/animations/animation';
import type { AnyCharacter, Rect } from '@/types';
import { collideRect, getRectMiddle } from '@/utils';
import { Animation } from '@/model/animations/animation';
import type { EnemyAction } from './character';
import type { Enemy } from './enemy';
import { GAME_HEIGHT, GAME_WIDTH } from '@/constants';

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
  arcHeight: number;
  didHit: boolean;
  isAlive: boolean;
  rotation: number = 0;
  stun: boolean = true;
  onHit?: (target?: AnyCharacter | Enemy<EnemyAction>) => void;
  private hitEntities: Set<string> = new Set();
  private launchRect: Rect;
  private traveledDistance: number = 0;

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
    this.arcHeight = 0;
    this.didHit = false;
    this.isAlive = true;
    this.onHit = onHit;
    this.launchRect = { ...rect };
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
    if (
      this.rect.x + this.rect.width < 0 ||
      this.rect.x > GAME_WIDTH ||
      this.rect.y > GAME_HEIGHT + this.rect.height ||
      this.rect.y + this.rect.height < 0
    ) {
      this.isAlive = false;
      return;
    }
    const launchMiddle = getRectMiddle(this.launchRect);
    const targetMiddle = getRectMiddle(this.targetRect);
    const dx = targetMiddle.x - launchMiddle.x;
    const dy = targetMiddle.y - launchMiddle.y;
    const totalDistance = Math.hypot(dx, dy);
    if (totalDistance === 0) return;

    this.traveledDistance = Math.min(
      this.traveledDistance + this.speed * 0.001 * dt,
      totalDistance,
    );

    const progress = this.traveledDistance / totalDistance;
    const arcOffset =
      this.arcHeight > 0 ? -4 * this.arcHeight * progress * (1 - progress) : 0;
    const arcSlope =
      this.arcHeight > 0 ? 4 * this.arcHeight * (2 * progress - 1) : 0;

    this.rect.x = this.launchRect.x + dx * progress;
    this.rect.y = this.launchRect.y + dy * progress + arcOffset;
    this.rotation = (Math.atan2(dy + arcSlope, dx) * 180) / Math.PI;
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

      if (this.onHit) {
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
