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
class Area {
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
    // init rect for each area
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
  private moveEnemy(currentArea: Area) {
    currentArea.enemies.forEach((enemy) => {
      const newArea = this.getClosestArea(enemy.rect);
      if (newArea.id === currentArea.id) return;
      currentArea.unRegisterEnemy(enemy);
      newArea.registerEntity(enemy);
    });
  }
  private moveProjectile(currentArea: Area) {
    currentArea.projectiles.forEach((projectile) => {
      const newArea = this.getClosestArea(projectile.rect);
      if (newArea.id === currentArea.id) return;
      currentArea.unRegisterProjectile(projectile);
      newArea.registerEntity(projectile);
    });
  }
  private moveEntities() {
    this.grid.forEach((row) =>
      row.forEach((area) => {
        this.moveEnemy(area);
        this.moveProjectile(area);
      }),
    );
  }
  private handlePlayerAttacks(attack: Attack, area: Area) {
    area.enemies.forEach((enemy) => attack.hit(enemy));
  }
  private handleEnemyAttacks(attack: Attack, area: Area) {
    area.characters.forEach((character) => attack.hit(character));
  }
  private handleAreaAttacks(area: Area) {
    area.attacks.forEach((attack) => {
      if (attack.didHit) return;
      if (attack.source === 'player') {
        this.handlePlayerAttacks(attack, area);
      } else if (attack.source === 'enemy') {
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
  private handleAreaProjectiles(area: Area) {
    area.projectiles.forEach((proj) => {
      if (proj.didHit) return;
      if (proj.source === 'player') {
        this.handlePlayerProjectile(proj, area);
      } else if (proj.source === 'enemy') {
        this.handleEnemyProjectile(proj, area);
      }
    });
  }
  private setAreaEntitiesStates(area: Area) {
    area.enemies.forEach((e) => {
      if (e.health <= 0) {
        e.state = 'death';
      }
    });
    area.characters.forEach((c) => {
      if (c.health <= 0) {
        c.state = 'death';
      }
    });
  }
  update() {
    this.moveEntities();
    this.grid.forEach((row) =>
      row.forEach((area) => {
        if (area.attacks.length === 0 && area.projectiles.length === 0) return;
        this.handleAreaAttacks(area);
        this.handleAreaProjectiles(area);
        this.setAreaEntitiesStates(area);
      }),
    );
    this.cleanup();
  }
  cleanup() {
    this.grid.forEach((row) => row.forEach((area) => area.cleanup()));
  }
}
