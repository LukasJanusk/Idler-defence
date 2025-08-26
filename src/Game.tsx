import { useParticleContext } from '@/context/ParticleContext';

import { useEffect, useState } from 'react';
// import EnemyComponent from './EnemyComponent';
// import { createZombieOne } from './defaults';
import { useGameStore } from './store';
import CharacterScreen from './components/CharacterScreen';
import { GAME_HEIGHT, GAME_WIDTH } from './constants';
import Button from './components/reusable/Button';
import { createZombieOne } from './defaults';
import EnemyComponent from './EnemyComponent';
import ProjectileComponent from './components/ProjectileComponent';

export default function Game() {
  const grid = useGameStore((store) => store.grid);
  const [showGrid, setShowGrid] = useState(false);
  const { splashBlood, splashEmbers } = useParticleContext();
  const addEnemy = () => grid.addEnemies(2, 8, [createZombieOne()]);
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
        <Button onClick={() => splashEmbers(600, 200, 100)}>
          Splash embers
        </Button>
        <Button onClick={() => splashBlood(500, 200, 100)}>Splash blood</Button>
        <Button onClick={() => setShowGrid((prev) => !prev)}>
          Toggle grid
        </Button>
        <Button onClick={addEnemy}>Spawn enemy</Button>
      </div>
      <div className="pointer-events-none left-0 top-0 grid grid-cols-9 grid-rows-5 bg-transparent">
        {showGrid &&
          Array.from({ length: 45 }).map((_, index) => (
            <div
              key={index}
              className="absolure box-border h-[128px] w-[128px] border-2 border-red-500 bg-transparent"
            ></div>
          ))}
      </div>{' '}
      <ProjectileComponent />
      <EnemyComponent />
    </div>
  );
}
