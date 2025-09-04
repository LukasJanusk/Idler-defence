import Sprite from '@/components/reusable/Sprite';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createWizardAnimations } from '@/model/animations/wizardAnimations';

import * as useSpriteLoadModule from '@/hooks/useSpriteLoad';

const animations = createWizardAnimations();
const idle = animations.idle;

const mockSubscribe = vi.fn();
const mockUnsubscribe = vi.fn();
const mockGameClock = {
  running: true,
  subscribe: mockSubscribe,
  unsubscribe: mockUnsubscribe,
};

vi.mock('@/store', () => ({
  useGameStore: vi.fn(() => mockGameClock),
}));

describe('<Sprite />', () => {
  it('renders Sprite', async () => {
    vi.spyOn(useSpriteLoadModule, 'default').mockReturnValue({
      width: 128,
      height: 128,
    });
    render(<Sprite entity="character" animation={idle} />);
    expect(
      await screen.findByAltText('character animation'),
    ).toBeInTheDocument();
  });

  it('displays loading icon until sprite is loaded', async () => {
    vi.spyOn(useSpriteLoadModule, 'default').mockReturnValue(null);
    render(<Sprite entity="character" animation={idle} />);
    expect(await screen.findByLabelText('loading')).toBeInTheDocument();
  });
});
