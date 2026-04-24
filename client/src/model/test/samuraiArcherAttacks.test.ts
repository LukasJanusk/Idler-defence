import { describe, expect, it, vi } from 'vitest';
import { createDefaultGrid } from './utils';
import { GridRenderer } from '@/model/gridRenderer';
import { SamuraiArcher } from '@/model/entities/character';
import { createSamuraiArcherAnimations } from '@/model/animations/samuraiArcherAnimations';
import {
  ArcaneParticle,
  HealthParticle,
  SlashParticle,
} from '@/model/entities/particles';
import {
  createSamuraiArcherArrowAttack,
  initSamuraiArcherAttacks,
} from '@/model/characterAttacks/samuraiArcherAttacks';

class MockImage {
  complete = true;
  naturalWidth = 128;
  naturalHeight = 128;
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  src = '';
}

vi.stubGlobal('Image', MockImage);

describe('samuraiArcherAttacks', () => {
  it('starts stronger than the initial implementation', () => {
    const samuraiArcher = new SamuraiArcher(
      'samurai-archer',
      'Hattori',
      createSamuraiArcherAnimations(),
    );

    expect(samuraiArcher.health).toBe(160);
    expect(samuraiArcher.armor).toBe(14);
    expect(samuraiArcher.attributes.strength).toBe(14);
    expect(samuraiArcher.attributes.dexterity).toBe(24);
    expect(
      samuraiArcher.skills.find((skill) => skill.action === 'attack')?.damage,
    ).toBe(68);
    expect(
      samuraiArcher.skills.find((skill) => skill.action === 'drawCut')?.damage,
    ).toBe(96);
    expect(
      samuraiArcher.skills.find((skill) => skill.action === 'bowShot')?.damage,
    ).toBe(108);
    expect(
      samuraiArcher.skills.find((skill) => skill.action === 'idle')?.cost,
    ).toBe(-3);
  });

  it('creates a bow projectile with expected combat values', () => {
    const projectile = createSamuraiArcherArrowAttack(256, 128, 1.2, 95, 460);

    expect(projectile.damage).toBe(114);
    expect(projectile.speed).toBe(460);
    expect(projectile.source).toBe('character');
    expect(projectile.stun).toBe(false);
    expect(projectile.arcHeight).toBe(42);
  });

  it('moves the bow projectile on a visible arc', () => {
    const projectile = createSamuraiArcherArrowAttack(256, 128, 1, 95, 460);
    const initialY = projectile.rect.y;

    projectile.update(900);

    expect(projectile.rect.x).toBeGreaterThan(256 + 74);
    expect(projectile.rect.y).toBeLessThan(initialY);
  });

  it('rotates the bow projectile upward on ascent and downward on descent', () => {
    const ascendingProjectile = createSamuraiArcherArrowAttack(
      256,
      128,
      1,
      95,
      460,
    );
    const descendingProjectile = createSamuraiArcherArrowAttack(
      256,
      128,
      1,
      95,
      460,
    );

    ascendingProjectile.update(500);
    descendingProjectile.update(1800);

    expect(ascendingProjectile.rotation).toBeLessThan(0);
    expect(descendingProjectile.rotation).toBeGreaterThan(
      ascendingProjectile.rotation,
    );
    expect(descendingProjectile.rect.y).toBeGreaterThan(
      ascendingProjectile.rect.y,
    );
  });

  it('emits small recovery bubbles while idling without slash particles', () => {
    const grid = createDefaultGrid();
    const renderer = new GridRenderer(grid);
    const samuraiArcher = new SamuraiArcher(
      'samurai-archer',
      'Hattori',
      createSamuraiArcherAnimations(),
    );

    samuraiArcher.pos = 'pos1';
    samuraiArcher.energy = samuraiArcher.maxEnergy - 10;
    grid.setCharacterToPosition('pos1', samuraiArcher);
    initSamuraiArcherAttacks(grid, renderer, samuraiArcher);

    samuraiArcher.animations.idle.tick(100);

    expect(samuraiArcher.buffs.size).toBe(1);
    expect(
      renderer.particleManager.particles.some(
        (particle) => particle instanceof HealthParticle,
      ),
    ).toBe(true);
    expect(
      renderer.particleManager.particles.some(
        (particle) => particle instanceof ArcaneParticle,
      ),
    ).toBe(true);
    expect(
      renderer.particleManager.particles.some(
        (particle) => particle instanceof SlashParticle,
      ),
    ).toBe(false);
  });

  it('registers a bow projectile when the bow shot animation reaches the fire frame', () => {
    const grid = createDefaultGrid();
    const renderer = new GridRenderer(grid);
    const samuraiArcher = new SamuraiArcher(
      'samurai-archer',
      'Hattori',
      createSamuraiArcherAnimations(),
    );

    samuraiArcher.pos = 'pos1';
    grid.setCharacterToPosition('pos1', samuraiArcher);
    initSamuraiArcherAttacks(grid, renderer, samuraiArcher);

    samuraiArcher.animations.bowShot.tick(800);

    const area = grid.getAreaFromPos('pos1');
    expect(area?.projectiles.size).toBe(1);
  });
});
