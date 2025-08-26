import type { Dispatch } from 'react';
import { Animation } from '@/model/animations/animation';
import type {
  AnyAction,
  FireMage,
  FireMageAction,
  Knight,
  KnightAction,
  Warrior,
  WarriorAction,
  Wizard,
  WizardAction,
  LightningMage,
  LightningMageAction,
  EnemyAction,
} from './model/entities/character';
import type { GameReducerAction } from './gameReducer';
import type { Projectile } from './model/entities/projectile';
import type { Grid } from './model/grid';
import type { Particle } from './model/entities/particles';
import type { GameClock } from './model/gameClock';
import type { Enemy } from './model/entities/enemy';

export type Rect = { x: number; y: number; width: number; height: number };
export type SpriteAnimations<T extends string> = Record<T, Animation>;
export type PartyPositionName = 'pos1' | 'pos2' | 'pos3' | 'pos4';
export type Skill = {
  id: string;
  name: string;
  description: string;
  url: string;
  damage: number;
  duration: number;
  speed: number;
  action: AnyAction;
  level: number;
};
export type Attributes = {
  strength: number;
  dexterity: number;
  intelligence: number;
  vitality: number;
};
export type WarriorCharacter = Warrior & CharacterBase<WarriorAction>;
export type FireMageCharacter = FireMage & CharacterBase<FireMageAction>;
export type WizardCharacter = Wizard & CharacterBase<WizardAction>;
export type KnightCharacter = Knight & CharacterBase<KnightAction>;
export type LightningMageCharacter = LightningMage &
  CharacterBase<LightningMageAction>;
export type AnyCharacter =
  | WarriorCharacter
  | FireMageCharacter
  | WizardCharacter
  | KnightCharacter
  | LightningMageCharacter;
type Party = {
  pos1: AnyCharacter | null;
  pos2: AnyCharacter | null;
  pos3: AnyCharacter | null;
  pos4: AnyCharacter | null;
};
type CharacterBase<A extends AnyAction> = {
  state: A;
  actions: A[];
  animations: SpriteAnimations<A>;
};

export type GameState = {
  party: Party;
  projectiles: Projectile[];
  availableCharacters: Set<AnyCharacter>;
};
export type PartyPosition = {
  name: PartyPositionName;
  rect: Rect;
};

export type GameContextType = {
  state: GameState;
  dispatch: Dispatch<GameReducerAction>;
};

export type GameStore = {
  gameClock: GameClock;
  party: Party;
  selectedPosition: null | PartyPositionName;
  grid: Grid;
  particles: Particle[];
  availableCharacters: Set<AnyCharacter>;
  gold: number;
  score: number;

  // actions

  addCharacterToParty: (pos: PartyPositionName, id: string) => void;
  removeCharacterFromParty: (pos?: PartyPositionName) => void;
  moveCharacter: (from: PartyPositionName, to: PartyPositionName) => void;
  updateCharacterState: (
    position: PartyPositionName,
    patch: Partial<AnyCharacter>,
  ) => void;
  getGameClock: () => GameClock;
  selectPosition: (pos: PartyPositionName) => void;
  getEnemies: () => Enemy<EnemyAction>[];
};
