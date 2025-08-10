export class Particle {
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
    super(x, y, vx, vy, Math.random() * 5, 'red', 150);
  }
}
export class EmberParticles extends Particle {
  constructor(x: number, y: number) {
    const vx = (Math.random() - 0.5) * 300;
    const vy = (Math.random() - 1) * 300;
    super(x, y, vx, vy, Math.random() * 5, getRandomEmberColor(), 150);
    this.radius = Math.random() * 3;
  }
}

export function splashBlood(x: number, y: number, nParticle: number) {
  return Array.from({ length: nParticle }).map(() => new BloodParticle(x, y));
}
export function splashEmbers(x: number, y: number, nParticle: number) {
  return Array.from({ length: nParticle }).map(() => new EmberParticles(x, y));
}
function getRandomEmberColor() {
  const colors = ['#FFA500', '#FFD700', '#FF4500'];
  return colors[Math.floor(Math.random() * colors.length)];
}
