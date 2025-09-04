import CloseButton from '@/components/reusable/CloseButton';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<CloseButton />', () => {
  it('renders CloseButton', async () => {
    render(<CloseButton />);
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  it('executes onClick callback when clicked', async () => {
    const onClick = vi.fn();
    render(<CloseButton onClose={onClick} />);

    await userEvent.click(screen.getByLabelText('Close modal'));

    expect(onClick).toHaveBeenCalled();
  });
});
