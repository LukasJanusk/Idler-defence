import { useEffect, useState } from 'react';
import { useGameStore } from '@/store';
import CharacterScreen from './CharacterScreen/CharacterScreen';
import { GAME_HEIGHT, GAME_WIDTH } from '@/constants';
import EnemyComponent from './EnemyComponent/EnemyComponent';
import ProjectileComponent from './ProjectileComponent/ProjectileComponent';
import useGrid from '@/hooks/useGrid';
import GoldDisplay from './UIComponents/GoldDisplay';
import NextWaveButton from './UIComponents/NextWaveButton';
import Menu from './UIComponents/Menu';
import WaveDisplay from './UIComponents/WaveDisplay';
import Alert from './reusable/Alert';
import GameOver from './GameOver/GameOver';
import SplashScreen from './reusable/SplashScreen';

export default function Game() {
  const settings = useGameStore((store) => store.settings);
  const [wasPaused, setWasPaused] = useState<boolean>(false);
  const [alert, setAlert] = useState<null | string>(null);
  const { enemies, projectiles, party } = useGrid();
  const [splashVisible, setSplashVisible] = useState(true);
  const pause = useGameStore((store) => store.pause);
  const play = useGameStore((store) => store.play);

  useEffect(() => {
    const handleBlur = () => {
      if (settings.pause) {
        setWasPaused(true);
      }
      pause();
    };
    const handleFocus = () => {
      if (!wasPaused) {
        play();
      }
      setWasPaused(false);
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [play, pause, wasPaused, settings.pause]);

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
      {splashVisible ? (
        <div className="relative flex h-full w-full items-center justify-center">
          <SplashScreen
            splashVisible={splashVisible}
            setSplashVisible={setSplashVisible}
          />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
