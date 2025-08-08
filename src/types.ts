import type { Dispatch } from 'react';
import { Animation } from './animation';
import type { Character } from './character';
import type { GameReducerAction } from './gameReducer';

export type Rect = { x: number; y: number; width: number; height: number };
export type SpriteAnimations<T extends string> = Record<T, Animation>;
export type BaseActions =
  | 'idle'
  | 'attack'
  | 'hit'
  | 'death'
  | 'dead'
  | 'resurrect';
export type WarriorActions = BaseActions | 'combo';
export type CharacterActions = BaseActions | WarriorActions;
export type PartyPositionName = 'pos1' | 'pos2' | 'pos3' | 'pos4';
type Party = {
  pos1: Character<CharacterActions> | null;
  pos2: Character<CharacterActions> | null;
  pos3: Character<CharacterActions> | null;
  pos4: Character<CharacterActions> | null;
};
export type PartyPosition = {
  name: PartyPositionName;
  rect: Rect;
};

export type GameState = {
  party: Party;
  availableCharacters: Character<CharacterActions>[];
};

export type GameContextType = {
  state: GameState;
  dispatch: Dispatch<GameReducerAction>;
};
