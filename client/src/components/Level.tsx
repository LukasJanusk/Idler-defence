import Menu from '@/components/UIComponents/Menu';
import GameOver from '@/components/GameOver/GameOver';
import GoldDisplay from '@/components/UIComponents/GoldDisplay';
import WaveDisplay from '@/components/UIComponents/WaveDisplay';
import Alert from '@/components/reusable/Alert';
import ProjectileComponent from '@/components/ProjectileComponent/ProjectileComponent';
import EnemyComponent from '@/components/EnemyComponent/EnemyComponent';
import CharacterScreen from '@/components/CharacterScreen/CharacterScreen';
import { useGameStore } from '@/store';
import { useEffect, useState } from 'react';
import useGrid from '@/hooks/useGrid';
import NextWaveButton from '@/components/UIComponents/NextWaveButton';
import { GAME_HEIGHT, GAME_WIDTH } from '@/constants';

export default function Level() {
  const settings = useGameStore((store) => store.settings);
  const [wasPaused, setWasPaused] = useState<boolean>(false);
  const [alert, setAlert] = useState<null | string>(null);
  const { enemies, projectiles, party } = useGrid();
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
