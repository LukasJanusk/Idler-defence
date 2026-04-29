import { create } from 'zustand';
import type { GameStore } from './types';
import { Grid } from './model/grid';
import { GridRenderer } from './model/gridRenderer';
import { GameClock } from './model/gameClock';
import { SKILL_UPGRADE_COST } from './constants';
import {
  createAvailableCharacters,
  defaultGold,
  defaultSettings,
} from './defaults';
import { LevelEventHandler } from './model/levelEventHandler';
import { createLevels } from './model/entities/Level';
import type { EnemyAction } from './model/entities/character';
import type { Enemy } from './model/entities/enemy';
import {
  calculateScore,
  createStoreCallbacksForLevelFromGetter,
  isLevelCleared,
} from './utils';
import TutorialBackground from '@/assets/background/bg_dungeon.png';
import LevelOneBackground from '@/assets/background/bg_level_one.svg';
import LevelOneCard from '@/assets/Levels/level_one_card.svg';

const nextGameSpeed = {
  1: 2,
  2: 3,
  3: 1,
} as const;

const clock = new GameClock();
clock.start();
const levelHandler = new LevelEventHandler(clock);
const grid = new Grid(9, 5, 128);
const gridRenderer = new GridRenderer(grid);

const createSelectableLevels = () => [
  {
    id: 0,
    name: 'Tutorial',
    locked: false,
    background: new URL(TutorialBackground, import.meta.url).href,
  },
  {
    id: 1,
    name: 'Level 1',
    locked: true,
    icon: new URL(LevelOneCard, import.meta.url).href,
    background: new URL(LevelOneBackground, import.meta.url).href,
  },
  { id: 2, name: 'Level 2', locked: true },
  { id: 3, name: 'Level 3', locked: true },
  { id: 4, name: 'Level 4', locked: true },
  { id: 5, name: 'Level 5', locked: true },
  { id: 6, name: 'Level 6', locked: true },
  { id: 7, name: 'Level 7', locked: true },
  { id: 8, name: 'Level 8', locked: true },
  { id: 9, name: 'Level 9', locked: true },
  { id: 10, name: 'Level 10', locked: true },
  { id: 11, name: 'Level 11', locked: true },
];

