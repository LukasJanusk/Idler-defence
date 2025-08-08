import type {
  CharacterActions,
  SpriteAnimations,
  WarriorActions,
} from './types';

export class Attributes {
  damage: number;
  health: number;
  energy: number;
  speed: number;

  constructor(damage: number, health: number, energy: number, speed: number) {
    this.damage = damage;
    this.health = health;
    this.energy = energy;
    this.speed = speed;
  }
}

export class Character<T extends CharacterActions> {
  id: string;
  name: string;
  animations: SpriteAnimations<T>;
  actions: T[];
  state: T;
  stunRecovery: number = 200;
  class: string = 'base';
  icon: string = '👤';

  constructor(
    id: string,
    name: string,
    animations: SpriteAnimations<T>,
    actions: T[],
  ) {
    this.id = id;
    this.name = name;
    this.animations = animations;
    this.actions = actions;
    this.state = actions[0];
  }
}

export class Warrior extends Character<WarriorActions> {
  class = 'Warrior';
  icon: string = '⚔️';

  constructor(
    id: string,
    name: string,
    animations: SpriteAnimations<CharacterActions>,
    actions: WarriorActions[] = ['idle', 'attack', 'hit', 'death', 'combo'],
  ) {
    super(id, name, animations, actions);
  }
}
