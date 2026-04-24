import { UPDATE_RATE } from '@/constants';
import type { GridRenderer } from '@/model/gridRenderer';
import { useGameStore } from '@/store';
import { isLevelCleared } from '@/utils';
import { useEffect, useRef, useState } from 'react';

type RenderState = ReturnType<GridRenderer['getRenderState']> & {
  frameVersion: number;
};

export function useGameRenderer(
  ref: React.RefObject<HTMLCanvasElement | null>,
) {
  const gameClock = useGameStore((store) => store.gameClock);
  const grid = useGameStore((store) => store.grid);
  const gridRenderer = useGameStore((store) => store.gridRenderer);
  const settings = useGameStore((store) => store.settings);
  const setGameOver = useGameStore((store) => store.setGameOver);
  const currentLevel = useGameStore((store) => store.currentLevel);
  const currentWave = useGameStore((store) => store.currentWave);
  const levels = useGameStore((store) => store.levels);
  const levelEventHandler = useGameStore((store) => store.levelEventHandler);
  const gameOver = useGameStore((store) => store.gameOver);
  const elapsed = useRef(0);
  const [renderState, setRenderState] = useState<RenderState>(() => ({
    ...gridRenderer.getRenderState(),
    frameVersion: 0,
  }));

  useEffect(() => {
    const updateRenderState = () => {
      setRenderState((prev) => ({
        ...gridRenderer.getRenderState(),
        frameVersion: prev.frameVersion + 1,
      }));
    };

    updateRenderState();

    const onTick = (dt: number) => {
      const ctx = ref.current?.getContext('2d');

      if (grid.getEnemies().some((enemy) => enemy.rect.x < 0)) {
        setGameOver();
        return;
      }

      if (
        !gameOver &&
        isLevelCleared({
          grid,
          levels,
          currentLevel,
          currentWave,
          levelEventHandler,
        })
      ) {
        setGameOver();
        return;
      }

      if (!settings.pause) {
        elapsed.current += dt;
        if (elapsed.current >= UPDATE_RATE) {
          grid.update(dt);
          elapsed.current %= UPDATE_RATE;
        }

        gridRenderer.tickAnimations(dt);
      }

      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        gridRenderer.cleanup();
        gridRenderer.render(dt, ctx);
      }

      updateRenderState();
    };

    gameClock.subscribe(onTick);

    return () => {
      gameClock.unsubscribe(onTick);
    };
  }, [
    currentLevel,
    currentWave,
    gameClock,
    gameOver,
    grid,
    gridRenderer,
    levelEventHandler,
    levels,
    ref,
    setGameOver,
    settings.pause,
  ]);

  return {
    renderState,
    splashBlood: (x: number, y: number, n: number) => {
      gridRenderer.generateParticles('blood', x, y, n);
    },
    splashEmbers: (x: number, y: number, n: number) => {
      gridRenderer.generateParticles('ember', x, y, n);
    },
    splashArcane: (x: number, y: number, n: number) => {
      gridRenderer.generateParticles('arcane', x, y, n);
    },
    splashHealth: (x: number, y: number, n: number) => {
      gridRenderer.generateParticles('health', x, y, n);
    },
    splashMagic: (x: number, y: number, n: number) => {
      gridRenderer.generateParticles('magic', x, y, n);
    },
    splashSparks: (x: number, y: number, n: number) => {
      gridRenderer.generateParticles('spark', x, y, n);
    },
    splashLines: (x: number, y: number, n: number, arc?: number) => {
      gridRenderer.generateParticles('line', x, y, n, arc);
    },
    splashHollowSquares: (x: number, y: number, n: number) => {
      gridRenderer.generateParticles('hollowSquare', x, y, n);
    },
  };
}