export const useGameStore = create<GameStore>((set, get) => ({
  // game state

  gameClock: clock,
  selectedPosition: null,
  grid: grid,
  gridRenderer: gridRenderer,
  selectableLevels: createSelectableLevels(),
  availableCharacters: createAvailableCharacters(),
  gold: defaultGold(),
  score: 0,
  settings: defaultSettings,
  levelEventHandler: levelHandler,
  gameOver: false,
  gameOverReason: 'defeat',
  showNextWaveButton: true,
  gameStarted: false,
  levels: createLevels(grid, (enemy?: Enemy<EnemyAction>) => {
    const store = get();
    store.addGold(enemy?.bounty ?? 0);
    if (isLevelCleared(store)) {
      store.setGameOver('level-complete');
    }
  }),
  currentLevel: 0,
  currentWave: 0,

  // game actions

  addCharacterToParty: (pos, id) =>
    set((store) => {
      const char = Array.from(store.availableCharacters).find(
        (c) => c.id === id,
      );
      if (!char) return store;
      const toPay = char.price * (1 + store.grid.getCharacters().length);
      if (toPay > store.gold) {
        return store;
      }
      store.gold -= toPay;
      const grid = store.grid;
      char.pos = pos;
      char.initAttributes();
      char.initAttacks(store.grid, store.gridRenderer);
      char.initAudio();
      char.initGeneralEffects(store.gridRenderer);
      char.initSkillCost();
      grid.setCharacterToPosition(pos, char);
      char.setAutomate(store.settings.automateSkillCast);
      const availableCharacters = new Set(store.availableCharacters);
      availableCharacters.delete(char);
      return {
        ...store,
        availableCharacters,
      };
    }),
  removeCharacterFromParty: () =>
    set((store) => {
      const pos = store.selectedPosition;
      if (!pos) return store;
      store.grid.removeCharactersFromPosition(pos);
      return { ...store };
    }),
  moveCharacter: (from, to) =>
    set((store) => {
      const grid = store.grid;
      grid.moveCharacter(from, to);
      store.selectedPosition = to;
      store.grid.grid = grid.grid.map((row) => [...row]);
      return store;
    }),
  updateCharacterState: (position, patch) => {
    set((store) => {
      const char = store.grid.removeCharactersFromPosition(position);
      const area = store.grid.getAreaFromPos(position);
      if (!char) return store;
      const updated = Object.assign(char, patch);
      area?.registerEntity(updated);

      return { ...store };
    });
  },
  levelUpSkill: (pos, skill) => {
    set((store) => {
      const char = store.grid.getCharacterFromPosition(pos);
      if (!char) return store;

      store.gold -= SKILL_UPGRADE_COST;
      char.levelUpSkill<typeof skill.action>(skill);

      return store;
    });
  },
  pause: () =>
    set((store) => {
      store.gameClock.stop();
      store.levelEventHandler.stop();

      return { ...store, settings: { ...store.settings, pause: true } };
    }),
  play: () =>
    set((store) => {
      store.gameClock.start();
      store.levelEventHandler.start();

      return { ...store, settings: { ...store.settings, pause: false } };
    }),
  cycleGameSpeed: () =>
    set((store) => {
      const gameSpeed = nextGameSpeed[store.settings.gameSpeed];
      store.gameClock.setTimeScale(gameSpeed);

      return {
        ...store,
        settings: { ...store.settings, gameSpeed },
      };
    }),
  setGameStarted: (started) =>
    set((store) => ({ ...store, gameStarted: started })),
  nextLevel: () => {
    console.info('Not yet implemented');
  },
  nextWave: () =>
    set((store) => {
      store.grid.removeAllDeadEnemies();

      const currentWaveEvents =
        store.levels[store.currentLevel].waves[store.currentWave];
      if (!currentWaveEvents) {
        return store;
      }
      const onWaveEnd = () => {
        if (
          store.levels[store.currentLevel].waves.length === store.currentWave
        ) {
          return;
        }
        set((store) => ({ ...store, showNextWaveButton: true }));
      };
      store.levelEventHandler.reset();
      store.levelEventHandler.onWaveEnd = onWaveEnd;
      store.levelEventHandler.registerLevel(currentWaveEvents);
      store.gameClock.start();
      store.levelEventHandler.start();
      const characters = grid.getCharacters();
      characters.forEach((c) => {
        c.initAttributes();
        c.health = c.maxHealth;
      });
      store.currentWave += 1;
      store.showNextWaveButton = false;

      return {
        ...store,
      };
    }),
  handleGameOver: () =>
    set((store) => {
      const grid = store.grid;
      grid.reset();
      store.gridRenderer.clear();
      store.levelEventHandler.reset();
      store.gameClock.setTimeScale(defaultSettings.gameSpeed);
      store.gameClock.start();
      return {
        ...store,
        levels: createLevels(grid, createStoreCallbacksForLevelFromGetter(get)),
        selectableLevels: [...store.selectableLevels],
        availableCharacters: createAvailableCharacters(),
        settings: { ...defaultSettings },
        gold: 200,
        score: 0,
        currentLevel: 0,
        currentWave: 0,
        showNextWaveButton: true,
        selectedPosition: null,
        gameOver: false,
        gameOverReason: 'defeat',
      };
    }),
  setGameOver: (reason = 'defeat') =>
    set((store) => {
      store.levelEventHandler.stop();
      store.gameClock.stop();
      store.score = calculateScore(store.gold, store.grid);

      const selectableLevels = store.selectableLevels.map((level) => ({
        ...level,
      }));
      const nextLevelIndex = store.currentLevel + 1;

      if (
        reason === 'level-complete' &&
        nextLevelIndex < store.levels.length &&
        selectableLevels[nextLevelIndex]
      ) {
        selectableLevels[nextLevelIndex].locked = false;
      }

      return {
        ...store,
        gameOver: true,
        gameOverReason: reason,
        selectableLevels,
        settings: { ...store.settings, pause: true },
      };
    }),
  selectPosition: (pos) =>
    set((store) => ({ ...store, selectedPosition: pos })),
  addGold: (n) => set((store) => ({ ...store, gold: (store.gold += n) })),
  setSettings: (patch) =>
    set((store) => {
      const prev = store.settings;
      if (
        patch.automateSkillCast !== undefined &&
        prev.automateSkillCast !== patch.automateSkillCast
      ) {
        const characters = store.grid.getCharacters();
        characters.forEach((c) => c.setAutomate(patch.automateSkillCast!));
      }

      store.settings = { ...prev, ...patch };
      if (patch.gameSpeed !== undefined) {
        store.gameClock.setTimeScale(patch.gameSpeed);
      }
      store.gridRenderer.setRenderParticles(store.settings.drawParticles);
      return { ...store };
    }),
  setShowNextWave: (isVisible: boolean) =>
    set((store) => ({ ...store, showNextWaveButton: isVisible })),
  setCurrentLevel: (levelIndex: number) =>
    set((store) => ({ ...store, currentLevel: levelIndex })),
}));
