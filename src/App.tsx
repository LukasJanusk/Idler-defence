import ParticleContextProvider from './context/ParticleContextProvider';
import Game from './Game';

function App() {
  return (
    <div className="flex h-screen flex-col">
      <header className="h-16 w-screen bg-medieval-wood"></header>
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
