import type { WarriorActions } from './types';

function createSimpleReducer<T extends string>() {
  return (_state: T, action: { type: T }): T => {
    switch (action.type) {
      default:
        return action.type;
    }
  };
}

export const spriteReducer = createSimpleReducer<WarriorActions>();
