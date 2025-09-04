import Bar from '@/components/reusable/Bar';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

const observe = vi.fn();
const disconnect = vi.fn();

vi.stubGlobal(
  'ResizeObserver',
  class {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(_callback: ResizeObserverCallback) {}
    observe = observe;
    disconnect = disconnect;
  },
);

describe('<Bar />', () => {
  it('renders Bar', async () => {
    render(<Bar value={100} maxValue={100} showValues={true} />);
    expect(screen.getByText('100/100')).toBeInTheDocument();
    expect(observe).toHaveBeenCalled();
  });

  it('displays label', async () => {
    render(<Bar value={100} maxValue={100} showValues={true} label="Health" />);
    expect(screen.getByText('Health')).toBeInTheDocument();
  });

  it('Renders size lg correct height', () => {
    render(
      <Bar
        value={100}
        maxValue={100}
        showValues={true}
        size="lg"
        label={'Health'}
      />,
    );
    const bar = screen.getByLabelText('Health bar');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveStyle({ height: '32px' });
  });
  it('Renders size md correct height', () => {
    render(
      <Bar
        value={100}
        maxValue={100}
        showValues={true}
        size="md"
        label={'Health'}
      />,
    );
    const bar = screen.getByLabelText('Health bar');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveStyle({ height: '24px' });
  });
  it('Renders size sm correct height', () => {
    render(
      <Bar
        value={100}
        maxValue={100}
        showValues={true}
        size="sm"
        label={'Health'}
      />,
    );
    const bar = screen.getByLabelText('Health bar');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveStyle({ height: '16px' });
  });
});
