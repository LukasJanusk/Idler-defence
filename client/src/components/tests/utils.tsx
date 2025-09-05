import { vi } from 'vitest';

export const mockResizeObserver = () => {
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
};

export const mockCustomBorders = () => {
  vi.mock('@/assets/large_border.svg?react', () => {
    return {
      ReactComponent: () => (
        <div data-testid="large-border" className="pointer-events-none" />
      ),
    };
  });
  vi.mock('@/assets/skill_border.svg?react', () => {
    return {
      ReactComponent: () => (
        <div data-testid="skill_border" className="pointer-events-none" />
      ),
    };
  });
};
