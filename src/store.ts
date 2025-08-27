import { create } from 'zustand';
import type { GameStore } from './types';
import { Grid } from './model/grid';
import { GameClock } from './model/gameClock';
import { enableMapSet } from 'immer';
import { createAvailableCharacters } from './defaults';

enableMapSet();
const clock = new GameClock();

export const useGameStore = create<GameStore>((set, get) => ({
  gameClock: clock,
  selectedPosition: null,
  grid: new Grid(9, 5, 128),
  particles: [],
  availableCharacters: createAvailableCharacters(),
  gold: 0,
  score: 0,
  addCharacterToParty: (pos, id) =>
    set((store) => {
      const char = Array.from(store.availableCharacters).find(
        (c) => c.id === id,
      );

      if (!char) return store;
      const grid = store.grid;
      char.pos = pos;
      char.initAttributes();
      char.initAttacks(store.grid);
      grid.setCharacterToPosition(pos, char);
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
  // moveCharacter: (from, to) =>
  //   set(
  //     produce<GameStore>((draft) => {
  //       const { party } = draft;
  //       const snapshot = { ...party };

  //       const fromCharacter = snapshot[from];
  //       const toCharacter = snapshot[to];
  //       if (!fromCharacter) return;

  //       const positions = {
  //         pos4: { x: 0, y: 256, area: draft.grid.grid[2][0] },
  //         pos3: { x: 128, y: 256, area: draft.grid.grid[2][1] },
  //         pos2: { x: 256, y: 256, area: draft.grid.grid[2][2] },
  //         pos1: { x: 384, y: 256, area: draft.grid.grid[2][3] },
  //       };

  //       if (from === 'pos1' && to === 'pos4') {
  //         if (!snapshot.pos4) {
  //           party.pos4 = fromCharacter;
  //           party.pos1 = null;
  //         } else {
  //           party.pos1 = snapshot.pos2;
  //           party.pos2 = snapshot.pos3;
  //           party.pos3 = snapshot.pos4;
  //           party.pos4 = fromCharacter;
  //         }
  //       } else if (from === 'pos4' && to === 'pos1') {
  //         if (!snapshot.pos1) {
  //           party.pos1 = fromCharacter;
  //           party.pos4 = null;
  //         } else {
  //           party.pos1 = fromCharacter;
  //           party.pos2 = snapshot.pos1;
  //           party.pos3 = snapshot.pos2;
  //           party.pos4 = snapshot.pos3;
  //         }
  //       } else {
  //         party[from] = toCharacter;
  //         party[to] = fromCharacter;
  //       }

  //       Object.entries(party).forEach(([slot, character]) => {
  //         if (!character) return;
  //         const pos = positions[slot as PartyPositionName];

  //         character.rect = { ...character.rect, x: pos.x, y: pos.y };
  //         Object.values(positions).forEach((p) => {
  //           p.area.characters = p.area.characters.filter(
  //             (c) => c.id !== character.id,
  //           );
  //         });
  //         pos.area.characters.push(character);
  //       });
  //     }),
  //   ),
  updateCharacterState: (position, patch) => {
    set((store) => {
      const char = store.grid.removeCharactersFromPosition(position);
      const area = store.grid.getAreaFromPos(position);
      if (!char) return store;
      const updated = Object.assign(char, patch);
      area.registerEntity(updated);

      return { ...store };
    });
  },
  getGameClock: () => get().gameClock,
  getEnemies: () => {
    return get()
      .grid.grid.flat()
      .flatMap((area) => Array.from(area.enemies));
  },
  selectPosition: (pos) =>
    set((store) => ({ ...store, selectedPosition: pos })),
  addGold: (n) => set((store) => ({ ...store, gold: (store.gold += n) })),
}));
