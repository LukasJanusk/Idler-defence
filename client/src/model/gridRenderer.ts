import { MAXIMUM_PARTICLES } from '@/constants';
import { defaultSettings } from '@/defaults';
import { type Animation, Sheet } from '@/model/animations/animation';
import type { Rect } from '@/types';
import type { AnyCharacter } from '@/types';
import type { ParticleType } from './entities/particles';
import type { ProjectileAnimation } from './entities/projectile';
import { EffectManager } from './effectManager';
import type { Grid } from './grid';
import { ParticleManager } from './particleManager';

type RenderAnimation = Animation | ProjectileAnimation;

export class GridRenderer {
  particleManager: ParticleManager = new ParticleManager();
  effectManager: EffectManager = new EffectManager();
  renderParticles = defaultSettings.drawParticles;
  private readonly grid: Grid;

  constructor(grid: Grid) {
    this.grid = grid;
  }

  setRenderParticles(render: boolean) {
    this.renderParticles = render;
  }

  generateParticles(
    type: ParticleType,
    x: number,
    y: number,
    n: number,
    arc?: number,
  ) {
    if (!this.renderParticles) return;
    this.particleManager.generateParticles(type, x, y, n, arc);
  }

  spawnLightningStrike(x: number, bottomY: number) {
    this.effectManager.spawnLightningStrike(x, bottomY);
  }

  getRenderState() {
    return {
      enemies: this.grid.getEnemies(),
      projectiles: this.grid.getProjectiles(),
      party: this.grid.getParty(),
    };
  }

  tickAnimations(dt: number) {
    this.effectManager.updateEffects(dt);

    for (const animation of this.getAnimations()) {
      this.prepareSheet(animation.sheet);
      animation.tick(dt);
    }
  }

  render(dt: number, ctx: CanvasRenderingContext2D) {
    if (!this.renderParticles) return;
    this.effectManager.drawEffects(ctx);
    this.particleManager.updateAndDrawParticles(dt, ctx, MAXIMUM_PARTICLES);
  }

  cleanup() {
    this.effectManager.cleanupEffects(this.getBounds());
    this.particleManager.cleanupParticles(this.getBounds());
  }

  clear() {
    this.effectManager.clear();
    this.particleManager.clear();
  }

  private getBounds(): Rect {
    return {
      x: 0,
      y: 0,
      width: this.grid.horizontal * this.grid.areaSize,
      height: this.grid.vertical * this.grid.areaSize,
    };
  }

  private *getAnimations(): Generator<RenderAnimation> {
    const seen = new Set<string>();
    const { enemies, projectiles, party } = this.getRenderState();

    for (const enemy of enemies) {
      yield* this.asAnimation(enemy.animations[enemy.state], seen);
    }

    for (const character of Object.values(party)) {
      if (!character) continue;
      yield* this.asAnimation(this.getCharacterAnimation(character), seen);
    }

    for (const projectile of projectiles) {
      yield* this.asAnimation(projectile.animation, seen);
    }
  }

  private *asAnimation(
    animation: RenderAnimation | undefined,
    seen: Set<string>,
  ): Generator<RenderAnimation> {
    if (!animation || seen.has(animation.id)) return;
    seen.add(animation.id);
    yield animation;
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

  private getCharacterAnimation(character: AnyCharacter) {
    return character.animations[
      character.state as keyof typeof character.animations
    ];
  }
}
