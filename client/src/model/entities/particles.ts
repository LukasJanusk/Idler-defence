let particleId = 0;
export type ParticleType =
  | 'blood'
  | 'ember'
  | 'arcane'
  | 'health'
  | 'magic'
  | 'spark'
  | 'line';

export type AnyParticle = Particle | SlashParticle;

export class Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  gravity: number;

  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    radius: number,
    color: string,
    gravity = 0,
  ) {
    this.id = particleId++;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;
    this.alpha = 1;
    this.gravity = gravity;
  }

  update(dt: number) {
    this.vy += this.gravity * 0.001 * dt;
    this.x += this.vx * 0.001 * dt;
    this.y += this.vy * 0.001 * dt;
    this.alpha -= 0.001 * dt;
    this.radius -= 0.001 * dt;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.radius <= 0) return;
    ctx.globalAlpha = Math.max(this.alpha, 0);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  isAlive() {
    return this.alpha > 0 && this.radius > 1;
  }
}

export class BloodParticle extends Particle {
  constructor(x: number, y: number) {
    const vx = (Math.random() - 0.5) * 100;
    const vy = (Math.random() - 1) * 100;
    super(x, y, vx, vy, Math.random() * 5, getRandomBloodColor(), 150);
  }
  update(dt: number) {
    this.vy += this.gravity * 0.001 * dt;
    this.x += this.vx * 0.001 * dt;
    this.y += this.vy * 0.001 * dt;
    if (this.y >= 384) this.vy = this.vy * -0.5;
    this.alpha -= 0.001 * dt;
    this.radius -= 0.001 * dt;
  }
}
export class EmberParticle extends Particle {
  constructor(x: number, y: number) {
    const vx = (Math.random() - 0.5) * 200;
    const vy = (Math.random() - 1) * 200;
    super(x, y, vx, vy, Math.random() * 5, getRandomEmberColor(), 10);
    this.radius = Math.random() * 3;
  }
}

export class LightningParticle extends Particle {
  constructor(x: number, y: number) {
    const vx = (Math.random() + 0.7) * 150;
    const vy = (Math.random() - 0.5) * 200;
    super(x, y, vx, vy, Math.random() * 4, getRandomLightningColor(), 10);
    this.radius = Math.random() * 2;
  }
  update(dt: number) {
    this.vy += this.gravity * 0.001 * dt;
    this.x += this.vx * 0.001 * dt;
    this.y += this.vy * 0.001 * dt;
    if (this.y >= 384) {
      this.vy = this.vy * -0.5;
      this.vx = this.vx * (Math.random() - 0.5);
    }
    this.alpha -= 0.001 * dt;
    this.radius -= 0.001 * dt;
  }
}

export class MagicParticle extends Particle {
  constructor(x: number, y: number) {
    const vx = (Math.random() - 0.5) * 500;
    const vy = (Math.random() - 1) * 500;
    super(x, y, vx, vy, Math.random() * 4, getRandomBlueColor(), 500);
    this.radius = Math.random() * 3;
  }
  update(dt: number) {
    this.vy += this.gravity * 0.001 * dt;
    this.x += this.vx * 0.001 * dt;
    this.y += this.vy * 0.001 * dt;
    if (this.y >= 384) this.vy = this.vy * -1;
    this.alpha -= 0.001 * dt;
    this.radius -= 0.001 * dt;
  }
}
export class HealthParticle extends Particle {
  constructor(x: number, y: number) {
    const vx = (Math.random() - 0.5) * 50;
    const vy = (Math.random() - 1) * 100;
    super(x, y, vx, vy, Math.random() * 4, getRandomHealthColor(), -10);
    this.radius = Math.random() * 3;
  }
}

export class ArcaneParticle extends Particle {
  constructor(x: number, y: number) {
    const vx = (Math.random() - 0.5) * 50;
    const vy = (Math.random() - 1) * 100;
    super(x, y, vx, vy, Math.random() * 4, getRandomArcaneColor(), -10);
    this.radius = Math.random() * 5;
  }
}

