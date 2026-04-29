import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
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
import LevelTwoBackground from '@/assets/background/bg_level_two.svg';
import LevelThreeBackground from '@/assets/background/bg_level_three.svg';
import LevelFourBackground from '@/assets/background/bg_level_four.svg';
import LevelFiveBackground from '@/assets/background/bg_level_five.svg';
import LevelSixBackground from '@/assets/background/bg_level_six.svg';
import LevelSevenBackground from '@/assets/background/bg_level_seven.svg';
import LevelEightBackground from '@/assets/background/bg_level_eight.svg';
import LevelNineBackground from '@/assets/background/bg_level_nine.svg';
import LevelTenBackground from '@/assets/background/bg_level_ten.svg';
import LevelOneCard from '@/assets/Levels/level_one_card.svg';
import LevelTwoCard from '@/assets/Levels/level_two_card.svg';
import LevelThreeCard from '@/assets/Levels/level_three_card.svg';
import LevelFourCard from '@/assets/Levels/level_four_card.svg';
import LevelFiveCard from '@/assets/Levels/level_five_card.svg';
import LevelSixCard from '@/assets/Levels/level_six_card.svg';
import LevelSevenCard from '@/assets/Levels/level_seven_card.svg';
import LevelEightCard from '@/assets/Levels/level_eight_card.svg';
import LevelNineCard from '@/assets/Levels/level_nine_card.svg';
import LevelTenCard from '@/assets/Levels/level_ten_card.svg';

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
const STORE_PERSISTENCE_KEY = 'game-store';

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
  {
    id: 2,
    name: 'Level 2',
    locked: true,
    icon: new URL(LevelTwoCard, import.meta.url).href,
    background: new URL(LevelTwoBackground, import.meta.url).href,
  },
  {
    id: 3,
    name: 'Level 3',
    locked: true,
    icon: new URL(LevelThreeCard, import.meta.url).href,
    background: new URL(LevelThreeBackground, import.meta.url).href,
  },
  {
    id: 4,
    name: 'Level 4',
    locked: true,
    icon: new URL(LevelFourCard, import.meta.url).href,
    background: new URL(LevelFourBackground, import.meta.url).href,
  },
  {
    id: 5,
    name: 'Level 5',
    locked: true,
    icon: new URL(LevelFiveCard, import.meta.url).href,
    background: new URL(LevelFiveBackground, import.meta.url).href,
  },
  {
    id: 6,
    name: 'Level 6',
    locked: true,
    icon: new URL(LevelSixCard, import.meta.url).href,
    background: new URL(LevelSixBackground, import.meta.url).href,
  },
  {
    id: 7,
    name: 'Level 7',
    locked: true,
    icon: new URL(LevelSevenCard, import.meta.url).href,
    background: new URL(LevelSevenBackground, import.meta.url).href,
  },
  {
    id: 8,
    name: 'Level 8',
    locked: true,
    icon: new URL(LevelEightCard, import.meta.url).href,
    background: new URL(LevelEightBackground, import.meta.url).href,
  },
  {
    id: 9,
    name: 'Level 9',
    locked: true,
    icon: new URL(LevelNineCard, import.meta.url).href,
    background: new URL(LevelNineBackground, import.meta.url).href,
  },
  {
    id: 10,
    name: 'Level 10',
    locked: true,
    icon: new URL(LevelTenCard, import.meta.url).href,
    background: new URL(LevelTenBackground, import.meta.url).href,
  },
];

type PersistedGameStore = Pick<
  GameStore,
  'currentLevel' | 'selectableLevels' | 'settings'
>;

const mergeSelectableLevels = (
  currentLevels: GameStore['selectableLevels'],
  persistedLevels?: GameStore['selectableLevels'],
) =>
  currentLevels.map((level) => {
    const persistedLevel = persistedLevels?.find(
      (candidate) => candidate.id === level.id,
    );

    return persistedLevel ? { ...level, locked: persistedLevel.locked } : level;
  });

const sanitizePersistedSettings = (
  settings?: Partial<GameStore['settings']>,
): GameStore['settings'] => ({
  ...defaultSettings,
  ...settings,
  pause: false,
});

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
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
              store.levels[store.currentLevel].waves.length ===
              store.currentWave
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
          const nextSettings = { ...store.settings, pause: false };
          grid.reset();
          store.gridRenderer.clear();
          store.levelEventHandler.reset();
          store.gameClock.setTimeScale(nextSettings.gameSpeed);
          store.gridRenderer.setRenderParticles(nextSettings.drawParticles);
          store.gameClock.start();
          return {
            ...store,
            levels: createLevels(
              grid,
              createStoreCallbacksForLevelFromGetter(get),
            ),
            selectableLevels: [...store.selectableLevels],
            availableCharacters: createAvailableCharacters(),
            settings: nextSettings,
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
            nextLevelIndex < selectableLevels.length &&
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
    }),
    {
      name: STORE_PERSISTENCE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state): PersistedGameStore => ({
        currentLevel: state.currentLevel,
        selectableLevels: state.selectableLevels.map((level) => ({
          id: level.id,
          name: level.name,
          icon: level.icon,
          background: level.background,
          locked: level.locked,
        })),
        settings: sanitizePersistedSettings(state.settings),
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<PersistedGameStore>;
        return {
          ...currentState,
          currentLevel:
            persisted.currentLevel !== undefined
              ? persisted.currentLevel
              : currentState.currentLevel,
          selectableLevels: mergeSelectableLevels(
            currentState.selectableLevels,
            persisted.selectableLevels,
          ),
          settings: sanitizePersistedSettings(persisted.settings),
        };
      },
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.gameClock.setTimeScale(state.settings.gameSpeed);
        state.gridRenderer.setRenderParticles(state.settings.drawParticles);
      },
    },
  ),
);
