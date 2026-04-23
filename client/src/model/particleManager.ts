import type { Rect } from '@/types';
import {
  splashArane,
  splashBlood,
  splashEmbers,
  splashHealth,
  splashHollowSquares,
  splashLines,
  splashMagic,
  splashSparks,
  type AnyParticle,
  type ParticleType,
} from './entities/particles';

export class ParticleManager {
  particles: AnyParticle[] = [];

  generateParticles(
    type: ParticleType,
    x: number,
    y: number,
    n: number,
    arc?: number,
  ) {
    switch (type) {
      case 'blood':
        return this.particles.push(...splashBlood(x, y, n));
      case 'ember':
        return this.particles.push(...splashEmbers(x, y, n));
      case 'arcane':
        return this.particles.push(...splashArane(x, y, n));
      case 'health':
        return this.particles.push(...splashHealth(x, y, n));
      case 'magic':
        return this.particles.push(...splashMagic(x, y, n));
      case 'spark':
        return this.particles.push(...splashSparks(x, y, n));
      case 'line':
        return this.particles.push(...splashLines(x, y, n, arc));
      case 'hollowSquare':
        return this.particles.push(...splashHollowSquares(x, y, n));
    }
  }

  updateAndDrawParticles(
    dt: number,
    ctx: CanvasRenderingContext2D,
    maxParticles: number,
  ) {
    this.particles.forEach((particle, index) => {
      particle.update(dt);
      if (index <= maxParticles) {
        particle.draw(ctx);
      }
    });
  }

  cleanupParticles(area: Rect) {
    this.particles = this.particles.filter(
      (p) =>
        p.x <= area.width &&
        p.y <= area.height &&
        p.x > 0 &&
        p.y > 0 &&
        p.isAlive(),
    );
  }

  clear() {
    this.particles = [];
  }
}
