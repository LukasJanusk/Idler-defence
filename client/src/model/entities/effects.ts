import lightningStrikeBoltUrl from '@/assets/Lightning_Mage/lightning_strike_bolt.svg';
import lightningStrikeGlowUrl from '@/assets/Lightning_Mage/lightning_strike_glow.svg';
import { Sheet } from '@/model/animations/animation';
import type { Rect } from '@/types';
import { v4 } from 'uuid';

export interface VisualEffect {
  id: string;
  prepare(prepareSheet: (sheet: Sheet) => void): void;
  update(dt: number): void;
  draw(ctx: CanvasRenderingContext2D): void;
  isAlive(): boolean;
  isInside(bounds: Rect): boolean;
}

export class LightningStrikeEffect implements VisualEffect {
  private static readonly boltSheet = new Sheet(lightningStrikeBoltUrl);
  private static readonly glowSheet = new Sheet(lightningStrikeGlowUrl);

  id = `lightning-strike-${v4()}`;
  elapsed = 0;
  readonly x: number;
  readonly bottomY: number;
  readonly width = 76;
  readonly impactSize = 120;
  readonly duration = 260;
  readonly sway = 6 + Math.random() * 6;
  readonly phase = Math.random() * Math.PI * 2;

  constructor(x: number, bottomY: number) {
    this.x = x;
    this.bottomY = bottomY;
  }

  prepare(prepareSheet: (sheet: Sheet) => void) {
    prepareSheet(LightningStrikeEffect.boltSheet);
    prepareSheet(LightningStrikeEffect.glowSheet);
  }

  update(dt: number) {
    this.elapsed += dt;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const progress = this.elapsed / this.duration;
    const opacity =
      progress < 0.2 ? 1 : Math.max(1 - (progress - 0.2) / 0.8, 0);
    const width = this.width * (1 - progress * 0.12);
    const impactSize = this.impactSize * (1 + progress * 0.08);
    const boltHeight = Math.max(this.bottomY, 48);
    const mainOffset = Math.sin(progress * 22 + this.phase) * this.sway;
    const branchOffset = Math.cos(progress * 16 + this.phase) * this.sway * 0.6;

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = opacity;

    if (LightningStrikeEffect.boltSheet.loaded) {
      this.drawBoltImage(ctx, this.x + mainOffset, width, boltHeight, opacity);
      this.drawBoltImage(
        ctx,
        this.x + branchOffset,
        width * 0.7,
        boltHeight,
        opacity * 0.45,
      );
    } else {
      this.drawBoltFallback(
        ctx,
        this.x + mainOffset,
        width,
        boltHeight,
        opacity,
      );
    }

    if (LightningStrikeEffect.glowSheet.loaded) {
      ctx.globalAlpha = opacity * 0.95;
      ctx.drawImage(
        LightningStrikeEffect.glowSheet.img,
        this.x - impactSize / 2,
        this.bottomY - impactSize / 2,
        impactSize,
        impactSize,
      );
    } else {
      this.drawImpactFallback(ctx, this.x, this.bottomY, impactSize, opacity);
    }

    ctx.restore();
  }

  isAlive() {
    return this.elapsed < this.duration;
  }

  isInside(bounds: Rect) {
    return this.x >= bounds.x && this.x <= bounds.width && this.bottomY >= 0;
  }

  private drawBoltImage(
    ctx: CanvasRenderingContext2D,
    x: number,
    width: number,
    height: number,
    opacity: number,
  ) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.drawImage(
      LightningStrikeEffect.boltSheet.img,
      x - width / 2,
      0,
      width,
      height,
    );
    ctx.restore();
  }

  private drawBoltFallback(
    ctx: CanvasRenderingContext2D,
    x: number,
    width: number,
    height: number,
    opacity: number,
  ) {
    const halfWidth = width / 2;
    const segments = 6;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = `rgba(255, 240, 178, ${opacity})`;
    ctx.shadowBlur = 24;
    ctx.shadowColor = 'rgba(245, 193, 61, 0.95)';
    ctx.lineWidth = Math.max(halfWidth * 0.22, 8);
    ctx.beginPath();
    ctx.moveTo(x, 0);

    for (let index = 1; index < segments; index += 1) {
      const segmentY = (height / segments) * index;
      const segmentX = x + Math.sin(index * 1.7) * halfWidth * 0.5;
      ctx.lineTo(segmentX, segmentY);
    }

    ctx.lineTo(x - halfWidth * 0.35, height);
    ctx.stroke();
    ctx.restore();
  }

  private drawImpactFallback(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    opacity: number,
  ) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size / 2);

    gradient.addColorStop(0, `rgba(255, 251, 224, ${opacity})`);
    gradient.addColorStop(0.35, `rgba(255, 227, 130, ${opacity * 0.9})`);
    gradient.addColorStop(1, 'rgba(240, 178, 31, 0)');

    ctx.save();
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