export class SlashParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  thickness: number;
  length: number;
  gravity: number;
  arc: number;
  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    color: string,
    length: number,
    gravity: number = 0,
    thickness: number = 5,
    arc: number = Math.random() * Math.PI * 2,
  ) {
    this.id = particleId++;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.thickness = thickness;
    this.color = color;
    this.length = length;
    this.alpha = 1;
    this.gravity = gravity;
    this.arc = arc;
  }
  update(dt: number) {
    this.vy += this.gravity * 0.001 * dt;
    this.x += this.vx * 0.001 * dt;
    this.y += this.vy * 0.001 * dt;
    this.alpha -= 0.003 * dt;
    this.thickness += 0.005 * dt;
    this.length += 0.3 * dt;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.thickness <= 0 || this.thickness >= 50) return;
    const dx = Math.cos(this.arc);
    const dy = Math.sin(this.arc);
    const halfLen = this.length / 2;
    const x1 = this.x - dx * halfLen;
    const y1 = this.y - dy * halfLen;
    const x2 = this.x + dx * halfLen;
    const y2 = this.y + dy * halfLen;
    ctx.globalAlpha = Math.max(this.alpha, 0);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  isAlive() {
    return this.alpha > 0 && this.thickness < 50;
  }
}

export function splashBlood(x: number, y: number, nParticle: number) {
  return Array.from({ length: nParticle }).map(() => new BloodParticle(x, y));
}
export function splashEmbers(x: number, y: number, nParticle: number) {
  return Array.from({ length: nParticle }).map(() => new EmberParticle(x, y));
}
export function splashSparks(x: number, y: number, nParticle: number) {
  return Array.from({ length: nParticle }).map(
    () => new LightningParticle(x, y),
  );
}
export function splashMagic(x: number, y: number, nParticle: number) {
  return Array.from({ length: nParticle }).map(() => new MagicParticle(x, y));
}
export function splashHealth(x: number, y: number, nParticle: number) {
  return Array.from({ length: nParticle }).map(() => new HealthParticle(x, y));
}
export function splashArane(x: number, y: number, nParticle: number) {
  return Array.from({ length: nParticle }).map(() => new ArcaneParticle(x, y));
}
export function splashLines(
  x: number,
  y: number,
  nParticles: number,
  arc?: number,
) {
  return Array.from({ length: nParticles }).map(
    () => new SlashParticle(x, y, 10, 1, getRandomSlashColor(), 50, 0, 1, arc),
  );
}
function getRandomEmberColor() {
  const colors = ['#FFA500', '#FFD700', '#FF4500'];
  return colors[Math.floor(Math.random() * colors.length)];
}
function getRandomBloodColor() {
  const colors = ['#FF0000', '#DC143C', '#B22222', '#FF6347', '#8B0000'];
  return colors[Math.floor(Math.random() * colors.length)];
}
function getRandomLightningColor() {
  const colors = ['#FFFFFF', '#FFFFE0', '#FFFACD', '#FAFAD2', '#FFFF00'];
  return colors[Math.floor(Math.random() * colors.length)];
}
function getRandomBlueColor() {
  const colors = ['#ADD8E6', '#87CEFA', '#4682B4', '#1E90FF', '#0000FF'];
  return colors[Math.floor(Math.random() * colors.length)];
}
function getRandomHealthColor() {
  const colors = ['#7A1F2E', '#8B2635', '#9C2E3C', '#AD3543', '#BE3C4A'];
  return colors[Math.floor(Math.random() * colors.length)];
}
function getRandomArcaneColor() {
  const colors = ['#8A2BE2', '#9400D3', '#9932CC', '#BA55D3', '#DA70D6'];
  return colors[Math.floor(Math.random() * colors.length)];
}
function getRandomSlashColor() {
  const colors = [
    '#E6F0FA',
    '#CCE5FF',
    '#FFDAB9',
    '#FFE4B5',
    '#FFF5E1',
    '#F0F8FF',
    '#FAFAD2',
    '#FFEFD5',
    '#F5F5F5',
    '#FFFACD',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
