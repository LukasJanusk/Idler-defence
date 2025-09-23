import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import { defaultGold, defaultSettings } from '@/defaults';
import * as storeModule from '@/store';
import ParticleContextProvider from '@/context/ParticleContextProvider';
import Game from './Game';
import userEvent from '@testing-library/user-event';
import type { AnyCharacter, PartyPositionName } from '@/types';
import { createDefaultGrid, createTestKnight } from '@/model/test/utils';
import { createKnightAnimations } from '@/model/animations/knightAnimations';
import { mockResizeObserver } from './tests/utils';
import { createTestLevel } from '@/model/entities/Level/testLevel';
import { FireMage, type EnemyAction } from '@/model/entities/character';
import { createFireMageAnimations } from '@/model/animations/fireWizardAnimations';
import type { Enemy } from '@/model/entities/enemy';

mockResizeObserver();
vi.mock('HTMLMediaElement', () => ({
  play: vi.fn(),
  pause: vi.fn(),
  stop: vi.fn(),
}));

vi.mock('@/assets/large_border.svg?react', () => {
  return {
    ReactComponent: () => (
      <div data-testid="large-border" className="pointer-events-none" />
    ),
  };
});
vi.mock('@/assets/skill_border.svg?react', () => {
  return {
    ReactComponent: () => (
      <div data-testid="skill_border" className="pointer-events-none" />
    ),
  };
});

export const createTestCharacters = () => {
  const available = new Set<AnyCharacter>();
  const knight1 = createTestKnight({ id: 'knight-1', name: 'Mark' });
  const knight2 = createTestKnight({ id: 'knight-2', name: 'Jon' });
  knight1.animations = createKnightAnimations();
  knight2.animations = createKnightAnimations();
  available.add(knight1);
  available.add(knight2);

  return available;
};

const mockLevelCallback = (enemy?: Enemy<EnemyAction>) => {
  act(() => {
    const store = storeModule.useGameStore.getState();
    store.addGold(enemy?.bounty ?? 0);
    const isLastWave =
      store.levels[store.currentLevel].waves.length === store.currentWave;
    const noMoreEvents = store.levelEventHandler.events.size === 0;
    const isLastEnemy =
      store.grid
        .getEnemies()
        .filter((e) => e.state !== 'dead' && e.state !== 'death').length < 1;

    if (isLastWave && noMoreEvents && isLastEnemy) {
      store.setGameOver();
    }
  });
};

beforeEach(() => {
  const grid = createDefaultGrid();
  act(() =>
    storeModule.useGameStore.setState({
      settings: { ...defaultSettings },
      gameOver: false,
      availableCharacters: createTestCharacters(),
      currentLevel: 0,
      currentWave: 0,
      gold: defaultGold(),
      grid: grid,
      showNextWaveButton: true,
      levels: [createTestLevel(grid, mockLevelCallback)],
    }),
  );
  act(() => storeModule.useGameStore.getState().play());
});

const withParticleContext = () => {
  return (
    <ParticleContextProvider>
      <Game />
    </ParticleContextProvider>
  );
};

