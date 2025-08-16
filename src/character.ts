import type { Rect, SpriteAnimations } from './types';

export type BaseAction =
  | 'idle'
  | 'attack'
  | 'hit'
  | 'death'
  | 'dead'
  | 'resurrect';
export type EnemyAction = BaseAction | 'move';
export type WarriorAction = BaseAction | 'combo';
export type KnightAction = BaseAction | 'guard' | 'protect';
export type FireMageAction = BaseAction | 'flamejet' | 'fireball';
export type LightningMageAction = BaseAction | 'chargedBolts';
export type WizardAction =
  | 'idle'
  | 'hit'
  | 'death'
  | 'dead'
  | 'resurrect'
  | 'magicArrow'
  | 'magicBall'
  | 'magicSphere';

export type AnyAction =
  | WarriorAction
  | FireMageAction
  | WizardAction
  | KnightAction
  | LightningMageAction
  | EnemyAction;

export class Character<T extends string> {
  id: string;
  name: string;
  health: number = 2000;
  animations: SpriteAnimations<T>;
  actions: T[];
  state: T;
  stunRecovery: number = 200;
  characterClass: string = 'base';
  icon: string = '👤';
  rect: Rect = { x: 0, y: 0, width: 128, height: 128 };

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

export class Warrior extends Character<WarriorAction> {
  characterClass = 'Warrior';
  icon = '⚔️';
  stunRecovery = 100;

  constructor(
    id: string,
    name: string,
    animations: SpriteAnimations<WarriorAction>,
    actions: WarriorAction[] = [
      'idle',
      'attack',
      'hit',
      'death',
      'dead',
      'resurrect',
      'combo',
    ],
  ) {
    super(id, name, animations, actions);
  }
}

export class FireMage extends Character<FireMageAction> {
  characterClass = 'Fire Mage';
  icon = '🔥';
  stunRecovery = 400;

  constructor(
    id: string,
    name: string,
    animations: SpriteAnimations<FireMageAction>,
    actions: FireMageAction[] = [
      'idle',
      'attack',
      'hit',
      'death',
      'resurrect',
      'fireball',
      'flamejet',
    ],
  ) {
    super(id, name, animations, actions);
  }
}

export class Knight extends Character<KnightAction> {
  characterClass: 'Knight';
  icon = '🛡️';
  stunRecovery = 100;

  constructor(
    id: string,
    name: string,
    animations: SpriteAnimations<KnightAction>,
    actions: KnightAction[] = [
      'idle',
      'attack',
      'hit',
      'death',
      'dead',
      'resurrect',
      'guard',
      'protect',
    ],
  ) {
    super(id, name, animations, actions);
  }
}
export class Wizard extends Character<WizardAction> {
  characterClass: 'Wizard';
  icon = '🧙';
  stunRecovery = 400;
  constructor(
    id: string,
    name: string,
    animations: SpriteAnimations<WizardAction>,
    actions: WizardAction[] = [
      'idle',
      'hit',
      'death',
      'resurrect',
      'magicArrow',
      'magicBall',
      'magicSphere',
    ],
  ) {
    super(id, name, animations, actions);
  }
}
export class LightningMage extends Character<LightningMageAction> {
  characterClass: 'Lightning mage';
  icon = '⚡';
  stunRecovery = 400;
  constructor(
    id: string,
    name: string,
    animations: SpriteAnimations<LightningMageAction>,
    actions: LightningMageAction[] = [
      'idle',
      'hit',
      'death',
      'resurrect',
      'chargedBolts',
      'attack',
    ],
  ) {
    super(id, name, animations, actions);
  }
}
