import { v4 } from 'uuid';
import type { AnyCharacter, Rect } from '@/types';
import { Projectile } from '@/model/entities/projectile';
import {
  FireMage,
  Knight,
  LightningMage,
  Warrior,
  Wizard,
  type EnemyAction,
} from './entities/character';
import { getRectMiddle } from '../utils';
import { Enemy } from './entities/enemy';
import { Attack } from './entities/attack';
import {
  Particle,
  splashBlood,
  splashEmbers,
  type ParticleType,
} from './entities/particles';

const isCharacter = (entity: unknown): entity is AnyCharacter => {
  if (
    entity instanceof Warrior ||
    entity instanceof FireMage ||
    entity instanceof Wizard ||
    entity instanceof LightningMage ||
    entity instanceof Knight
  ) {
    return true;
  }
  return false;
};

const isProjectile = (entity: unknown): entity is Projectile => {
  if (entity instanceof Projectile) {
    return true;
  }
  return false;
};

const isEnemy = (entity: unknown): entity is Enemy<EnemyAction> => {
  if (entity instanceof Enemy) {
    return true;
  }
  return false;
};

const isAttack = (entity: unknown): entity is Attack => {
  if (entity instanceof Attack) {
    return true;
  }
  return false;
};
export class Area {
  id: string;
  width: number;
  height: number;
  row: number;
  column: number;
  rect: Rect = { x: 0, y: 0, width: 0, height: 0 };
  characters: Array<AnyCharacter> = [];
  enemies: Set<Enemy<EnemyAction>> = new Set();
  projectiles: Array<Projectile> = [];
  attacks: Array<Attack> = [];

  constructor(
    width: number,
    height: number,
    row: number,
    column: number,
    id?: string,
  ) {
    this.width = width;
    this.height = height;
    this.row = row;
    this.column = column;
    this.id = id ? id : v4();
  }
  registerEntity(entity: unknown): boolean {
    if (isCharacter(entity)) {
      if (this.characters.length > 0) {
        return false;
      }
      this.characters.push(entity);
      return true;
    } else if (isProjectile(entity)) {
      this.projectiles.push(entity);
      return true;
    } else if (isEnemy(entity)) {
      this.enemies.add(entity);
      return true;
    } else if (isAttack(entity)) {
      this.attacks.push(entity);
      return true;
    }
    return false;
  }
  unRegisterEnemy(enemy: Enemy<EnemyAction>) {
    this.enemies.delete(enemy);
  }
  unRegisterProjectile(projectile: Projectile) {
    const index = this.projectiles.findIndex((p) => p.id === projectile.id);
    if (index !== -1) this.projectiles.splice(index, 1);
  }
  cleanup() {
    for (const enemy of this.enemies) {
      if (enemy.state === 'dead') {
        this.enemies.delete(enemy);
      }
    }
    this.characters = this.characters.filter((c) => c.state !== 'dead');
    this.projectiles = this.projectiles.filter((p) => p.isAlive);
    this.attacks = this.attacks.filter((a) => !a.didHit);
  }
}

export class Grid {
  grid: Area[][];
  horizontal: number;
  vertical: number;
  areaSize: number;
  particles: Particle[] = [];

