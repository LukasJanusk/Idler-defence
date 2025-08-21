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
} from './model/entities/character';
import type { GameReducerAction } from './gameReducer';
import type { Projectile } from './model/entities/projectile';

export type Rect = { x: number; y: number; width: number; height: number };
export type SpriteAnimations<T extends string> = Record<T, Animation>;
export type PartyPositionName = 'pos1' | 'pos2' | 'pos3' | 'pos4';

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
  availableCharacters: Array<AnyCharacter>;
};
export type PartyPosition = {
  name: PartyPositionName;
  rect: Rect;
};

export type GameContextType = {
  state: GameState;
  dispatch: Dispatch<GameReducerAction>;
};
