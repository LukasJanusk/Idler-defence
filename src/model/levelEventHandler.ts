import type { GameClock } from './gameClock';

export type LevelEvent = {
  time: number;
  callback: (handler?: LevelEventHandler) => void;
  withHandler?: boolean;
};

export class LevelEventHandler {
  events: Set<LevelEvent> = new Set();
  elapsed: number = 0;
  running: boolean = false;
  duration: number = 3000000;
  onLevelEnd?: () => void;

  constructor(
    gameClock: GameClock,
    callbacks?: Set<LevelEvent>,
    duration?: number,
  ) {
    if (callbacks) this.events = callbacks;
    if (duration) this.duration = duration;
    gameClock.subscribe((dt: number) => this.tick(dt));
  }
  registerEvent(cb: LevelEvent) {
    this.events.add(cb);
  }
  registerLevel(events: Set<LevelEvent>) {
    this.events = events;
  }

  stop() {
    this.running = false;
  }
  start() {
    this.running = true;
  }
  reset() {
    this.running = false;
    this.events = new Set();
    this.duration = 3000000;
    this.onLevelEnd = () => {};
    this.elapsed = 0;
  }
  tick(dt: number) {
    if (!this.running) return;
    if (this.elapsed > this.duration) this.running = false;
    const toDelete: LevelEvent[] = [];
    this.elapsed += dt;
    this.events.forEach((cb) => {
      if (cb.time <= this.elapsed) {
        if (cb.withHandler) {
          cb.callback(this);
        } else {
          cb.callback();
        }
        toDelete.push(cb);
      }
    });
    toDelete.forEach((cb) => this.events.delete(cb));
  }
}
