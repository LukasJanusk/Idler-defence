import ParticleContextProvider from '@/context/ParticleContextProvider';
import Game from '@/components/Game';

function GamePage() {
  return (
    <div className="flex flex-grow items-center justify-center bg-gradient-to-t from-medieval-arcane via-medieval-arcane/80 to-medieval-arcane">
      <div className="relative">
        <ParticleContextProvider>
          <Game />
        </ParticleContextProvider>
      </div>
    </div>
  );
}

export default GamePage;