  constructor(horizontal: number, vertical: number, areaSize: number) {
    this.horizontal = horizontal;
    this.vertical = vertical;
    this.areaSize = areaSize;
    this.grid = Array.from({ length: vertical }, (_, row) =>
      Array.from(
        { length: horizontal },
        (_, col) =>
          new Area(areaSize, areaSize, row, col, `area-${row}-${col}`),
      ),
    );
    this.grid.forEach((row, rowIndex) =>
      row.forEach(
        (area, colIndex) =>
          (area.rect = {
            x: area.width * colIndex,
            y: area.height * rowIndex,
            width: area.width,
            height: area.height,
          }),
      ),
    );
  }
  getClosestArea(objRect: Rect) {
    let closest = this.grid[0][0];
    const objMiddle = getRectMiddle(objRect);
    let minDist = Infinity;
    this.grid.forEach((row) =>
      row.forEach((area) => {
        const areaMiddle = getRectMiddle(area.rect);
        const dist = Math.hypot(
          areaMiddle.x - objMiddle.x,
          areaMiddle.y - objMiddle.y,
        );
        if (dist < minDist) {
          minDist = dist;
          closest = area;
        }
      }),
    );
    return closest;
  }
  generateParticles(type: ParticleType, x: number, y: number, n: number) {
    switch (type) {
      case 'blood':
        return this.particles.push(...splashBlood(x, y, n));
      case 'ember':
        return this.particles.push(...splashEmbers(x, y, n));
    }
  }
  updateAndDrawParticles(dt: number, ctx: CanvasRenderingContext2D) {
    this.particles.forEach((p) => {
      p.update(dt);
      p.draw(ctx);
    });
  }
  filterExpiredParticles() {
    this.particles = this.particles.filter((p) => p.isAlive());
  }
  private registerEnemiesToArea(currentArea: Area) {
    currentArea.enemies.forEach((enemy) => {
      const newArea = this.getClosestArea(enemy.rect);
      if (newArea.id === currentArea.id) return;
      currentArea.unRegisterEnemy(enemy);
      newArea.registerEntity(enemy);
    });
  }
  private registerProjetilesToArea(currentArea: Area) {
    currentArea.projectiles.forEach((projectile) => {
      const newArea = this.getClosestArea(projectile.rect);
      if (newArea.id === currentArea.id) return;
      currentArea.unRegisterProjectile(projectile);
      newArea.registerEntity(projectile);
    });
  }
  private registerEntitiesToArea() {
    this.grid.forEach((row) =>
      row.forEach((area) => {
        this.registerEnemiesToArea(area);
        this.registerProjetilesToArea(area);
      }),
    );
  }
  private handlePlayerAttacks(attack: Attack, area: Area) {
    area.enemies.forEach((enemy) => attack.hit(enemy));
  }
  private handleEnemyAttacks(attack: Attack, area: Area) {
    area.characters.forEach((character) => attack.hit(character));
  }
  private handleAreaAttacks(area: Area, dt: number) {
    if (area.attacks.length <= 0) return;
    area.attacks.forEach((attack) => {
      attack.update(dt);
      if (attack.source === 'player') {
        this.handlePlayerAttacks(attack, area);
      } else if (attack.source === 'enemy') {
        console.log(area);
        this.handleEnemyAttacks(attack, area);
      }
    });
  }
  private handleEnemyProjectile(projectile: Projectile, area: Area) {
    area.characters.forEach((character) => projectile.hit(character));
  }
  private handlePlayerProjectile(projectile: Projectile, area: Area) {
    area.enemies.forEach((enemy) => projectile.hit(enemy));
  }
  private handleAreaProjectiles(area: Area, dt: number) {
    if (area.projectiles.length <= 0) return;
    area.projectiles.forEach((proj) => {
      proj.update(dt);
      if (proj.didHit) return;
      if (proj.source === 'character') {
        this.handlePlayerProjectile(proj, area);
      } else if (proj.source === 'enemy') {
        this.handleEnemyProjectile(proj, area);
      }
    });
  }

  private getAdjacentAreas(area: Area): Area[] {
    const dirs = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    const neighbors: Area[] = [];

    dirs.forEach(([dr, dc]) => {
      const r = area.row + dr;
      const c = area.column + dc;
      if (r >= 0 && r < this.vertical && c >= 0 && c < this.horizontal) {
        neighbors.push(this.grid[r][c]);
      }
    });

    return neighbors;
  }

  caharacterIsInRange(area: Area): boolean {
    return this.getAdjacentAreas(area).some((adj) => adj.characters.length > 0);
  }

  private setAreaEntitiesStates(area: Area, dt: number) {
    area.enemies.forEach((e) => {
      e.update(dt, this);
      if (this.grid[area.row][area.column - e.range].characters.length) {
        e.setAttack();
      } else {
        e.setDefaultAction();
      }
    });
    area.characters.forEach((c) => {
      c.update(dt);
    });
  }
  update(dt: number) {
    this.registerEntitiesToArea();
    this.grid.forEach((row) =>
      row.forEach((area) => {
        this.handleAreaAttacks(area, dt);
        this.handleAreaProjectiles(area, dt);
        this.setAreaEntitiesStates(area, dt);
      }),
    );
    this.cleanup();
  }
  cleanup() {
    this.grid.forEach((row) => row.forEach((area) => area.cleanup()));
  }
  getEnemies() {
    return this.grid.flat().flatMap((area) => [...area.enemies]);
  }
  getProjectiles() {
    return this.grid.flat().flatMap((area) => [...area.projectiles]);
  }
  getCharacters() {
    return this.grid.flat().flatMap((area) => [...area.characters]);
  }
  getParty() {
    const getCharacter = (area: Area) =>
      area.characters.length > 0 ? area.characters[0] : null;
    return {
      pos1: getCharacter(this.grid[2][3]),
      pos2: getCharacter(this.grid[2][2]),
      pos3: getCharacter(this.grid[2][1]),
      pos4: getCharacter(this.grid[2][0]),
    };
  }
  addEnemies(row: number, col: number, enemies: Enemy<EnemyAction>[]) {
    if (row >= this.vertical || col >= this.horizontal) return;
    enemies.forEach((enemy) => {
      const area = this.grid[row][col];
      enemy.rect = {
        ...enemy.rect,
        x: area.rect.x + area.width / 2 - enemy.rect.width / 2,
        y: area.rect.y + area.height / 2 - enemy.rect.height / 2,
      };
      area.registerEntity(enemy);
    });
  }
}
