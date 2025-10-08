import { useState } from 'react';
import { GAME_HEIGHT, GAME_WIDTH } from '@/constants';
import SplashScreen from './reusable/SplashScreen';
import Level from './Level';

export default function Game() {
  const [splashVisible, setSplashVisible] = useState(true);

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
        <Level />
      )}
    </div>
  );
}
