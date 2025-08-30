import { useState } from 'react';
import { useGameStore } from './store';
import CharacterScreen from './components/CharacterScreen';
import { GAME_HEIGHT, GAME_WIDTH } from './constants';
import EnemyComponent from './components/EnemyComponent';
import ProjectileComponent from './components/ProjectileComponent';
import useGrid from './hooks/useGrid';
import GoldDisplay from './components/GoldDisplay';
import NextWaveButton from './components/NextWaveButton';
import Menu from './components/Menu';
import WaveDisplay from './components/WaveDisplay';
import Alert from './components/reusable/Alert';
import GameOver from './components/GameOver';

export default function Game() {
  const settings = useGameStore((store) => store.settings);
  const [alert, setAlert] = useState<null | string>(null);
  const { enemies, projectiles, party } = useGrid();
  const pause = useGameStore((store) => store.pause);
  const play = useGameStore((store) => store.play);

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
      <GoldDisplay />
      <WaveDisplay />
      <GameOver />
      <Menu />
      {alert && (
        <Alert
          message={alert || ''}
          onClose={() => {
            setAlert(null);
            play();
          }}
        />
      )}
      <EnemyComponent enemies={enemies}>
        <ProjectileComponent projectiles={projectiles}>
          <CharacterScreen
            party={party}
            onAlert={(message: string | null) => {
              setAlert(message);
              pause();
            }}
          />
          <NextWaveButton />
          <div className="pointer-events-none left-0 top-0 grid grid-cols-9 grid-rows-5">
            {settings.showGrid &&
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
