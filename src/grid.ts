import { v4 } from 'uuid';
import type { AnyCharacter, Rect } from './types';
import { Projectile } from './projectile';
import { FireMage, Knight, LightningMage, Warrior, Wizard } from './character';
import { getRectMiddle } from './utils';
import { Enemy } from './enemy';
import { Attack } from './attack';

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

const isEnemy = (entity: unknown): entity is Enemy => {
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
  enemies: Array<Enemy> = [];
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
      this.characters.push(entity);
      return true;
    } else if (isProjectile(entity)) {
      this.projectiles.push(entity);
      return true;
    } else if (isEnemy(entity)) {
      this.enemies.push(entity);
      return true;
    } else if (isAttack(entity)) {
      this.attacks.push(entity);
      return true;
    }
    return false;
  }
  cleanup() {
    this.enemies = this.enemies.filter((e) => e.state !== 'dead');
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
  update() {
    this.grid.forEach((row) =>
      row.forEach((area) => {
        if (area.attacks.length === 0 && area.projectiles.length === 0) return;
        area.attacks.forEach((attack) => {
          if (attack.didHit) return;
          if (attack.source === 'player') {
            area.enemies.forEach((enemy) => attack.hit(enemy));
          } else if (attack.source === 'enemy') {
            area.characters.forEach((char) => attack.hit(char));
          }
        });
        area.projectiles.forEach((proj) => {
          if (proj.didHit) return;
          if (proj.source === 'player') {
            area.enemies.forEach((enemy) => proj.hit(enemy));
          } else if (proj.source === 'enemy') {
            area.characters.forEach((character) => proj.hit(character));
          }
        });
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
      }),
    );
  }
  cleanup() {
    this.grid.forEach((row) => row.forEach((area) => area.cleanup()));
  }
}
