import { v4 } from 'uuid';
import type { AnyCharacter, PartyPositionName, Rect } from '@/types';
import { Projectile } from '@/model/entities/projectile';
import {
  FireMage,
  Knight,
  LightningMage,
  Warrior,
  Wizard,
  type EnemyAction,
} from './entities/character';
import { getRectMiddle, removeExpired } from '../utils';
import { Enemy } from './entities/enemy';
import { Attack } from './entities/attack';
import {
  Particle,
  splashArane,
  splashBlood,
  splashEmbers,
  splashHealth,
  splashMagic,
  splashSparks,
  type ParticleType,
} from './entities/particles';
import { MAXIMUM_PARTICLES, PARTY_POSITIO_ROW } from '@/constants';
import { defaultSettings as settings } from '@/defaults';

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
  projectiles: Set<Projectile> = new Set();
  attacks: Set<Attack> = new Set();

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
      entity.rect = { ...entity.rect, x: this.rect.x, y: this.rect.y };
      this.characters.push(entity);
      return true;
    } else if (isProjectile(entity)) {
      this.projectiles.add(entity);
      return true;
    } else if (isEnemy(entity)) {
      this.enemies.add(entity);
      return true;
    } else if (isAttack(entity)) {
      entity.rect = { ...entity.rect, x: this.rect.x, y: this.rect.y };
      this.attacks.add(entity);
      return true;
    }
    return false;
  }
  unRegisterEnemy(enemy: Enemy<EnemyAction>) {
    this.enemies.delete(enemy);
  }
  unRegisterProjectile(projectile: Projectile) {
    this.projectiles.delete(projectile);
  }
  unregisterCharacter() {
    this.characters = [];
  }
  getCharacter() {
    const character = this.characters[0];
    if (!character) return null;
    return character;
  }
  cleanup() {
    removeExpired(this.projectiles);
    removeExpired(this.attacks);
  }
  removeDeadEnemies() {
    for (const enemy of this.enemies) {
      if (enemy.state === 'dead') {
        this.unRegisterEnemy(enemy);
      }
    }
  }
  reset() {
    this.attacks.clear();
    this.projectiles.clear();
    this.enemies.clear();
    this.characters = [];
  }
}

