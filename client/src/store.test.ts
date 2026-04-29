import { beforeEach, describe, expect, it } from 'vitest';
import { useGameStore } from '@/store';
import { createDefaultGrid, createTestKnight } from '@/model/test/utils';
import { GridRenderer } from '@/model/gridRenderer';
import { defaultGold, defaultSettings } from '@/defaults';
import { SKILL_UPGRADE_COST } from '@/constants';
import type { LevelSelectable } from '@/types';

const testSelectableLevels: LevelSelectable[] = [
  { id: 0, name: 'Tutorial', locked: false },
  { id: 1, name: 'Level 1', locked: true },
  { id: 2, name: 'Level 2', locked: true },
];

describe('useGameStore levelUpSkill', () => {
  beforeEach(() => {
    const grid = createDefaultGrid();

    useGameStore.setState({
      settings: { ...defaultSettings },
      gold: defaultGold(),
      grid,
      gridRenderer: new GridRenderer(grid),
      selectableLevels: testSelectableLevels.map((level) => ({ ...level })),
      levels: [
        { id: 'tutorial', name: 'Tutorial', waves: [] },
        { id: 'Level-1', name: 'Level 1', waves: [] },
        { id: 'Level-2', name: 'Level 2', waves: [] },
      ],
    });
  });

  it('always charges a flat 200 gold for skill upgrades', () => {
    const store = useGameStore.getState();
    const knight = createTestKnight();
    knight.pos = 'pos1';
    store.grid.setCharacterToPosition('pos1', knight);

    const skill = knight.skills[0];
    skill.level = 4;
    store.gold = 1000;

    store.levelUpSkill('pos1', skill);

    expect(useGameStore.getState().gold).toBe(1000 - SKILL_UPGRADE_COST);
  });

  it('resets skill levels on new game', () => {
    const store = useGameStore.getState();
    const knight = createTestKnight({ id: 'knight-reset', name: 'Reset' });
    knight.pos = 'pos1';
    store.grid.setCharacterToPosition('pos1', knight);

    const skill = knight.skills[0];
    store.gold = 1000;
    store.levelUpSkill('pos1', skill);

    expect(skill.level).toBe(2);

    store.handleGameOver();

    const refreshedCharacters = Array.from(
      useGameStore.getState().availableCharacters,
    );

    expect(refreshedCharacters.length).toBeGreaterThan(0);
    refreshedCharacters.forEach((character) => {
      character.skills.forEach((refreshedSkill) => {
        expect(refreshedSkill.level).toBe(1);
        expect(refreshedSkill).not.toBe(skill);
      });
    });
  });

  it('preserves unlocked levels after reset', () => {
    useGameStore.setState({
      currentLevel: 0,
      gameOver: true,
      gameOverReason: 'level-complete',
      selectableLevels: [
        { id: 0, name: 'Tutorial', locked: false },
        { id: 1, name: 'Level 1', locked: false },
        { id: 2, name: 'Level 2', locked: true },
      ],
    });

    useGameStore.getState().handleGameOver();

    expect(useGameStore.getState().selectableLevels[1]?.locked).toBe(false);
  });

  it('unlocks level 2 when level 1 is completed', () => {
    useGameStore.setState({
      currentLevel: 1,
      gameOver: false,
      gameOverReason: 'defeat',
      selectableLevels: [
        { id: 0, name: 'Tutorial', locked: false },
        { id: 1, name: 'Level 1', locked: false },
        { id: 2, name: 'Level 2', locked: true },
      ],
    });

    useGameStore.getState().setGameOver('level-complete');

    expect(useGameStore.getState().selectableLevels[2]?.locked).toBe(false);
  });
});
