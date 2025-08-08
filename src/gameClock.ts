export class GameClock {
  private subscribers: Set<(dt: number) => void> = new Set();
  private last = performance.now();
  private running = false;
  private rafId: number | null = null;

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    const loop = () => {
      const now = performance.now();
      const dt = now - this.last;
      this.last = now;
      this.subscribers.forEach(sub => sub(dt));
      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }
  stop() {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
  subscribe(fn: (dt: number) => void) {
    this.subscribers.add(fn);
  }

  unsubscribe(fn: (dt: number) => void) {
    this.subscribers.delete(fn);
  }
}
