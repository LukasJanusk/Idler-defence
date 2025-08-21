import { GameContextProvider } from './context/GameContextProvider';
import { GameGridProvider } from './context/GameGridProvider';

import ParticleContextProvider from './context/ParticleContextProvider';
import Game from './Game';

function App() {
  return (
    <div className="flex flex-col">
      <header className="h-16 w-screen bg-blue-300/30"></header>
      <GameGridProvider>
        <ParticleContextProvider>
          <GameContextProvider>
            <div className="flex w-screen justify-center">
              <Game />
            </div>
          </GameContextProvider>
        </ParticleContextProvider>{' '}
      </GameGridProvider>
      <footer></footer>
    </div>
  );
}

export default App;
