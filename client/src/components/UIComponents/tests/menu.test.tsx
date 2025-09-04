import Menu from '@/components/UIComponents/Menu';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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

  it('Opens/closes Guidebook when help button pressed', async () => {
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
    storeModule.useGameStore.setState({
      settings: { ...defaultSettings, showGrid: false },
    });
    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Grid')).toBeVisible();
    const gridButton = await screen.findByText('Grid');

    await userEvent.click(gridButton);
    await waitFor(() => expect(showGrid()).toBe(true));
  });
  it('toggles grid off', async () => {
    render(<Menu />);
    const showGrid = () =>
      storeModule.useGameStore.getState().settings.showGrid;
    storeModule.useGameStore.setState({
      settings: { ...defaultSettings, showGrid: true },
    });
    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Grid')).toBeVisible();
    const gridButton = await screen.findByText('Grid');

    await userEvent.click(gridButton);
    await waitFor(() => expect(showGrid()).toBe(false));
  });

  it('toggles particles on', async () => {
    render(<Menu />);
    const drawParticles = () =>
      storeModule.useGameStore.getState().settings.drawParticles;
    storeModule.useGameStore.setState({
      settings: { ...defaultSettings, drawParticles: false },
    });
    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Particles')).toBeVisible();
    const particlesButton = await screen.findByText('Particles');

    await userEvent.click(particlesButton);
    await waitFor(() => expect(drawParticles()).toBe(true));
  });

  it('toggles particles off', async () => {
    render(<Menu />);
    const drawParticles = () =>
      storeModule.useGameStore.getState().settings.drawParticles;
    storeModule.useGameStore.setState({
      settings: { ...defaultSettings, drawParticles: true },
    });
    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Particles')).toBeVisible();
    const particlesButton = await screen.findByText('Particles');

    await userEvent.click(particlesButton);
    await waitFor(() => expect(drawParticles()).toBe(false));
  });

  it('toggles always on UI on', async () => {
    render(<Menu />);
    const showUI = () => storeModule.useGameStore.getState().settings.showUi;
    storeModule.useGameStore.setState({
      settings: { ...defaultSettings, showUi: false },
    });
    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Always show UI')).toBeVisible();
    const UIButton = await screen.findByText('Always show UI');

    await userEvent.click(UIButton);
    await waitFor(() => expect(showUI()).toBe(true));
  });

  it('toggles always on UI off', async () => {
    render(<Menu />);
    const showUI = () => storeModule.useGameStore.getState().settings.showUi;
    storeModule.useGameStore.setState({
      settings: { ...defaultSettings, showUi: true },
    });
    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Always show UI')).toBeVisible();
    const UIButton = await screen.findByText('Always show UI');

    await userEvent.click(UIButton);
    await waitFor(() => expect(showUI()).toBe(false));
  });

  it('toggles autocast on', async () => {
    render(<Menu />);
    const autocast = () =>
      storeModule.useGameStore.getState().settings.automateSkillCast;
    storeModule.useGameStore.setState({
      settings: { ...defaultSettings, automateSkillCast: false },
    });
    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Autocast')).toBeVisible();
    const autocastButton = await screen.findByText('Autocast');

    await userEvent.click(autocastButton);
    await waitFor(() => expect(autocast()).toBe(true));
  });

  it('toggles autocast off', async () => {
    render(<Menu />);
    const autocast = () =>
      storeModule.useGameStore.getState().settings.automateSkillCast;
    storeModule.useGameStore.setState({
      settings: { ...defaultSettings, automateSkillCast: true },
    });
    await userEvent.click(screen.getByLabelText('Menu button'));
    expect(await screen.findByText('Autocast')).toBeVisible();
    const autocastButton = await screen.findByText('Autocast');

    await userEvent.click(autocastButton);
    await waitFor(() => expect(autocast()).toBe(false));
  });
});
