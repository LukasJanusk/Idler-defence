import { useParticleContext } from '@/context/ParticleContext';
import { useEffect, useState } from 'react';
import { useGameStore } from './store';
import CharacterScreen from './components/CharacterScreen';
import { GAME_HEIGHT, GAME_WIDTH } from './constants';
import Button from './components/reusable/Button';
import { createZombieOne } from './defaults';
import EnemyComponent from './components/EnemyComponent';
import ProjectileComponent from './components/ProjectileComponent';
import useGrid from './hooks/useGrid';
import GoldDisplay from './components/GoldDisplay';
import NextWaveButton from './components/NextWaveButton';

export default function Game() {
  const [live, setLive] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const {
    splashBlood,
    splashEmbers,
    splashArcane,
    splashHealth,
    splashMagic,
    splashSparks,
  } = useParticleContext();
  const setSettings = useGameStore((store) => store.setSettings);
  const play = useGameStore((store) => store.play);
  const pause = useGameStore((store) => store.pause);
  const automate = useGameStore((store) => store.settings.automateSkillCast);
  const gameClock = useGameStore((store) => store.gameClock);
  const { grid, enemies, projectiles, party } = useGrid();
  const addGold = useGameStore((store) => store.addGold);
  const toggleAutomate = () => {
    setSettings({ automateSkillCast: !automate });
  };
  const createZombie = () => {
    const zombie = createZombieOne();
    zombie.onDeath.add(() => {
      addGold(zombie.bounty);
    });
    return zombie;
  };
  const addEnemy = () => grid.addEnemies(2, 8, [createZombie()]);
  const gamePause = () => {
    setLive(false);
    pause();
  };
  const gamePlay = () => {
    setLive(true);
    play();
  };
  const gameNextLevel = () => {
    setLive(true);
  };
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
      <EnemyComponent enemies={enemies}>
        <ProjectileComponent projectiles={projectiles}>
          <GoldDisplay />

          <CharacterScreen party={party} />
          <NextWaveButton onClick={gameNextLevel} />
          <div className="absolute left-0 top-0 flex max-w-[512px] flex-row flex-wrap">
            <Button onClick={() => splashEmbers(600, 200, 100)}>
              Splash embers
            </Button>
            <Button onClick={() => splashBlood(500, 200, 100)}>
              Splash blood
            </Button>
            <Button onClick={() => splashHealth(500, 200, 100)}>
              Splash health
            </Button>
            <Button onClick={() => splashArcane(500, 200, 100)}>
              Splash arcane
            </Button>
            <Button onClick={() => splashMagic(500, 200, 100)}>
              Splash magic
            </Button>
            <Button onClick={() => splashSparks(500, 200, 100)}>
              Splash sparks
            </Button>
            <Button onClick={() => setShowGrid((prev) => !prev)}>
              Toggle grid
            </Button>
            <Button onClick={addEnemy}>Spawn enemy</Button>
          </div>
          <div className="absolute right-0 top-0 flex flex-row">
            <Button
              onClick={() => {
                if (live) {
                  gamePause();
                } else {
                  gamePlay();
                }
              }}
            >
              {live ? 'Pause' : 'Resume'}
            </Button>

            <Button
              onClick={toggleAutomate}
            >{`Automate - ${automate ? 'Off' : 'On'}`}</Button>
          </div>
          <div className="pointer-events-none left-0 top-0 grid grid-cols-9 grid-rows-5">
            {showGrid &&
              Array.from({ length: 45 }).map((_, index) => (
                <div
                  key={index}
                  className="absolure box-border h-[128px] w-[128px] border-[1px] border-red-500"
                ></div>
              ))}
          </div>
        </ProjectileComponent>
      </EnemyComponent>
    </div>
  );
}
