import { create } from 'zustand';
import type { GameStore, PartyPositionName } from './types';
import { Grid } from './model/grid';
import { GameClock } from './model/gameClock';
import { produce, enableMapSet } from 'immer';
import { createAvailableCharacters } from './defaults';

enableMapSet();
const clock = new GameClock();

export const useGameStore = create<GameStore>((set, get) => ({
  gameClock: clock,
  party: { pos1: null, pos2: null, pos3: null, pos4: null },
  selectedPosition: null,
  grid: new Grid(9, 5, 128),
  particles: [],
  availableCharacters: createAvailableCharacters(),
  gold: 0,
  score: 0,
  addCharacterToParty: (pos, id) =>
    set(
      produce<GameStore>((draft) => {
        const grid = get().grid;
        const char = Array.from(draft.availableCharacters).find(
          (c) => c.id === id,
        );
        if (!char) return;
        char.initAttacks(grid);

        const targetChar = char;

        targetChar.animations.death.onFrame(
          targetChar.animations.death.nFrame - 1,
          () => {
            set((draft) => {
              const foundPos = Object.entries(draft.party).find(
                ([, c]) => c?.id === targetChar.id,
              )?.[0] as PartyPositionName;
              if (!foundPos) return draft;
              return {
                ...draft,
                party: {
                  ...draft.party,
                  [foundPos]: {
                    ...draft.party[foundPos]!,
                    state: 'dead',
                  },
                },
              };
            });
          },
        );
        targetChar.animations.hit.onFrame(
          targetChar.animations.hit.nFrame - 1,
          () => {
            set((draft) => {
              const foundPos = Object.entries(draft.party).find(
                ([, c]) => c?.id === targetChar.id,
              )?.[0] as PartyPositionName;
              if (!foundPos) return draft;
              return {
                ...draft,
                party: {
                  ...draft.party,
                  [foundPos]: {
                    ...draft.party[foundPos]!,
                    state: 'idle',
                  },
                },
              };
            });
          },
        );
        targetChar.animations.resurrect.onFrame(
          targetChar.animations.resurrect.nFrame - 1,
          () => {
            set((draft) => {
              const foundPos = Object.entries(draft.party).find(
                ([, c]) => c?.id === targetChar.id,
              )?.[0] as PartyPositionName;
              if (!foundPos) return draft;
              return {
                ...draft,
                party: {
                  ...draft.party,
                  [foundPos]: {
                    ...draft.party[foundPos]!,
                    state: 'idle',
                  },
                },
              };
            });
          },
        );
        const positions = {
          pos1: { x: 384, y: 256, area: draft.grid.grid[2][3] },
          pos2: { x: 256, y: 256, area: draft.grid.grid[2][2] },
          pos3: { x: 128, y: 256, area: draft.grid.grid[2][1] },
          pos4: { x: 0, y: 256, area: draft.grid.grid[2][0] },
        };
        const target = positions[pos];
        if (target) {
          char.rect = { ...char.rect, x: target.x, y: target.y };
          target.area.characters.push(char);
          draft.party[pos] = char;
          draft.availableCharacters.delete(char);
        }
      }),
    ),
  removeCharacterFromParty: (pos) =>
    set(
      produce<GameStore>((draft) => {
        const positions = {
          pos1: draft.grid.grid[2][3],
          pos2: draft.grid.grid[2][2],
          pos3: draft.grid.grid[2][1],
          pos4: draft.grid.grid[2][0],
        };

        const targetArea = positions[pos];
        if (targetArea) {
          targetArea.characters = [];
          draft.party[pos] = null;
        }
      }),
    ),
  moveCharacter: (from, to) =>
    set(
      produce<GameStore>((draft) => {
        const { party } = draft;
        const snapshot = { ...party };

        const fromCharacter = snapshot[from];
        const toCharacter = snapshot[to];
        if (!fromCharacter) return;

        const positions = {
          pos1: { x: 0, y: 256, area: draft.grid.grid[2][0] },
          pos2: { x: 128, y: 256, area: draft.grid.grid[2][1] },
          pos3: { x: 256, y: 256, area: draft.grid.grid[2][2] },
          pos4: { x: 384, y: 256, area: draft.grid.grid[2][3] },
        };

        if (from === 'pos1' && to === 'pos4') {
          if (!snapshot.pos4) {
            party.pos4 = fromCharacter;
            party.pos1 = null;
          } else {
            party.pos1 = snapshot.pos2;
            party.pos2 = snapshot.pos3;
            party.pos3 = snapshot.pos4;
            party.pos4 = fromCharacter;
          }
        } else if (from === 'pos4' && to === 'pos1') {
          if (!snapshot.pos1) {
            party.pos1 = fromCharacter;
            party.pos4 = null;
          } else {
            party.pos1 = fromCharacter;
            party.pos2 = snapshot.pos1;
            party.pos3 = snapshot.pos2;
            party.pos4 = snapshot.pos3;
          }
        } else {
          party[from] = toCharacter;
          party[to] = fromCharacter;
        }

        Object.entries(party).forEach(([slot, character]) => {
          if (!character) return;
          const pos = positions[slot as PartyPositionName];

          character.rect = { ...character.rect, x: pos.x, y: pos.y };
          Object.values(positions).forEach((p) => {
            p.area.characters = p.area.characters.filter(
              (c) => c.id !== character.id,
            );
          });
          pos.area.characters.push(character);
        });
      }),
    ),
  updateCharacterState: (position, patch) => {
    set(
      produce((draft) => {
        const char = draft.party[position];
        if (!char) return;
        Object.assign(char, patch);
      }),
    );

    set((state) => ({ party: { ...state.party } }));
  },
  updateGame: (dt: number) => {
    const grid = get().grid;
    grid.update(dt);
    set({ grid });
  },
  getGameClock: () => get().gameClock,
  selectPosition: (pos) =>
    set((store) => ({ ...store, selectedPosition: pos })),
}));
