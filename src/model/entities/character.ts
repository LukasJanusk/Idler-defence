import type { Attributes, Rect, Skill, SpriteAnimations } from '@/types';
import {
  createFireWizardFireballAttack,
  createFireWizardFlameJetAttack,
  createFireWizardStabAttack,
} from '../characterAttacks/fireWizardAttacks';
import { type Grid } from '../grid';
import { GRID_AREA_SIZE } from '@/constants';
import { FireMageSkills } from './skills/fireMageSkills';
import { wizardSkills } from './skills/wizardSkills';
import { lightningMageSkills } from './skills/LightningMageSkills';
import { KnightSkills } from './skills/knightSkills';

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
  pos: 'pos1' | 'pos2' | 'pos3' | 'pos4' | null = null;
  attributes: Attributes;
  skills: Skill[] = [];
  className = 'Hero';

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
    this.attributes = {
      strength: 10,
      dexterity: 10,
      intelligence: 10,
      vitality: 10,
    };
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

    this.animations['death'].onFrame(
      this.animations.death.nFrame - 1,
      () => (this.state = 'dead'),
    );
    this.animations['resurrect'].onFrame(
      this.animations.resurrect.nFrame - 1,
      () => (this.state = 'idle'),
    );
    this.attributes = {
      strength: 20,
      dexterity: 15,
      intelligence: 10,
      vitality: 10,
    };
    this.skills = KnightSkills;
  }
  initAttacks(grid: Grid) {
    console.log('warrior attacks init', grid);
  }
}

export class FireMage extends Character<FireMageAction> {
  characterClass = 'Fire Mage';
  icon = '🔥';
  stunRecovery = 400;
  attacksLoaded: boolean = false;
  actions: FireMageAction[];

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
    this.actions = actions;
    this.animations['death'].onFrame(this.animations.death.nFrame, () => {
      console.log('On Death trigger');
    });
    this.animations['resurrect'].onFrame(
      this.animations.resurrect.nFrame - 1,
      () => (this.state = 'idle'),
    );
    this.attributes = {
      strength: 10,
      dexterity: 15,
      intelligence: 20,
      vitality: 10,
    };
    this.skills = FireMageSkills;
  }
  initAttacks(grid: Grid) {
    if (this.attacksLoaded === true) return;
    if (!this.pos) {
      console.warn(`${this.name} tried to initAttacks without pos set`);
      return;
    }
    this.animations.attack.onFrame(3, () => {
      const attack = createFireWizardStabAttack(this.rect.x, this.rect.y, 1);
      attack.rect.x = this.rect.x + attack.range * GRID_AREA_SIZE;
      if (this.pos !== 'pos1') return;
      grid.grid[3][4].registerEntity(attack);
    });
    const createJet = () => {
      const attack = createFireWizardFlameJetAttack(
        this.rect.x,
        this.rect.y,
        1,
      );
      attack.rect.x = this.rect.x + attack.range * GRID_AREA_SIZE;
      if (this.pos !== 'pos1') return;
      grid.grid[3][4].registerEntity(attack);
    };
    this.animations.flamejet.onFrame(3, createJet);
    this.animations.flamejet.onFrame(4, createJet);
    this.animations.flamejet.onFrame(5, createJet);
    this.animations.fireball.onFrame(6, () => {
      const projectile = createFireWizardFireballAttack(
        this.rect.x + GRID_AREA_SIZE,
        this.rect.y,
        1,
      );

      switch (this.pos) {
        case 'pos1':
          grid.grid[3][4].registerEntity(projectile);
          return;
        case 'pos2':
          grid.grid[3][3].registerEntity(projectile);
          return;
        case 'pos3':
          grid.grid[3][2].registerEntity(projectile);
          return;
        case 'pos4':
          grid.grid[3][1].registerEntity(projectile);
          return;
        default:
          return;
      }
    });
    this.attacksLoaded = true;
  }
}

export class Knight extends Character<KnightAction> {
  characterClass: string = 'Knight';
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
    this.animations['death'].onFrame(
      this.animations.death.nFrame - 1,
      () => (this.state = 'dead'),
    );
    this.animations['resurrect'].onFrame(
      this.animations.resurrect.nFrame - 1,
      () => (this.state = 'idle'),
    );
    this.attributes = {
      strength: 15,
      dexterity: 10,
      intelligence: 20,
      vitality: 10,
    };
    this.skills = KnightSkills;
  }
  initAttacks(grid: Grid) {
    console.log('Knight attacks init', grid);
  }
}
export class Wizard extends Character<WizardAction> {
  characterClass: string = 'Wizard';
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
    this.animations['death'].onFrame(
      this.animations.death.nFrame - 1,
      () => (this.state = 'dead'),
    );
    this.animations['resurrect'].onFrame(
      this.animations.resurrect.nFrame - 1,
      () => (this.state = 'idle'),
    );
    this.attributes = {
      strength: 10,
      dexterity: 10,
      intelligence: 25,
      vitality: 10,
    };
    this.skills = wizardSkills;
  }
  initAttacks(grid: Grid) {
    console.log('Wizard attacks init', grid);
  }
}
export class LightningMage extends Character<LightningMageAction> {
  characterClass: string = 'Lightning mage';
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
    this.animations['death'].onFrame(
      this.animations.death.nFrame - 1,
      () => (this.state = 'dead'),
    );
    this.animations['resurrect'].onFrame(
      this.animations.resurrect.nFrame - 1,
      () => (this.state = 'idle'),
    );
    this.attributes = {
      strength: 15,
      dexterity: 15,
      intelligence: 15,
      vitality: 10,
    };
    this.skills = lightningMageSkills;
  }
  initAttacks(grid: Grid) {
    console.log('Lightning Mage attacks init', grid);
  }
}
