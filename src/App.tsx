import { useEffect, useReducer, useRef } from 'react';
import Sprite from './Sprite';
import { warriorAnimations } from './warriorAnimations';
import { spriteReducer } from './spriteReducer';
import { useParticles } from './useParticles';

function App() {
  const [state, dispatch] = useReducer(spriteReducer, 'idle');
  const setIdle = () => dispatch({ type: 'idle' });
  const setAttack = () => dispatch({ type: 'attack' });
  const setComboAttack = () => dispatch({ type: 'combo' });
  const setHit = () => dispatch({ type: 'hit' });
  const setDeath = () => dispatch({ type: 'death' });
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
      <div className="relative">
        <canvas
          className="absolute left-0 top-0"
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
        ></canvas>
        <div className="relative-0 left-0">
          <Sprite animations={warriorAnimations} state={state} scale={1} />
          <div className="absolute">
            <button
              className={`border-2 px-2 text-white  rounded border-transparent hover:border-blue-400 bg-black ${
                state === 'idle' ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={setIdle}
            >
              Idle
            </button>
            <button
              className={`border-2 px-2 text-white  rounded border-transparent hover:border-blue-400 bg-black ${
                state === 'attack' ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={setAttack}
            >
              Attack
            </button>
            <button
              className={`border-2 px-2 text-white  rounded border-transparent hover:border-blue-400 bg-black ${
                state === 'combo' ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={setComboAttack}
            >
              Combo
            </button>
            <button
              className={`border-2 px-2 text-white  rounded border-transparent hover:border-blue-400 bg-black ${
                state === 'hit' ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={setHit}
            >
              Hit
            </button>
            <button
              className={`border-2 px-2 text-white  rounded border-transparent hover:border-blue-400 bg-black ${
                state === 'death' ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={setDeath}
            >
              Death
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
