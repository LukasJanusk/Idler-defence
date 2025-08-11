import { v4 } from 'uuid';
import type { AnyCharacter, Rect } from './types';
import { Projectile } from './projectile';
import { FireMage, Knight, LightningMage, Warrior, Wizard } from './character';
import { getRectMiddle } from './utils';

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
class Area {
  id: string;
  width: number;
  height: number;
  row: number;
  column: number;
  rect: Rect = { x: 0, y: 0, width: 0, height: 0 };
  characters: Array<AnyCharacter> = [];
  enemies: Array<unknown> = [];
  projectiles: Array<Projectile> = [];
  attacks: Array<unknown> = [];

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
    }
    return false;
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
    throw Error('Not yet implemented');
  }
  cleanup() {
    throw Error('Not yet implemented');
  }
}