export class Grid {
  grid: Area[][];
  horizontal: number;
  vertical: number;
  areaSize: number;
  particles: Particle[] = [];
  renderParticles: boolean = settings.drawParticles;

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
  setRenderParticles(render: boolean) {
    this.renderParticles = render;
  }
  generateParticles(type: ParticleType, x: number, y: number, n: number) {
    if (!this.renderParticles) return;
    switch (type) {
      case 'blood':
        return this.particles.push(...splashBlood(x, y, n));
      case 'ember':
        return this.particles.push(...splashEmbers(x, y, n));
      case 'arcane':
        return this.particles.push(...splashArane(x, y, n));
      case 'health':
        return this.particles.push(...splashHealth(x, y, n));
      case 'magic':
        return this.particles.push(...splashMagic(x, y, n));
      case 'spark':
        return this.particles.push(...splashSparks(x, y, n));
    }
  }
  updateAndDrawParticles(dt: number, ctx: CanvasRenderingContext2D) {
    if (!this.renderParticles) return;
    this.particles.forEach((p, index) => {
      p.update(dt);
      if (index <= MAXIMUM_PARTICLES) {
        p.draw(ctx);
      }
    });
  }
  getAllAreas() {
    return this.grid.flat().flat();
  }
  getColumn(index: number) {
    if (this.horizontal - 1 < index) return;
    return this.grid.map((row) => row[index]);
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
    if (area.attacks.size <= 0) return;
    area.attacks.forEach((attack) => {
      attack.update(dt);
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
  private handleAreaProjectiles(area: Area, dt: number) {
    if (area.projectiles.size <= 0) return;
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
      if (
        this.grid[area.row][area.column - e.range].characters.length &&
        this.grid[area.row][area.column - e.range].characters[0].state !==
          'dead'
      ) {
        e.setAttack();
      } else {
        e.setDefaultAction();
      }
    });
    area.characters.forEach((c) => {
      try {
        c.update(dt);
      } catch (err) {
        console.error('Failed updating character', c, err);
      }
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
    this.particles.filter(
      (p) =>
        p.x <= this.areaSize * this.horizontal &&
        p.y <= this.vertical * this.areaSize &&
        p.x > 0 &&
        p.y > 0 &&
        p.isAlive(),
    );
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
  getCharacterFromArea(area: Area) {
    return area.characters.length > 0 ? area.characters[0] : null;
  }
  getParty() {
    return {
      pos1: this.getCharacterFromArea(this.grid[PARTY_POSITIO_ROW][3]),
      pos2: this.getCharacterFromArea(this.grid[PARTY_POSITIO_ROW][2]),
      pos3: this.getCharacterFromArea(this.grid[PARTY_POSITIO_ROW][1]),
      pos4: this.getCharacterFromArea(this.grid[PARTY_POSITIO_ROW][0]),
    };
  }
  getAreaFromPos(pos: PartyPositionName, range: number = 0) {
    switch (pos) {
      case 'pos1':
        return range >= this.horizontal - 3
          ? null
          : this.grid[PARTY_POSITIO_ROW][3 + range];
      case 'pos2':
        return range >= this.horizontal - 2
          ? null
          : this.grid[PARTY_POSITIO_ROW][2 + range];
      case 'pos3':
        return range >= this.horizontal - 1
          ? null
          : this.grid[PARTY_POSITIO_ROW][1 + range];
      case 'pos4':
        return range >= this.horizontal
          ? null
          : this.grid[PARTY_POSITIO_ROW][0 + range];
    }
  }
  setCharacterToPosition(position: PartyPositionName, character: AnyCharacter) {
    const area = this.getAreaFromPos(position);
    if (!area) {
      console.error('Area out of bounds');
      return;
    }
    area.registerEntity(character);
  }
  getCharacterFromPosition(position: PartyPositionName) {
    switch (position) {
      case 'pos1':
        return this.getCharacterFromArea(this.grid[PARTY_POSITIO_ROW][3]);
      case 'pos2':
        return this.getCharacterFromArea(this.grid[PARTY_POSITIO_ROW][2]);
      case 'pos3':
        return this.getCharacterFromArea(this.grid[PARTY_POSITIO_ROW][1]);
      case 'pos4':
        return this.getCharacterFromArea(this.grid[PARTY_POSITIO_ROW][0]);
    }
  }
  removeCharactersFromPosition(position: PartyPositionName) {
    const area = this.getAreaFromPos(position);
    if (!area) {
      console.error('Area out of bounds');
      return;
    }
    const character = area.characters[0];
    if (!character) return null;
    area.characters = [];
    return character;
  }
  removeAllCharacters() {
    const areas = this.getAllAreas();
    areas.forEach((area) => area.unregisterCharacter());
  }
  reset() {
    this.particles = [];
    const areas = this.getAllAreas();
    areas.forEach((a) => a.reset());
  }
  moveCharacter(from: PartyPositionName, to: PartyPositionName) {
    const fromArea = this.getAreaFromPos(from);
    const toArea = this.getAreaFromPos(to);
    if (!fromArea || !toArea) {
      console.error('Area out of bounds');
      return;
    }
    const toCharacter = this.removeCharactersFromPosition(to);
    const fromCharacer = this.removeCharactersFromPosition(from);
    if (toCharacter) {
      fromArea.registerEntity(toCharacter);
      toCharacter.pos = from;
    }
    if (fromCharacer) {
      toArea.registerEntity(fromCharacer);
      fromCharacer.pos = to;
    }
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
  removeAllDeadEnemies() {
    this.getAllAreas().forEach((area) => area.removeDeadEnemies());
  }
}
