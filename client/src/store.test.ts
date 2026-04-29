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
    localStorage.clear();
    useGameStore.persist.clearStorage();

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

  it('persists unlocked levels and selected settings to local storage', async () => {
    useGameStore.setState({
      currentLevel: 2,
      selectableLevels: [
        { id: 0, name: 'Tutorial', locked: false },
        { id: 1, name: 'Level 1', locked: false },
        { id: 2, name: 'Level 2', locked: false },
      ],
    });
    useGameStore.getState().setSettings({
      drawParticles: false,
      gameSpeed: 3,
    });

    await useGameStore.persist.rehydrate();

    const persisted = JSON.parse(localStorage.getItem('game-store') ?? '{}');

    expect(persisted.state.currentLevel).toBe(2);
    expect(persisted.state.selectableLevels[2].locked).toBe(false);
    expect(persisted.state.settings.drawParticles).toBe(false);
    expect(persisted.state.settings.gameSpeed).toBe(3);
    expect(persisted.state.settings.pause).toBe(false);
  });

  it('loads persisted progression and settings from local storage', async () => {
    useGameStore.setState({
      selectableLevels: [
        { id: 0, name: 'Tutorial', locked: false },
        { id: 1, name: 'Level 1', locked: true },
        { id: 2, name: 'Level 2', locked: true },
        { id: 3, name: 'Level 3', locked: true },
      ],
    });

    localStorage.setItem(
      'game-store',
      JSON.stringify({
        state: {
          currentLevel: 3,
          selectableLevels: [
            { id: 0, locked: false },
            { id: 1, locked: false },
            { id: 2, locked: false },
            { id: 3, locked: false },
          ],
          settings: {
            ...defaultSettings,
            drawParticles: false,
            gameSpeed: 2,
            pause: true,
          },
        },
        version: 0,
      }),
    );

    await useGameStore.persist.rehydrate();

    const store = useGameStore.getState();

    expect(store.currentLevel).toBe(3);
    expect(store.selectableLevels[3]?.locked).toBe(false);
    expect(store.settings.drawParticles).toBe(false);
    expect(store.settings.gameSpeed).toBe(2);
    expect(store.settings.pause).toBe(false);
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

  it('preserves settings after returning to level select', () => {
    useGameStore.setState({
      settings: {
        ...defaultSettings,
        showGrid: true,
        drawParticles: false,
        automateSkillCast: false,
        showUi: true,
        gameSpeed: 3,
        pause: true,
      },
      currentLevel: 2,
      gameOver: true,
    });

    useGameStore.getState().handleGameOver();

    const store = useGameStore.getState();

    expect(store.settings.showGrid).toBe(true);
    expect(store.settings.drawParticles).toBe(false);
    expect(store.settings.automateSkillCast).toBe(false);
    expect(store.settings.showUi).toBe(true);
    expect(store.settings.gameSpeed).toBe(3);
    expect(store.settings.pause).toBe(false);
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
