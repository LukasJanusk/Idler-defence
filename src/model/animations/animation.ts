import { v4 } from 'uuid';
import type { AnyAction } from '@/model/entities/character';

export class Sheet {
  src: string;
  width = 0;
  height = 0;
  loaded = false;
  img: HTMLImageElement;

  constructor(url: string) {
    this.src = url;
    this.img = new Image();
    this.img.src = url;
  }
  async load() {
    if (this.img.complete && this.img.naturalWidth) {
      this.width = this.img.naturalWidth;
      this.height = this.img.naturalHeight;
      return;
    }
    await new Promise<void>((resolve, reject) => {
      this.img.onload = () => {
        this.width = this.img.naturalWidth;
        this.height = this.img.naturalHeight;
        resolve();
      };
      this.img.onerror = () => reject(new Error('Failed to load image'));
    });
  }
}

export class Animation {
  id: string = 'Anim' + v4();
  name: AnyAction;
  frame: number = 0;
  elapsed: number = 0;
  nFrame: number;
  frameDuration: number;
  sheet: Sheet;

  private frameCallbacks: Map<number, Set<() => void>> = new Map();
  private triggeredThisLoop: Set<number> = new Set();

  constructor(
    sheet: Sheet,
    nFrame: number,
    frameDuration: number,
    name: AnyAction,
  ) {
    this.sheet = sheet;
    this.nFrame = nFrame;
    this.frameDuration = frameDuration;
    this.name = name;
  }
  onFrame(frame: number, callback: () => void) {
    if (!this.frameCallbacks.has(frame)) {
      this.frameCallbacks.set(frame, new Set());
    }
    this.frameCallbacks.get(frame)!.add(callback);
  }
  updateFrame() {
    this.frame = (this.frame + 1) % this.nFrame;
  }
  tick(dt: number) {
    this.elapsed += dt;

    if (this.elapsed >= this.frameDuration) {
      this.elapsed -= this.frameDuration;

      this.updateFrame();

      if (this.frame === 0) {
        this.triggeredThisLoop.clear();
      }

      if (!this.triggeredThisLoop.has(this.frame)) {
        const callbacks = this.frameCallbacks.get(this.frame);
        if (callbacks) {
          callbacks.forEach((cb) => cb());
          this.triggeredThisLoop.add(this.frame);
        }
      }
    }
  }

  clone(): Animation {
    const clone = new Animation(
      this.sheet,
      this.nFrame,
      this.frameDuration,
      this.name,
    );
    clone.frame = this.frame;
    clone.elapsed = this.elapsed;
    return clone;
  }
  reset() {
    this.frame = 0;
    this.elapsed = 0;
  }
}
export function createAnimation(
  url: string,
  nFrame: number,
  frameDuration: number,
  name: AnyAction,
): Animation {
  const sheet = new Sheet(url);
  const anim = new Animation(sheet, nFrame, frameDuration, name);
  return anim;
}
