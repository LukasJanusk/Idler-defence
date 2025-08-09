import { v4 } from 'uuid';
import { Sheet } from './animation';

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
  private onHitDidTrigger: boolean = false;

  constructor(
    sheet: Sheet,
    nFrame: number,
    hitFrame: number,
    frameDuration: number,
    name: string,
    onHit?: () => void,
  ) {
    this.sheet = sheet;
    this.nFrame = nFrame;
    this.hitFrame = hitFrame;
    this.frameDuration = frameDuration;
    this.name = name;
    this.onHit = onHit;
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
  position: { x: number; y: number };
  targetPosition: { x: number; y: number };
  targetId: string | null;

  constructor(
    id: string,
    name: string,
    animation: ProjectileAnimation,
    position: { x: number; y: number },
    targetPosition: { x: number; y: number },
    targetId: string | null,
  ) {
    this.id = id;
    this.name = name;
    this.animation = animation;
    this.position = position;
    this.targetId = targetId;
    this.targetPosition = targetPosition;
  }
}
