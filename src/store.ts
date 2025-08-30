import { create } from 'zustand';
import type { GameStore } from './types';
import { Grid } from './model/grid';
import { GameClock } from './model/gameClock';
import { enableMapSet } from 'immer';
import { createAvailableCharacters, defaultGold } from './defaults';
import { LevelEventHandler } from './model/levelEventHandler';
import { createTestLevel } from './model/entities/Level/testLevel';

enableMapSet();
const clock = new GameClock();
const levelHandler = new LevelEventHandler(clock);
const grid = new Grid(9, 5, 128);

export const useGameStore = create<GameStore>((set, get) => ({
  gameClock: clock,
  selectedPosition: null,
  grid: grid,
  particles: [],
  availableCharacters: createAvailableCharacters(),
  gold: defaultGold(),
  score: 0,
  settings: { automateSkillCast: false, showGrid: false },
  levelEventHandler: levelHandler,
  gameOver: false,
  levels: [
    createTestLevel(
      grid,
      (enemy?) => {
        if (enemy) {
          get().addGold(enemy?.bounty);
        }
      },
      10,
    ),
    createTestLevel(
      grid,
      (enemy?) => {
        if (enemy) {
          get().addGold(enemy?.bounty);
        }
      },
      15,
    ),
    createTestLevel(
      grid,
      (enemy?) => {
        if (enemy) {
          get().addGold(enemy?.bounty);
        }
      },
      20,
    ),
    createTestLevel(
      grid,
      (enemy?) => {
        if (enemy) {
          get().addGold(enemy?.bounty);
        }
      },
      25,
    ),
  ],
  currentLevel: 0,
  addCharacterToParty: (pos, id) =>
    set((store) => {
      const char = Array.from(store.availableCharacters).find(
        (c) => c.id === id,
      );

      if (!char) return store;
      if (char.price > store.gold) {
        return store;
      }
      store.gold -= char.price;
      const grid = store.grid;
      char.pos = pos;
      char.initAttributes();
      char.initAttacks(store.grid);
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
  pause: () =>
    set((store) => {
      console.log('Game Paused');
      store.gameClock.stop();
      store.levelEventHandler.stop();
      return store;
    }),
  play: () =>
    set((store) => {
      console.log('Game Live');
      store.gameClock.start();
      store.levelEventHandler.start();
      return store;
    }),
  nextLevel: () =>
    set((store) => {
      store.grid.removeAllDeadEnemies();
      const currentLevel = store.levels[store.currentLevel];
      if (!currentLevel) {
        alert('Thank you for Playing. No more levels currently available');
        store.currentLevel = 0;
        return store;
      }
      const onLevelEnd = () => {
        set((store) => {
          store.currentLevel += 1;
          return store;
        });
      };
      store.levelEventHandler.onLevelEnd = onLevelEnd;
      store.levelEventHandler.registerLevel(currentLevel);
      store.gameClock.start();
      store.levelEventHandler.start();
      const characters = grid.getCharacters();
      characters.forEach((c) => {
        c.initAttributes();
        c.health = c.maxHealth;
      });

      return store;
    }),
  handleGameOver: () =>
    set((store) => {
      // To reset Game state
      alert('Not yet implemented');
      return store;
    }),
  setGameOver: () =>
    set((store) => {
      store.gameOver = true;
      store.levelEventHandler.stop();
      return { ...store, gameOver: true };
    }),
  getGameClock: () => get().gameClock,
  getEnemies: () => {
    return get()
      .grid.grid.flat()
      .flatMap((area) => Array.from(area.enemies));
  },
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
      return store;
    }),
}));
