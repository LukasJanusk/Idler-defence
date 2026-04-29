import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameOver from './GameOver';
import { useGameStore } from '@/store';
import { createDefaultGrid } from '@/model/test/utils';
import { GridRenderer } from '@/model/gridRenderer';
import { defaultGold, defaultSettings } from '@/defaults';

vi.mock('./GameOverForm', () => ({
  default: ({
    onSubmit,
  }: {
    onSubmit: (
      scores: Array<{
        id: string;
        rank: number;
        name: string;
        score: number;
        date: string;
      }>,
      score: {
        id: string;
        rank: number;
        name: string;
        score: number;
        date: string;
      },
    ) => void;
  }) => (
    <button
      aria-label="Mock submit score"
      onClick={() => {
        const submittedScore = {
          id: 'score-1',
          rank: 1,
          name: 'Player',
          score: 123,
          date: '2026-04-29',
        };
        onSubmit([submittedScore], submittedScore);
      }}
    >
      Mock Game Over Form
    </button>
  ),
}));

describe('<GameOver />', () => {
  beforeEach(() => {
    const grid = createDefaultGrid();

    useGameStore.setState({
      settings: { ...defaultSettings },
      gold: defaultGold(),
      grid,
      gridRenderer: new GridRenderer(grid),
      currentLevel: 0,
      currentWave: 0,
      gameStarted: true,
      gameOver: false,
      gameOverReason: 'defeat',
      score: 0,
      showNextWaveButton: true,
      selectedPosition: null,
    });
  });

  it('shows tutorial complete modal instead of the highscore form', () => {
    useGameStore.setState({
      gameOver: true,
      gameOverReason: 'level-complete',
      currentLevel: 0,
    });

    render(<GameOver />);

    expect(screen.getByText('Tutorial Complete')).toBeVisible();
    expect(screen.queryByText('GAME OVER!')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Return to level select' }),
    ).toBeVisible();
  });

  it('returns to level select from the tutorial complete modal', async () => {
    useGameStore.setState({
      gameOver: true,
      gameOverReason: 'level-complete',
      currentLevel: 0,
      gameStarted: true,
    });

    render(<GameOver />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Return to level select' }),
    );

    const store = useGameStore.getState();
    expect(store.gameStarted).toBe(false);
    expect(store.gameOver).toBe(false);
    expect(store.currentLevel).toBe(0);
  });

  it('returns to level select when the submitted highscore modal is closed', async () => {
    useGameStore.setState({
      gameOver: true,
      gameOverReason: 'defeat',
      currentLevel: 1,
      gameStarted: true,
      score: 123,
    });

    render(<GameOver />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Mock submit score' }),
    );
    await userEvent.click(screen.getByLabelText('Close modal'));

    const store = useGameStore.getState();
    expect(store.gameStarted).toBe(false);
    expect(store.gameOver).toBe(false);
    expect(store.currentLevel).toBe(0);
  });
});
