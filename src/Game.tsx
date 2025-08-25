import { useParticleContext } from '@/context/ParticleContext';
import ProjectileSprite from './ProjectileSprite';
import { useEffect, useState } from 'react';
// import EnemyComponent from './EnemyComponent';
// import { createZombieOne } from './defaults';
import { useGameStore } from './store';
import CharacterScreen from './components/CharacterScreen';
import { GAME_HEIGHT, GAME_WIDTH } from './constants';

export default function Game() {
  const grid = useGameStore((store) => store.grid);
  const [showGrid, setShowGrid] = useState(false);
  const { splashBlood, splashEmbers } = useParticleContext();

  // const enemy = createZombieOne();
  const gameClock = useGameStore((store) => store.gameClock);

  useEffect(() => {
    gameClock.start();
    return () => {
      gameClock.stop();
    };
  }, [gameClock]);

  return (
    <div
      style={{
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        position: 'relative',
        overflow: 'hidden',
      }}
      className="border-2 border-medieval-silver"
    >
      <CharacterScreen />
      <div className="absolute left-0 top-0 flex flex-row">
        {' '}
        <button
          onClick={() => splashBlood(500, 200, 100)}
          className="border-2 border-medieval-silver bg-medieval-stone p-2 font-bold text-medieval-parchment transition-all duration-200 hover:scale-105 hover:bg-medieval-stoneCrimson active:scale-95"
        >
          Splash Blood
        </button>
        <button
          className="border-2 border-medieval-silver bg-medieval-stone p-2 font-bold text-medieval-parchment transition-all duration-200 hover:scale-105 hover:bg-medieval-stoneCrimson active:scale-95"
          onClick={() => setShowGrid((prev) => !prev)}
        >
          Toggle grid
        </button>
        <button
          onClick={() => splashEmbers(600, 200, 100)}
          className="border-2 border-medieval-silver bg-medieval-stone p-2 font-bold text-medieval-parchment transition-all duration-200 hover:scale-105 hover:bg-medieval-stoneCrimson active:scale-95"
        >
          Splash Embers
        </button>
      </div>

      <div className="pointer-events-none left-0 top-0 grid grid-cols-9 grid-rows-5">
        {showGrid &&
          Array.from({ length: 45 }).map((_, index) => (
            <div
              key={index}
              className="absolure box-border h-[128px] w-[128px] border-2 border-red-500"
            ></div>
          ))}
      </div>

      {/* <EnemyComponent enemy={enemy} /> */}

      {grid.grid
        .flat()
        .map((area) =>
          area.projectiles.map((proj) =>
            proj.isAlive ? (
              <ProjectileSprite key={proj.id} projectile={proj} />
            ) : null,
          ),
        )}
    </div>
  );
}
