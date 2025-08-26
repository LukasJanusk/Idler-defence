import type { Rect } from './types';

export function getRectMiddle(rect: Rect): { x: number; y: number } {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
}

export function collideRect(a: Rect, b: Rect): boolean {
  return !(
    a.x + a.width < b.x ||
    a.x > b.x + b.width ||
    a.y + a.height < b.y ||
    a.y > b.y + b.height
  );
}

export function setupDeathResurrect<T extends { death: any; resurrect: any }>(
  animations: T,
  setState: (state: 'idle' | 'dead') => void,
) {
  animations.death.onFrame(animations.death.nFrame - 1, () => setState('dead'));
  animations.resurrect.onFrame(animations.resurrect.nFrame - 1, () =>
    setState('idle'),
  );
}
