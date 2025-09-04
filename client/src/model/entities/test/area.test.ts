import { it, describe, expect } from 'vitest';
import { Area } from '@/model/grid';
import {
  createTestAttack,
  createTestKnight,
  createTestProjectile,
} from './utils';
import { createZombieOne } from '@/defaults';

describe('registerEntity', () => {
  it('registers Character correctly', () => {
    const area = new Area(128, 128, 0, 0, 'test-area-0-0');
    const character = createTestKnight();
    area.registerEntity(character);

    expect(area.characters).toHaveLength(1);
  });

  it('Does not allow second character to be registered to the same area', () => {
    const area = new Area(128, 128, 2, 2, 'test-area-0-0');
    const character = createTestKnight();
    const character2 = createTestKnight({ id: 'knight-test-2' });
    area.registerEntity(character);

    expect(character.rect.x).toEqual(area.rect.x);
    expect(character.rect.y).toEqual(area.rect.y);

    const result = area.registerEntity(character2);

    expect(result).toEqual(false);
    expect(area.characters).toHaveLength(1);
  });

  it('registers enemy to area', () => {
    const area = new Area(128, 128, 0, 0, 'test-area-0-0');
    const enemy1 = createZombieOne();
    const enemy2 = createZombieOne();

    area.registerEntity(enemy1);
    expect(area.enemies.size).toEqual(1);

    // no duplicates
    area.registerEntity(enemy1);
    expect(area.enemies.size).toEqual(1);

    area.registerEntity(enemy2);
    expect(area.enemies.size).toEqual(2);
  });

  it('registers projectile to area', () => {
    const area = new Area(128, 128, 0, 0, 'test-area-0-0');
    const proj1 = createTestProjectile();
    const proj2 = createTestProjectile();

    area.registerEntity(proj1);
    expect(area.projectiles.size).toEqual(1);

    // no duplicates
    area.registerEntity(proj1);
    expect(area.projectiles.size).toEqual(1);

    area.registerEntity(proj2);
    expect(area.projectiles.size).toEqual(2);
  });

  it('registers attack to area', () => {
    const area = new Area(128, 128, 2, 3, 'test-area-2-3');
    const attack1 = createTestAttack();
    const attack2 = createTestAttack();

    area.registerEntity(attack1);
    expect(area.attacks.size).toEqual(1);
    expect(attack1.rect.x).toEqual(area.rect.x);
    expect(attack1.rect.y).toEqual(area.rect.y);

    area.registerEntity(attack1);
    expect(area.attacks.size).toEqual(1);

    area.registerEntity(attack2);
    expect(area.attacks.size).toEqual(2);
  });

  it('cleans up dead/expired attacks/projectiles', () => {
    const area = new Area(128, 128, 2, 3, 'test-area-2-3');
    const attack1 = createTestAttack();
    const attack2 = createTestAttack();
    const proj1 = createTestProjectile();
    const proj2 = createTestProjectile();

    attack1.isAlive = false;
    proj1.isAlive = false;

    area.projectiles.add(proj1);
    area.projectiles.add(proj2);
    area.attacks.add(attack1);
    area.attacks.add(attack2);

    expect(area.projectiles.size).toEqual(2);
    expect(area.attacks.size).toEqual(2);

    area.cleanup();

    expect(area.projectiles.size).toEqual(1);
    expect(area.attacks.size).toEqual(1);
  });

  it('removes dead enemies', () => {
    const area = new Area(128, 128, 2, 3, 'test-area-2-3');

    const enemy1 = createZombieOne();
    const enemy2 = createZombieOne();

    enemy1.state = 'dead';

    area.enemies.add(enemy1);
    area.enemies.add(enemy2);
    expect(area.enemies.size).toEqual(2);

    area.removeDeadEnemies();

    expect(area.enemies.size).toEqual(1);
  });
});
