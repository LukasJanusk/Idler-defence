export class Debuff {
  id: string;
  range: number;
  didHit: boolean;
  source: 'player' | 'enemy';
  duration: number = 5000;
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
    range?: number,
    duration?: number,
  ) {
    this.id = id;
    this.source = source;
    this.range = range || 1;
    this.didHit = false;
    this.effect = effect;
    this.duration = duration || 5000;
  }
  update(dt: number) {
    this.elapsed += dt;
  }
}
