import { useEffect, useRef } from 'react';
import { useParticles } from './useParticles';
import { PartyMember } from './PartyMember';
import { useGameContext } from './useGameContext';

function App() {
  const { state } = useGameContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splash = useParticles(canvasRef);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      splash(e.x, e.y, 100);
    };
    const canvas = canvasRef.current;
    canvas?.addEventListener('mousedown', handleClick);

    return () => {
      canvas?.removeEventListener('mousedown', handleClick);
    };
  }, [splash, canvasRef]);
  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
          className="absolute left-0 top-0 z-0 h-full w-full"
        />
        <div className="absolute bottom-0 left-0 z-10 grid h-[400px] w-[480px] grid-cols-4 grid-rows-1 border-2 border-gray-500">
          <PartyMember position={'pos4'} character={state.party.pos4} />
          <PartyMember position={'pos3'} character={state.party.pos3} />
          <PartyMember position={'pos2'} character={state.party.pos2} />
          <PartyMember position={'pos1'} character={state.party.pos1} />
        </div>
      </div>
    </>
  );
}

export default App;
