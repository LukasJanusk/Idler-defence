import ErrorComponent from '@/components/reusable/ErrorComponent';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<ErrorComponent />', () => {
  it('renders ErrorComponent', async () => {
    render(<ErrorComponent onClose={() => {}} message="Connection error" />);
    expect(screen.getByText('Connection error')).toBeInTheDocument();
  });

  it('executes onClose callback when closed', async () => {
    const onClick = vi.fn();
    render(<ErrorComponent onClose={onClick} message="Connection Error" />);

    await userEvent.click(screen.getByLabelText('Close modal'));

    expect(onClick).toHaveBeenCalled();
  });

  it('executes renders action button and executes action callback when clicked', async () => {
    const onClick = vi.fn();
    render(
      <ErrorComponent
        onClose={() => {}}
        action={{ name: 'Do something', handle: onClick }}
        message="Connection Error"
      />,
    );

    await userEvent.click(screen.getByText('Do something'));

    expect(onClick).toHaveBeenCalled();
  });
});
