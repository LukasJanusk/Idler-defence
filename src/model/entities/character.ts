import type { Attributes, Rect, Skill, SpriteAnimations } from '@/types';
import { initFireWizardAttacks } from '../characterAttacks/fireWizardAttacks';
import { type Grid } from '../grid';
import { UPDATE_RATE } from '@/constants';
import { FireMageSkills } from './skills/fireMageSkills';
import { wizardSkills } from './skills/wizardSkills';
import { lightningMageSkills } from './skills/LightningMageSkills';
import { KnightSkills } from './skills/knightSkills';
import { setupDeathResurrect } from '@/utils';
import { createFireMageAnimations } from '../animations/fireWizardAnimations';
import { createKnightAnimations } from '../animations/knightAnimations';
import { createLightningMageAnimations } from '../animations/lightningMageAnimations';
import { createWizardAnimations } from '../animations/wizardAnimations';

const AUTOMATE = true;
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

export type CharacterAction =
  | WarriorAction
  | FireMageAction
  | WizardAction
  | KnightAction
  | LightningMageAction;

export class Character<T extends string> {
  id: string;
  name: string;
  health: number = 0;
  maxHealth: number = 100;
  energy: number = 0;
  maxEnergy: number = 100;
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
  healthRecovery = 0.1;
  energyRecovery = 0.1;
  lastAction: null | T = null;
  private AUTOMATE = false;

  private elapsed = 0;
  private interval = UPDATE_RATE;

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
  isDead() {
    return this.state === 'dead';
  }
  isDeath() {
    return this.state === 'death';
  }
  getCurrentSkill() {
    return this.skills.find((skill) => skill.action === this.state);
  }
  setAutomate() {
    this.AUTOMATE = !this.AUTOMATE;
  }
  initAttributes() {
    this.health = this.attributes.vitality * 10;
    this.energy = this.attributes.intelligence * 10;
    this.maxHealth = this.attributes.vitality * 10;
    this.maxEnergy = this.attributes.intelligence * 10;
    this.energyRecovery = this.attributes.intelligence * 0.01;
    this.healthRecovery = this.attributes.vitality * 0.01;
    this.actions.forEach(
      (action) =>
        (this.animations[action].frameDuration -= this.attributes.dexterity),
    );
    this.skills.forEach((skill) => {
      if (skill.damage > 0) {
        const multiplier = (100 + this.attributes.strength) / 100;
        skill.damage *= multiplier;
      }
      this.actions.forEach((action) => {
        if (action === skill.action) {
          const frames = this.animations[action].nFrame;
          const frameDuration = this.animations[action].frameDuration;
          skill.duration = Number(((frames * frameDuration) / 1000).toFixed(2));
        }
      });
    });
  }
  updateHealth(ticks: number) {
    if (this.health <= 0) {
      this.state = 'death' as T;
      this.health = 0;
      return;
    }
    this.health = Math.min(
      this.health + ticks * this.healthRecovery,
      this.maxHealth,
    );

    this.health = Math.max(this.health, 0);
  }
  updateEnergy(ticks: number) {
    if (this.isDead() || this.isDeath()) return;
    this.energy = Math.min(
      this.energy + ticks * this.energyRecovery,
      this.maxEnergy,
    );
    this.energy = Math.max(this.energy, 0);
  }
  useLastAction() {
    if (
      AUTOMATE &&
      this.lastAction &&
      this.skills.some((s) => s.action === this.lastAction)
    ) {
      if (this.isDead() || this.isDeath()) return;
      const action = this.skills.find((s) => s.action === this.lastAction);
      if (action) {
        this.state = action.action as T;
        this.lastAction = null;
      }
    }
  }
  setLastAction() {
    const skill = this.getCurrentSkill();

    if (!skill) return;
    if (this.energy <= skill.cost) {
      this.lastAction = this.state;
      this.state = 'idle' as T;
    }
  }
  update(dt: number) {
    if (this.isDead() || this.isDeath()) return;
    this.elapsed += dt;
    if (this.elapsed >= this.interval) {
      const ticks = Math.floor(this.elapsed / this.interval);
      this.elapsed %= this.interval;
      this.updateHealth(ticks);
      this.updateEnergy(ticks);
      this.useLastAction();
      this.setLastAction();
    }
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
    setupDeathResurrect(
      this.animations.death,
      this.animations.resurrect,
      (state) => (this.state = state),
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
    animations: SpriteAnimations<FireMageAction> = createFireMageAnimations(),
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
    setupDeathResurrect(
      this.animations.death,
      this.animations.resurrect,
      (state) => (this.state = state),
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
    initFireWizardAttacks(grid, this);
  }
}

export class Knight extends Character<KnightAction> {
  characterClass: string = 'Knight';
  icon = '🛡️';
  stunRecovery = 100;

  constructor(
    id: string,
    name: string,
    animations: SpriteAnimations<KnightAction> = createKnightAnimations(),
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
    setupDeathResurrect(
      this.animations.death,
      this.animations.resurrect,
      (state) => (this.state = state),
    );
    this.attributes = {
      strength: 15,
      dexterity: 10,
      intelligence: 10,
      vitality: 20,
    };
    this.skills = KnightSkills;
  }
  initAttacks(grid: Grid) {
    console.log('Knight attacks init', grid);
    this.animations.idle.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
    this.animations.attack.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
    this.animations.guard.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
    this.animations.protect.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
  }
}
export class Wizard extends Character<WizardAction> {
  characterClass: string = 'Wizard';
  icon = '🧙';
  stunRecovery = 400;
  constructor(
    id: string,
    name: string,
    animations: SpriteAnimations<WizardAction> = createWizardAnimations(),
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

    setupDeathResurrect(
      this.animations.death,
      this.animations.resurrect,
      (state) => (this.state = state),
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
    animations: SpriteAnimations<LightningMageAction> = createLightningMageAnimations(),
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
    setupDeathResurrect(
      this.animations.death,
      this.animations.resurrect,
      (state) => (this.state = state),
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
