import type { Rect } from '@/types';
import { LightningStrikeEffect, type VisualEffect } from './entities/effects';
import { Sheet } from './animations/animation';

export class EffectManager {
  effects: VisualEffect[] = [];

  spawnLightningStrike(x: number, bottomY: number) {
    this.effects.push(new LightningStrikeEffect(x, bottomY));
  }

  updateEffects(dt: number) {
    this.effects.forEach((effect) => {
      effect.prepare(this.prepareSheet);
      effect.update(dt);
    });
  }

  drawEffects(ctx: CanvasRenderingContext2D) {
    this.effects.forEach((effect) => {
      if (effect.isAlive()) {
        effect.draw(ctx);
      }
    });
  }

  cleanupEffects(bounds: Rect) {
    this.effects = this.effects.filter(
      (effect) => effect.isAlive() && effect.isInside(bounds),
    );
  }

  clear() {
    this.effects = [];
  }

  private prepareSheet(sheet: Sheet) {
    if (sheet.loaded) return;
    if (sheet.img.complete && sheet.img.naturalWidth) {
      sheet.width = sheet.img.naturalWidth;
      sheet.height = sheet.img.naturalHeight;
      sheet.loaded = true;
      return;
    }
    void sheet.load().catch(() => undefined);
  }
}
