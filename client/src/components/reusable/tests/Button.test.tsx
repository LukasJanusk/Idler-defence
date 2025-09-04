import Button from '@/components/reusable/Button';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<Button />', () => {
  it('renders Button', async () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('executes onClick callback when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Test</Button>);

    await userEvent.click(screen.getByText('Test'));

    expect(onClick).toHaveBeenCalled();
  });

  it('it has classes passed with className prop', async () => {
    render(<Button className="test-class">Test</Button>);
    const button = screen.getByText('Test');

    expect(button).toHaveClass('test-class');
  });
});
