import '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import 'vitest-canvas-mock';
import { vi } from 'vitest';

Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
  configurable: true,
  writable: true,
  value: vi.fn().mockResolvedValue(undefined), // mock promise-returning play()
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  writable: true,
  value: vi.fn(),
});
