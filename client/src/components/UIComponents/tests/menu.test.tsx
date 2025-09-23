import Menu from '@/components/UIComponents/Menu';
import { describe, it, expect, beforeEach } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import * as storeModule from '@/store';
import { defaultSettings } from '@/defaults';
import { userEvent } from 'storybook/internal/test';

beforeEach(() => {
  storeModule.useGameStore.setState({
    settings: { ...defaultSettings },
  });
});

describe('<Menu />', () => {
  it('renders Menu', async () => {
    render(<Menu />);
    expect(screen.getByLabelText('Menu button')).toBeInTheDocument();
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

    await userEvent.click(screen.getByText('Help'));
    expect(screen.queryByText('Guidebook')).toBe(null);
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
