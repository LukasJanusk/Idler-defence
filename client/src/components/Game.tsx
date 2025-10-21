import { useState } from 'react';
import { GAME_HEIGHT, GAME_WIDTH } from '@/constants';
import SplashScreen from './reusable/SplashScreen';
import Level from './Level';
import MainMenu from './MainMenu/MainMenu';
import { useGameStore } from '@/store';
import LevelSelectScreen from './LevelSelect/LevelSelectScreen';

const levels = [
  { id: 0, name: 'Tutorial', locked: false },
  { id: 1, name: 'Level 1', locked: true },
  { id: 2, name: 'Level 2', locked: true },
  { id: 3, name: 'Level 3', locked: true },
  { id: 4, name: 'Level 4', locked: true },
];

export default function Game() {
  const [splashVisible, setSplashVisible] = useState(true);
  const [levelSelected, setLevelSelected] = useState(false);

  const gameStarted = useGameStore((store) => store.gameStarted);
  const setGameStarted = useGameStore((store) => store.setGameStarted);

  const enterLevelSelect = (inLevelSelect?: boolean) => {
    setLevelSelected(inLevelSelect ?? true);
  };
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
      {!gameStarted && levelSelected && (
        <LevelSelectScreen
          levels={levels}
          startGame={startGame}
          returnToMenu={() => {
            setLevelSelected(false);
            setGameStarted(false);
          }}
        />
      )}
      {!levelSelected && (
        <MainMenu startGame={enterLevelSelect} gameStarted={gameStarted} />
      )}
      {gameStarted && levelSelected && <Level />}
    </div>
  );
}
