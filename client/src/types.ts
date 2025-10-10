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
import type { Projectile } from './model/entities/projectile';
import type { Grid } from './model/grid';
import type { GameClock } from './model/gameClock';
import type { LevelEvent, LevelEventHandler } from './model/levelEventHandler';
import type { CreateScore, Score, Highscores } from './schema/scoreSchema';

export type EnemyType =
  | 'zombieOne'
  | 'savageZombie'
  | 'fastZombie'
  | 'hungryZombie'
  | 'greenGorgon'
  | 'testEnemy';
export type CreateEnemyEventData = {
  enemyType: EnemyType;
  count: number;
  interval: number;
  startTime: number;
};
export type SkillLevelUpData = {
  baseDamage?: number;
  cost?: number;
  upgradeCost: number;
  charLevelRequirements?: number;
  armor?: number;
  speed?: number;
};
export type Attribute = 'strength' | 'dexterity' | 'vitality' | 'intelligence';
export type Rect = { x: number; y: number; width: number; height: number };
export type SpriteAnimations<T extends string> = Record<T, Animation>;
export type PartyPositionName = 'pos1' | 'pos2' | 'pos3' | 'pos4';
export type Skill<T extends string> = {
  id: string;
  name: string;
  description: string;
  url: string;
  baseDamage: number;
  damage: number;
  duration: number;
  speed: number;
  action: T;
  level: number;
  cost: number;
  multiplier: number;
  armor?: number;
  skillLevelUpData: SkillLevelUpData;
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
export type Settings = {
  automateSkillCast: boolean;
  showGrid: boolean;
  drawParticles: boolean;
  pause: boolean;
  showUi: boolean;
};
export type Level = {
  id: string;
  name: string;
  waves: Array<Set<LevelEvent>>;
};
export type GameStore = {
  gameClock: GameClock;
  selectedPosition: null | PartyPositionName;
  grid: Grid;
  availableCharacters: Set<AnyCharacter>;
  gold: number;
  score: number;
  gameOver: boolean;
  settings: Settings;
  levelEventHandler: LevelEventHandler;
  currentWave: number;
  currentLevel: number;
  levels: Array<Level>;
  showNextWaveButton: boolean;
  gameStarted: boolean;

  // actions

  addCharacterToParty: (pos: PartyPositionName, id: string) => void;
  removeCharacterFromParty: () => void;
  moveCharacter: (from: PartyPositionName, to: PartyPositionName) => void;
  updateCharacterState: (
    position: PartyPositionName,
    patch: Partial<AnyCharacter>,
  ) => void;
  selectPosition: (pos: PartyPositionName) => void;
  setGameStarted: (started: boolean) => void;
  addGold: (n: number) => void;
  levelUpSkill: <T extends string>(
    pos: PartyPositionName,
    skill: Skill<T>,
  ) => void;
  setSettings: (patch: Partial<Settings>) => void;
  nextWave: () => void;
  nextLevel: () => void;
  play: () => void;
  pause: () => void;
  handleGameOver: () => void;
  setGameOver: () => void;
  setShowNextWave: (isVisible: boolean) => void;
};

export type { CreateScore, Score, Highscores };
