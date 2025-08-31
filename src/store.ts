import { create } from 'zustand';
import type { GameStore } from './types';
import { Grid } from './model/grid';
import { GameClock } from './model/gameClock';
import {
  createAvailableCharacters,
  defaultGold,
  defaultSettings,
} from './defaults';
import { LevelEventHandler } from './model/levelEventHandler';
import { createLevelOne } from './model/entities/Level/testLevel';
import type { EnemyAction } from './model/entities/character';
import type { Enemy } from './model/entities/enemy';

const clock = new GameClock();
const levelHandler = new LevelEventHandler(clock);
const grid = new Grid(9, 5, 128);

export const useGameStore = create<GameStore>((set, get) => ({
  gameClock: clock,
  selectedPosition: null,
  grid: grid,
  availableCharacters: createAvailableCharacters(),
  gold: defaultGold(),
  score: 0,
  settings: defaultSettings,
  levelEventHandler: levelHandler,
  gameOver: false,
  levels: [
    createLevelOne(grid, (enemy?: Enemy<EnemyAction>) =>
      get().addGold(enemy?.bounty || 0),
    ),
  ],
  currentLevel: 0,
  currentWave: 0,
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
  nextLevel: () => {
    console.log('Not yet implemented');
  },
  nextWave: () =>
    set((store) => {
      store.grid.removeAllDeadEnemies();
      const currentWave =
        store.levels[store.currentLevel].waves[store.currentWave];
      if (!currentWave) {
        alert('Thank you for Playing. No more levels currently available');
        store.currentLevel = 0;
        store.currentWave = 0;
        store.levelEventHandler.reset();
        store.gameOver = true;
        store.score =
          store.gold +
          store.grid
            .getCharacters()
            .map((c) => c.level)
            .reduce((p, c) => p + c, 0) *
            1000;
        return store;
      }
      const onWaveEnd = () => {
        set((store) => {
          if (
            store.currentWave <
            store.levels[store.currentLevel].waves.length - 1
          )
            store.currentWave += 1;
          else {
            store.gameOver = true;
          }
          return store;
        });
      };
      store.levelEventHandler.reset();
      store.levelEventHandler.onWaveEnd = onWaveEnd;
      store.levelEventHandler.registerLevel(currentWave);
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
      const grid = store.grid;
      grid.reset();
      store.levelEventHandler.reset();

      return {
        ...store,
        levels: [
          createLevelOne(grid, (enemy?: Enemy<EnemyAction>) =>
            get().addGold(enemy?.bounty || 0),
          ),
        ],
        availableCharacters: createAvailableCharacters(),
        gameOver: false,
        gold: 200,
        score: 0,
        currentLevel: 0,
        currentWave: 0,
      };
    }),
  setGameOver: () =>
    set((store) => {
      store.gameOver = true;
      store.levelEventHandler.stop();
      store.score =
        store.gold +
        store.grid
          .getCharacters()
          .map((c) => c.level)
          .reduce((p, c) => p + c, 0) *
          1000;

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
      store.grid.setRenderParticles(store.settings.drawParticles);
      return store;
    }),
}));
