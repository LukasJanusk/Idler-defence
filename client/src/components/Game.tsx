import { useState } from 'react';
import { GAME_HEIGHT, GAME_WIDTH } from '@/constants';
import SplashScreen from './reusable/SplashScreen';
import Level from './Level';
import MainMenu from './MainMenu/MainMenu';
import { useGameStore } from '@/store';

export default function Game() {
  const [splashVisible, setSplashVisible] = useState(true);
  const gameStarted = useGameStore((store) => store.gameStarted);
  const setGameStarted = useGameStore((store) => store.setGameStarted);

  const startGame = () => {
    setGameStarted(true);
  };

  if (splashVisible && !gameStarted) {
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
        <div className="relative flex h-full w-full items-center justify-center">
          <SplashScreen
            splashVisible={splashVisible}
            setSplashVisible={setSplashVisible}
          />
        </div>
      </div>
    );
  }
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
      {gameStarted ? (
        <Level />
      ) : (
        <MainMenu startGame={startGame} gameStarted={gameStarted} />
      )}
    </div>
  );
}
