import { Animation } from './animation';

export type SpriteAnimations<T extends string> = Record<T, Animation>;
export type BaseActions = 'idle' | 'attack' | 'hit' | 'death';
export type WarriorActions = BaseActions | 'combo';

export type CharacterActions = BaseActions | WarriorActions;
