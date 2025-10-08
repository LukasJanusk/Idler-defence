import ParticleContextProvider from '@/context/ParticleContextProvider';
import Game from '@/components/Game';

function GamePage() {
  return (
    <div className="flex flex-grow items-center justify-center bg-gray-400">
      <div className="relative">
        <ParticleContextProvider>
          <Game />
        </ParticleContextProvider>
      </div>
    </div>
  );
}

export default GamePage;
