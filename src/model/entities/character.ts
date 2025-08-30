import type {
  Attribute,
  Attributes,
  Rect,
  Skill,
  SpriteAnimations,
} from '@/types';
import { initFireWizardAttacks } from '../characterAttacks/fireWizardAttacks';
import { Animation } from '../animations/animation';
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
import { defaultSettings } from '@/defaults';
import { initKnightAttacks } from '../characterAttacks/knightAttacks';
import type { Debuff } from './debuff';
import type { Buff } from './buff';
import { initWizardAttacks } from '../characterAttacks/wizardAttacks';
import { initLightningMageAttacks } from '../characterAttacks/lightningMageAttacks';

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
export type LightningMageAction = BaseAction | 'chargedBolts' | 'discharge';
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

export abstract class Character<T extends string> {
  id: string;
  name: string;
  health: number = 100;
  maxHealth: number = 100;
  energy: number = 100;
  maxEnergy: number = 100;
  animations: SpriteAnimations<T>;
  actions: T[];
  state: T;
  stunRecovery: number = 200;
  characterClass: string = 'base';
  icon: string = '👤';
  availableAttributes: number = 0;
  level: number = 1;
  experience: number = 222220;
  experienceToNext = 100;
  rect: Rect = { x: 0, y: 0, width: 128, height: 128 };
  pos: 'pos1' | 'pos2' | 'pos3' | 'pos4' | null = null;
  attributes: Attributes;
  skills: Skill[] = [];
  className = 'Hero';
  armor: number = 0;
  healthRecovery = 0.1;
  energyRecovery = 0.1;
  lastAction: null | T = null;
  price: number = 0;
  automate = defaultSettings.automateSkillCast;
  debuffs: Set<Debuff> = new Set();
  buffs: Set<Buff> = new Set();

  private elapsed = 0;
  private interval = UPDATE_RATE;

