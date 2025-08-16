import { useEffect, useReducer, useState } from 'react';
import { initializeGameState } from '../defaults';
import { gameReducer } from '../gameReducer';
import { GameContext } from './useGameContext';
import ProjectileSprite from '../ProjectileSprite';
import { createFireBall, Projectile } from '../projectile';
import { useParticleContext } from './ParticleContext';

type GameContextProps = { children: React.ReactNode };

export function GameContextProvider({ children }: GameContextProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [state, dispatch] = useReducer(gameReducer, null, initializeGameState);
  const value = {
    state,
    dispatch,
  };

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      setMouse({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('mousemove', handleMove);

    return () => window.removeEventListener('mousemove', handleMove);
  });
  // useEffect(() => {
  //   const addFireBall = () => {
  //     const onHit = (proj: Projectile) => {
  //       splashEmbers(proj.rect.x, proj.rect.y, 5);
  //       proj.animation.onEnd = () => {
  //         splashEmbers(proj.rect.x, proj.rect.y, 10);
  //       };
  //     };
  //     const fireball = createFireBall(mouse.x, mouse.y, 800, 500, onHit);
  //     dispatch({ type: 'ADD_PROJECTILES', payload: [fireball] });
  //   };
  //   function spawnFireball() {
  //     addFireBall();
  //   }
  //   const id = setInterval(spawnFireball, 2000);

  //   return () => clearInterval(id);
  // }, [mouse.x, mouse.y, splashEmbers]);

  return (
    <GameContext.Provider value={value}>
      <div className="relative h-full w-full overflow-hidden">
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
