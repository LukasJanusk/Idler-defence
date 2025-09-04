import ParticleContextProvider from './context/ParticleContextProvider';
import Game from './components/Game';

function App() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-16 w-screen items-center bg-medieval-wood px-6 text-2xl font-bold text-medieval-parchment">
        {' '}
        Idler defence
      </header>
      <div className="flex flex-grow items-center justify-center bg-gray-400">
        <div className="relative">
          <ParticleContextProvider>
            <Game />
          </ParticleContextProvider>
        </div>
      </div>
      <footer className="h-8 bg-medieval-wood"></footer>
    </div>
  );
}

export default App;
