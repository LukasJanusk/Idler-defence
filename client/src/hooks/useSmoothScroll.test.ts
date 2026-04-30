import { describe, expect, it } from 'vitest';
import { calculateScrollLeft } from '@/hooks/useSmoothScroll';

describe('calculateScrollLeft', () => {
  it('keeps the first card pinned to the left edge', () => {
    expect(
      calculateScrollLeft({
        itemOffsetLeft: 0,
        itemWidth: 320,
        containerWidth: 960,
        scrollWidth: 3200,
      }),
    ).toBe(0);
  });

  it('centers a middle card when there is enough space to scroll', () => {
    expect(
      calculateScrollLeft({
        itemOffsetLeft: 984,
        itemWidth: 320,
        containerWidth: 960,
        scrollWidth: 3200,
      }),
    ).toBe(664);
  });

  it('keeps the last card pinned to the right edge', () => {
    expect(
      calculateScrollLeft({
        itemOffsetLeft: 2880,
        itemWidth: 320,
        containerWidth: 960,
        scrollWidth: 3200,
      }),
    ).toBe(2240);
  });
});
