import type { Grid } from '../grid';

export class Buff {
  id: string;
  didHit: boolean;
  source: 'player' | 'enemy';
  duration: number;
  elapsed: number = 0;

  effect: {
    healthRecovery?: number;
    energyRecovery?: number;
    armor?: number;
    speed?: number;
    damage?: number;
  } = {};

  constructor(
    id: string,

    source: 'player' | 'enemy',
    effect: {
      healthRecovery?: number;
      energyRecovery?: number;
      armor?: number;
      speed?: number;
      damage?: number;
    },
    duration: number,
  ) {
    this.id = id;
    this.source = source;
    this.didHit = false;
    this.effect = effect;
    this.duration = duration || 5000;
  }
  update(dt: number) {
    this.elapsed += dt;
  }
  static registerBuffToPlayers(grid: Grid, buff: Buff) {
    const characters = grid.getCharacters();
    characters.forEach((char) => char.registerBuff(buff));
  }
}
