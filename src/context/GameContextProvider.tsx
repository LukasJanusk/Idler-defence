import { useEffect, useReducer, useRef, useState } from 'react';
import { initializeGameState } from '../defaults';
import { gameReducer } from '../gameReducer';
import { GameContext } from './useGameContext';
import ProjectileSprite from '../ProjectileSprite';
import { createFireBall, Projectile } from '../projectile';
import { useParticles } from '../hooks/useParticles';

type GameContextProps = { children: React.ReactNode };

export function GameContextProvider({ children }: GameContextProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [state, dispatch] = useReducer(gameReducer, null, initializeGameState);
  const canvasRef = useRef(null);

  const addFireBall = () => {
    const onHit = (proj: Projectile) => {
      splashEmb(proj.rect.x, proj.rect.y, 5);
      proj.animation.onEnd = () => {
        splashEmb(proj.rect.x, proj.rect.y, 10);
      };
    };
    const fireball = createFireBall(mouse.x, mouse.y, 800, 500, onHit);
    dispatch({ type: 'ADD_PROJECTILES', payload: [fireball] });
  };
  const value = {
    state,
    dispatch,
  };
  const { splashEmb } = useParticles(canvasRef);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      setMouse({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('mousemove', handleMove);

    return () => window.removeEventListener('mousemove', handleMove);
  });
  useEffect(() => {
    function handleClick() {
      addFireBall();
    }
    window.addEventListener('mousedown', handleClick);

    return () => window.removeEventListener('mousedown', handleClick);
  });

  useEffect(() => {
    setInterval(() => {}, 2000);
  });
  return (
    <GameContext.Provider value={value}>
      <div className="relative h-full w-full">
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
          className="border-red absolute left-0 top-0 z-10 h-full w-full border-2"
        />
        <span className="fixed left-0 top-0 z-20">{`x: ${mouse.x}, y: ${mouse.y}`}</span>
        {state.projectiles.map((proj) => {
          if (proj.isAlive)
            return <ProjectileSprite projectile={proj} key={proj.id} />;
        })}
        {children}{' '}
      </div>
    </GameContext.Provider>
  );
}
