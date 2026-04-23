import { MAXIMUM_PARTICLES } from '@/constants';
import { defaultSettings } from '@/defaults';
import type { Animation } from '@/model/animations/animation';
import type { Rect } from '@/types';
import type { AnyCharacter } from '@/types';
import type { ParticleType } from './entities/particles';
import type { ProjectileAnimation } from './entities/projectile';
import type { Grid } from './grid';
import { ParticleManager } from './particleManager';

type RenderAnimation = Animation | ProjectileAnimation;

export class GridRenderer {
  particleManager: ParticleManager = new ParticleManager();
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

  getRenderState() {
    return {
      enemies: this.grid.getEnemies(),
      projectiles: this.grid.getProjectiles(),
      party: this.grid.getParty(),
    };
  }

  tickAnimations(dt: number) {
    for (const animation of this.getAnimations()) {
      this.prepareSheet(animation);
      animation.tick(dt);
    }
  }

  render(dt: number, ctx: CanvasRenderingContext2D) {
    if (!this.renderParticles) return;
    this.particleManager.updateAndDrawParticles(dt, ctx, MAXIMUM_PARTICLES);
  }

  cleanup() {
    this.particleManager.cleanupParticles(this.getBounds());
  }

  clear() {
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

  private prepareSheet(animation: RenderAnimation) {
    const { sheet } = animation;
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
