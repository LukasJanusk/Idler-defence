import Menu from '@/components/game/UIComponents/Menu';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import * as storeModule from '@/store';
import { defaultSettings } from '@/defaults';
import { userEvent } from 'storybook/internal/test';

vi.mock('@/components/reusable/Sprite', () => ({
  default: ({ entity }: { entity: 'character' | 'enemy' }) => (
    <div aria-label={`${entity} animation`} />
  ),
}));

beforeEach(() => {
  storeModule.useGameStore.setState({
    settings: { ...defaultSettings },
  });
});

describe('<Menu />', () => {
  it('renders Menu', async () => {
    render(<Menu />);
    expect(screen.getByLabelText('Menu button')).toBeInTheDocument();
    expect(
      screen.getByLabelText('game speed button, current 1x speed'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('game speed button, current 1x speed'),
    ).toContainHTML('<svg');
    expect(
      screen.getByLabelText('game speed button, current 1x speed'),
    ).not.toHaveTextContent(/play|double|triple/i);
  });

  it('updates speed icon state between three modes', async () => {
    render(<Menu />);

    let gameSpeedButton = screen.getByLabelText(
      'game speed button, current 1x speed',
    );

    await userEvent.click(gameSpeedButton);
    await waitFor(() =>
      expect(storeModule.useGameStore.getState().settings.gameSpeed).toBe(2),
    );
    gameSpeedButton = screen.getByLabelText(
      'game speed button, current 2x speed',
    );

    await userEvent.click(gameSpeedButton);
    await waitFor(() =>
      expect(storeModule.useGameStore.getState().settings.gameSpeed).toBe(3),
    );
    gameSpeedButton = screen.getByLabelText(
      'game speed button, current 3x speed',
    );

    await userEvent.click(gameSpeedButton);
    await waitFor(() =>
      expect(storeModule.useGameStore.getState().settings.gameSpeed).toBe(1),
    );
    expect(
      screen.getByLabelText('game speed button, current 1x speed'),
    ).toBeInTheDocument();
  });

  it('toggles resume/pause', async () => {
    render(<Menu />);

    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Pause')).toBeVisible();

    await userEvent.click(screen.getByText('Pause'));
    expect(await screen.findByText('Resume')).toBeVisible();

    userEvent.click(screen.getByText('Resume'));
    expect(await screen.findByText('Pause')).toBeVisible();
  });

  it('opens/closes Guidebook when help button pressed', async () => {
    render(<Menu />);

    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Pause')).toBeVisible();

    await userEvent.click(screen.getByText('Help'));
    expect(await screen.findByText('Guidebook')).toBeVisible();
    expect(await screen.findAllByLabelText('character animation')).toHaveLength(
      2,
    );

    await userEvent.click(screen.getByText('Help'));
    expect(screen.queryByText('Guidebook')).toBe(null);
  });

  it('opens/closes Settings modal when settings button pressed', async () => {
    render(<Menu />);

    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Pause')).toBeVisible();

    await userEvent.click(screen.getByLabelText('toggle settings button'));
    expect(await screen.findByText('Always show UI')).toBeVisible();

    await userEvent.click(screen.getByLabelText('toggle settings button'));
    expect(screen.queryByText('Always show UI')).toBe(null);
  });

  it('toggles grid on', async () => {
    render(<Menu />);
    const showGrid = () =>
      storeModule.useGameStore.getState().settings.showGrid;
    act(() =>
      storeModule.useGameStore.setState({
        settings: { ...defaultSettings, showGrid: false },
      }),
    );

    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Pause')).toBeVisible();
    await userEvent.click(screen.getByLabelText('toggle settings button'));
    expect(await screen.findByText('Grid')).toBeVisible();
    const gridButton = await screen.findByText('Grid');
    await userEvent.click(gridButton);

    await waitFor(() => expect(showGrid()).toBe(true));
  });

  it('toggles grid off', async () => {
    render(<Menu />);
    const showsGrid = () =>
      storeModule.useGameStore.getState().settings.showGrid;
    act(() =>
      storeModule.useGameStore.setState({
        settings: { ...defaultSettings, showGrid: true },
      }),
    );

    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Pause')).toBeVisible();
    await userEvent.click(screen.getByLabelText('toggle settings button'));
    expect(await screen.findByText('Grid')).toBeVisible();
    const gridButton = await screen.findByText('Grid');
    await userEvent.click(gridButton);

    await waitFor(() => expect(showsGrid()).toBe(false));
  });

  it('toggles particles on', async () => {
    render(<Menu />);
    const drawsParticles = () =>
      storeModule.useGameStore.getState().settings.drawParticles;
    act(() =>
      storeModule.useGameStore.setState({
        settings: { ...defaultSettings, drawParticles: false },
      }),
    );

    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Pause')).toBeVisible();
    await userEvent.click(screen.getByLabelText('toggle settings button'));
    expect(await screen.findByText('Particles')).toBeVisible();
    const particlesButton = await screen.findByText('Particles');
    await userEvent.click(particlesButton);

    await waitFor(() => expect(drawsParticles()).toBe(true));
  });

  it('toggles particles off', async () => {
    render(<Menu />);
    const drawsParticles = () =>
      storeModule.useGameStore.getState().settings.drawParticles;
    act(() =>
      storeModule.useGameStore.setState({
        settings: { ...defaultSettings, drawParticles: true },
      }),
    );

    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Pause')).toBeVisible();
    await userEvent.click(screen.getByLabelText('toggle settings button'));
    expect(await screen.findByText('Particles')).toBeVisible();
    const particlesButton = await screen.findByText('Particles');
    await userEvent.click(particlesButton);

    await waitFor(() => expect(drawsParticles()).toBe(false));
  });

  it('toggles always on UI on', async () => {
    render(<Menu />);
    const showsUI = () => storeModule.useGameStore.getState().settings.showUi;
    act(() =>
      storeModule.useGameStore.setState({
        settings: { ...defaultSettings, showUi: false },
      }),
    );

    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Pause')).toBeVisible();
    await userEvent.click(screen.getByLabelText('toggle settings button'));
    expect(await screen.findByText('Always show UI')).toBeVisible();
    const UIButton = await screen.findByText('Always show UI');
    await userEvent.click(UIButton);

    await waitFor(() => expect(showsUI()).toBe(true));
  });

  it('toggles always on UI off', async () => {
    render(<Menu />);
    const showsUI = () => storeModule.useGameStore.getState().settings.showUi;
    act(() =>
      storeModule.useGameStore.setState({
        settings: { ...defaultSettings, showUi: true },
      }),
    );

    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Pause')).toBeVisible();
    await userEvent.click(screen.getByLabelText('toggle settings button'));
    expect(await screen.findByText('Always show UI')).toBeVisible();
    const UIButton = await screen.findByText('Always show UI');
    await userEvent.click(UIButton);

    await waitFor(() => expect(showsUI()).toBe(false));
  });

  it('toggles autocast on', async () => {
    render(<Menu />);
    act(() => {
      storeModule.useGameStore.setState({
        settings: { ...defaultSettings, automateSkillCast: false },
      });
    });

    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Pause')).toBeVisible();
    await userEvent.click(screen.getByLabelText('toggle settings button'));
    expect(await screen.findByText('Autocast')).toBeVisible();
    const autocastButton = await screen.findByText('Autocast');
    await userEvent.click(autocastButton);

    await waitFor(() =>
      expect(
        storeModule.useGameStore.getState().settings.automateSkillCast,
      ).toBe(true),
    );
  });

  it('toggles autocast off', async () => {
    render(<Menu />);
    act(() => {
      storeModule.useGameStore.setState({
        settings: { ...defaultSettings, automateSkillCast: true },
      });
    });

    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Pause')).toBeVisible();
    await userEvent.click(screen.getByLabelText('toggle settings button'));
    expect(await screen.findByText('Autocast')).toBeVisible();
    const autocastButton = await screen.findByText('Autocast');
    await userEvent.click(autocastButton);

    await waitFor(() =>
      expect(
        storeModule.useGameStore.getState().settings.automateSkillCast,
      ).toBe(false),
    );
  });
});
