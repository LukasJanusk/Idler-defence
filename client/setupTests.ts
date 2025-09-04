import { vi } from 'vitest';
import '@testing-library/react';
import '@testing-library/jest-dom/vitest';

class MockAudio {
  currentTime = 0;
  play = vi.fn();
  pause = vi.fn();
  load = vi.fn();
}

class MockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  src = '';
}
vi.stubGlobal('Audio', MockAudio);
vi.stubGlobal('Image', MockImage);