describe('<Game />', () => {
  it('renders Game component', async () => {
    render(withParticleContext());

    expect(screen.getByLabelText('Add new Character to pos1')).toBeVisible();
    expect(screen.getByLabelText('Add new Character to pos2')).toBeVisible();
    expect(screen.getByLabelText('Add new Character to pos3')).toBeVisible();
    expect(screen.getByLabelText('Add new Character to pos4')).toBeVisible();
  });

  it('hire character', async () => {
    const store = storeModule.useGameStore.getState();
    const position: PartyPositionName = 'pos1';
    render(withParticleContext());
    const selectButton = await screen.findByLabelText(
      `Add new Character to ${position}`,
    );

    await userEvent.click(selectButton);
    expect(screen.getAllByRole('list')).toHaveLength(1);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);

    await userEvent.click(screen.getByText('Mark'));
    const hireButton = screen.getByRole('button', { name: 'Hire 💰' });
    expect(hireButton).toBeVisible();
    await userEvent.click(hireButton);

    // assert store
    const character = store.grid.getCharacterFromPosition(position);
    expect(character).not.toBeNull();
    expect(character!.pos).toEqual(position);

    // assert screen
    expect(screen.getByText('0 🪙')).toBeVisible();
    await waitFor(() => expect(selectButton).not.toBeVisible());
    await waitFor(() =>
      expect(screen.getByText(character!.name)).toBeVisible(),
    );

    // assert correct number of characters to hire left
    await userEvent.click(screen.getByLabelText('Add new Character to pos4'));
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('starts wave', async () => {
    render(withParticleContext());

    const waveDisplay = await screen.findByLabelText('current wave');
    expect(waveDisplay).toBeInTheDocument();

    userEvent.click(screen.getByText('Next wave'));
    const store = storeModule.useGameStore.getState();

    // assert grid
    await waitFor(() => expect(store.grid.getEnemies()).toHaveLength(1));

    // assert screen
    await waitFor(() => expect(screen.getByText('Wave: 1/1')).toBeVisible());
    await waitFor(() =>
      expect(screen.getByLabelText('enemy Test zombie')).toBeInTheDocument(),
    );
  });

  it('create projectile when skill is selected', async () => {
    render(withParticleContext());
    const position: PartyPositionName = 'pos1';
    const fireMage = new FireMage(
      'test fire mage',
      'Marcus',
      createFireMageAnimations(),
    );
    const availableCharacters = new Set<AnyCharacter>();
    availableCharacters.add(fireMage);
    storeModule.useGameStore.setState({
      availableCharacters: availableCharacters,
    });

    await userEvent.click(
      screen.getByLabelText(`Add new Character to ${position}`),
    );
    await userEvent.click(screen.getByText('Marcus'));
    await userEvent.click(screen.getByText('Hire 💰'));

    await waitFor(() => expect(screen.getByText(fireMage.name)).toBeVisible());

    await userEvent.click(screen.getByLabelText('Fire ball'));
    await waitFor(() =>
      expect(screen.getByLabelText('fireball projectile')).toBeVisible(),
    );
  });

  it('displays Game over when enemy exits screen on the left', async () => {
    render(withParticleContext());
    userEvent.click(screen.getByText('Next wave'));
    const store = storeModule.useGameStore.getState();

    userEvent.click(screen.getByText('Next wave'));
    await waitFor(() => expect(store.grid.getEnemies()).toHaveLength(1));

    act(() => store.grid.getEnemies().forEach((e) => (e.rect.x = -250)));
    await waitFor(() => expect(screen.getByText('GAME OVER!')).toBeVisible());
  });

  it('displays Game over when last enemy dies', async () => {
    render(withParticleContext());

    userEvent.click(screen.getByText('Next wave'));
    const store = storeModule.useGameStore.getState();

    await waitFor(() => expect(store.grid.getEnemies()).toHaveLength(1));

    act(() => store.grid.getEnemies().forEach((e) => (e.health = 0)));

    await waitFor(() => expect(screen.getByText('GAME OVER!')).toBeVisible());
  });

  it('displays Error in score sumbit form', async () => {
    render(withParticleContext());

    storeModule.useGameStore.setState({ gameOver: true });
    await waitFor(() => expect(screen.getByText('GAME OVER!')).toBeVisible());
    await userEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Error occured')).toBeVisible();

    await userEvent.click(screen.getByLabelText('Close modal'));
    await userEvent.click(screen.getByPlaceholderText('Enter your name'));
    await userEvent.keyboard('{Enter}');

    expect(await screen.findByText('Error occured')).toBeVisible();
  });

  it('resets game state when submit score form is closed', async () => {
    render(withParticleContext());

    storeModule.useGameStore.setState({ gameOver: true });
    await waitFor(() => expect(screen.getByText('GAME OVER!')).toBeVisible());
    await userEvent.click(screen.getByLabelText('Close modal'));

    expect(screen.getByText('Next wave')).toBeVisible();
  });
});
