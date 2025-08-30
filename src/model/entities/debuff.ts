export class Debuff {
  id: string;
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

    duration?: number,
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
}

export const createBurnDebuff = (dps: number, duration: number = 2000) => {
  const debuff = new Debuff(
    'Burn-' + Math.random(),
    'player',
    { healthRecovery: -0.02 * dps },
    duration,
  );
  return debuff;
};
export const createKnockbackDebuff = (
  stregth: number,
  duration: number = 500,
) => {
  const debuff = new Debuff(
    'Knockbnack-' + Math.random(),
    'player',
    { speed: -1 * stregth },
    duration,
  );
  return debuff;
};