  abstract initSkillCost(): void;

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
    this.price = 200 + (this.level - 1) * 100;
    this.health = this.maxHealth;
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
  setAutomate(automate: boolean) {
    this.automate = automate;
  }
  registerBuff(buff: Buff) {
    if (Array.from(this.buffs).some((b) => b.id === buff.id)) return;
    this.buffs.add(buff);
    if (buff.effect.armor) this.armor += buff.effect.armor;
    if (buff.effect.damage) {
      this.skills.forEach((skill) => {
        if (skill.damage) {
          skill.damage += buff.effect.damage!;
        }
      });
    }
    if (buff.effect.speed) {
      const keys = Object.keys(this.animations);
      keys.forEach(
        (key) =>
          (this.animations[key as T].frameDuration -= buff.effect.speed!),
      );
    }
    if (buff.effect.healthRecovery)
      this.healthRecovery += buff.effect.healthRecovery;
    if (buff.effect.energyRecovery)
      this.energyRecovery += buff.effect.energyRecovery;
  }
  registerDebuff(debuff: Debuff) {
    if (Array.from(this.debuffs).some((db) => db.id === debuff.id)) return;
    this.debuffs.add(debuff);
    if (debuff.effect.armor) this.armor += debuff.effect.armor;
    if (debuff.effect.damage) {
      this.skills.forEach((skill) => {
        if (skill.damage) {
          skill.damage -= debuff.effect.damage!;
        }
      });
    }
    if (debuff.effect.speed) {
      const keys = Object.keys(this.animations);
      keys.forEach(
        (key) =>
          (this.animations[key as T].frameDuration += debuff.effect.speed!),
      );
    }
    if (debuff.effect.healthRecovery)
      this.healthRecovery -= debuff.effect.healthRecovery;
    if (debuff.effect.energyRecovery)
      this.energyRecovery -= debuff.effect.energyRecovery;
  }
  updateBuffs(dt: number) {
    const toRemove: Buff[] = [];
    this.buffs.forEach((buff) => {
      buff.update(dt);
      if (buff.elapsed >= buff.duration) {
        if (buff.effect.armor) this.armor -= buff.effect.armor;
        if (buff.effect.damage) {
          this.skills.forEach((skill) => {
            if (skill.damage) {
              skill.damage -= buff.effect.damage!;
            }
          });
        }
        if (buff.effect.speed) {
          Object.values(this.animations).forEach(
            (animation) =>
              ((animation as Animation).frameDuration -= buff.effect.speed!),
          );
        }
        if (buff.effect.healthRecovery)
          this.healthRecovery -= buff.effect.healthRecovery;
        if (buff.effect.energyRecovery)
          this.energyRecovery -= buff.effect.energyRecovery;

        toRemove.push(buff);
      }
    });
    toRemove.forEach((b) => this.buffs.delete(b));
  }
  updateDebuffs(dt: number) {
    const toRemove: Debuff[] = [];
    this.debuffs.forEach((db) => {
      db.elapsed += dt;

      if (db.elapsed >= db.duration) {
        if (db.effect.armor) this.armor -= db.effect.armor;
        if (db.effect.damage) {
          this.skills.forEach((skill) => {
            if (skill.damage) {
              skill.damage += db.effect.damage!;
            }
          });
        }
        if (db.effect.speed) {
          Object.values(this.animations as Animation).forEach(
            (animation) => (animation.frameDuration -= db.effect.speed!),
          );
        }
        if (db.effect.healthRecovery)
          this.healthRecovery -= db.effect.healthRecovery;

        toRemove.push(db);
      }
    });

    toRemove.forEach((b) => this.debuffs.delete(b));
  }
  levelUp() {
    this.level += 1;
    this.experience -= this.experienceToNext;
    this.experienceToNext += 100;
    this.availableAttributes += 1;
  }
  spendAttribute(attribute: Attribute) {
    this.attributes[attribute] += 1;
    this.availableAttributes -= 1;
    this.initAttributes();
  }
  initAttributes() {
    this.energy = this.attributes.intelligence * 10;
    this.maxHealth = this.attributes.vitality * 10;
    this.maxEnergy = this.attributes.intelligence * 10;
    this.energyRecovery = this.attributes.intelligence * 0.0025;
    this.healthRecovery = this.attributes.vitality * 0.0025;
    this.actions.forEach(
      (action) =>
        (this.animations[action].frameDuration =
          this.animations[action].baseDuration - this.attributes.dexterity),
    );
    this.skills.forEach((skill) => {
      if (skill.damage > 0) {
        const multiplier = (100 + this.attributes.strength) / 100;
        skill.damage = skill.baseDamage * multiplier;
      }
      this.actions.forEach((action) => {
        if (action === skill.action) {
          const frames = this.animations[action].nFrame;
          const frameDuration = this.animations[action].frameDuration;
          skill.duration = Number(((frames * frameDuration) / 1000).toFixed(2));
        }
      });
    });
    Object.keys(this.animations).forEach((key) => {
      const animation = this.animations[key as T];
      if (animation.frameDuration < 20) {
        animation.frameDuration = 20;
      }
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
      this.automate &&
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
      this.updateBuffs(dt);
      this.updateDebuffs(dt);
      if (this.experience >= this.experienceToNext) this.levelUp();
    }
  }
}

export class Warrior extends Character<WarriorAction> {
  characterClass = 'Warrior';
  icon = '⚔️';
  stunRecovery = 100;
  armor = 10;
  health: number = 150;
  maxHealth: number = 150;

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
      strength: 15,
      dexterity: 15,
      intelligence: 10,
      vitality: 15,
    };
    this.skills = KnightSkills;
  }
  initSkillCost() {
    console.log('Warrior init Skill const not implemented');
  }
  initAttacks(grid: Grid) {
    console.log('Warrior attacks not implemented', grid);
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
  initSkillCost() {
    this.animations.idle.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
    this.animations.attack.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
    this.animations.fireball.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
    this.animations.flamejet.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
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
  attacksLoaded: boolean = false;
  armor = 20;
  health: number = 200;
  maxHealth: number = 200;

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
  initSkillCost() {
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
  initAttacks(grid: Grid) {
    console.log('Knight attacks init', grid);
    initKnightAttacks(grid, this);
  }

  update(dt: number) {
    this.armor = 20;

    if (this.state === 'protect') {
      this.armor = this.getCurrentSkill()?.armor || 50;
    }
    super.update(dt);
  }
}
export class Wizard extends Character<WizardAction> {
  characterClass: string = 'Wizard';
  icon = '🧙';
  stunRecovery = 400;
  health: number = 100;
  maxHealth: number = 100;
  attacksLoaded = false;
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
  initSkillCost() {
    this.animations.idle.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
    this.animations.magicArrow.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
    this.animations.magicBall.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
    this.animations.magicSphere.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
  }
  initAttacks(grid: Grid) {
    initWizardAttacks(grid, this);
  }
}
export class LightningMage extends Character<LightningMageAction> {
  characterClass: string = 'Lightning mage';
  icon = '⚡';
  stunRecovery = 400;
  health: number = 100;
  maxHealth: number = 100;
  attacksLoaded = false;
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
      'discharge',
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
  initSkillCost() {
    this.animations.idle.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
    this.animations.attack.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
    this.animations.chargedBolts.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
    this.animations.discharge.onFrame(0, () => {
      this.energy -= this.getCurrentSkill()?.cost || 0;
    });
  }

  initAttacks(grid: Grid) {
    initLightningMageAttacks(grid, this);
  }
}
