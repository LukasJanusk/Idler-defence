import { v4 } from 'uuid';
import type { CharacterActions } from './types';

export class Sheet {
  image: HTMLImageElement = new Image();
  width = 0;
  height = 0;
  loaded = false;

  constructor(url: string) {
    this.image.src = url;
  }
  async load(): Promise<void> {
    if (this.image.complete && this.image.naturalWidth !== 0) {
      this.width = this.image.width;
      this.height = this.image.height;
      return;
    }
    await new Promise<void>((resolve) => {
      this.image.onload = () => {
        this.width = this.image.width;
        this.height = this.image.height;
        resolve();
      };
    });
  }

  getFrameRect(frameIndex: number, frameCount: number) {
    const frameWidth = this.width / frameCount;
    return {
      x: frameIndex * frameWidth,
      y: 0,
      width: frameWidth,
      height: this.height,
    };
  }
}

export class Animation {
  id: string = 'Anim' + v4();
  name: CharacterActions;
  frame: number = 0;
  elapsed: number = 0;
  nFrame: number;
  frameDuration: number;
  sheet: Sheet;

  constructor(
    sheet: Sheet,
    nFrame: number,
    frameDuration: number,
    name: CharacterActions,
  ) {
    this.sheet = sheet;
    this.nFrame = nFrame;
    this.frameDuration = frameDuration;
    this.name = name;
  }
  async init() {
    await this.sheet.load();
  }
  updateFrame() {
    this.frame = (this.frame + 1) % this.nFrame;
  }
  tick(dt: number) {
    this.elapsed += dt;
    if (this.elapsed >= this.frameDuration) {
      this.updateFrame();
      this.elapsed -= this.frameDuration;
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
export async function createAnimation(
  url: string,
  nFrame: number,
  frameDuration: number,
  name: CharacterActions,
): Promise<Animation> {
  const sheet = new Sheet(url);
  const anim = new Animation(sheet, nFrame, frameDuration, name);
  await anim.init();
  return anim;
}
