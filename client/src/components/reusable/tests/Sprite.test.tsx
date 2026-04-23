import Sprite from '@/components/reusable/Sprite';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createWizardAnimations } from '@/model/animations/wizardAnimations';

const animations = createWizardAnimations();
const idle = animations.idle;

describe('<Sprite />', () => {
  it('renders Sprite', async () => {
    idle.sheet.width = 1024;
    idle.sheet.height = 128;
    render(<Sprite entity="character" animation={idle} />);
    expect(
      await screen.findByAltText('character animation'),
    ).toBeInTheDocument();
  });

  it('renders nothing until sprite is loaded', () => {
    idle.sheet.width = 0;
    idle.sheet.height = 0;
    const { container } = render(
      <Sprite entity="character" animation={idle} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
