import { beforeEach, describe, expect, it } from 'vitest';
import { useGameStore } from '@/store';
import { createDefaultGrid, createTestKnight } from '@/model/test/utils';
import { GridRenderer } from '@/model/gridRenderer';
import { defaultGold, defaultSettings } from '@/defaults';
import { SKILL_UPGRADE_COST } from '@/constants';

describe('useGameStore levelUpSkill', () => {
  beforeEach(() => {
    const grid = createDefaultGrid();

    useGameStore.setState({
      settings: { ...defaultSettings },
      gold: defaultGold(),
      grid,
      gridRenderer: new GridRenderer(grid),
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
});
