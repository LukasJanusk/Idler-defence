import bg from './assets/bg_castle.jpg';
import PartyMember from './PartyMember';
import { useGameContext } from './context/useGameContext';
import { useParticleContext } from './context/ParticleContext';

export default function Game() {
  const { state } = useGameContext();
  const { splashBlood } = useParticleContext();

  return (
    <div
      style={{
        width: 1152,
        height: 640,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img src={new URL(bg, import.meta.url).href}></img>

      <div className="absolute left-0 top-0 z-10 grid grid-cols-9 grid-rows-5">
        {Array.from({ length: 45 }).map(() => (
          <div className="box-border h-[128px] w-[128px] border-2 border-red-500"></div>
        ))}
        {/* <PartyMember position={'pos4'} character={state.party.pos4} />
        <PartyMember position={'pos3'} character={state.party.pos3} />
        <PartyMember position={'pos2'} character={state.party.pos2} />
        <PartyMember position={'pos1'} character={state.party.pos1} /> */}
        <button
          onClick={() => splashBlood(200, 200, 100)}
          className="z-1000 border-transaprent absolute right-20 rounded-xl border-2 bg-gray-500 p-2 font-bold text-white hover:bg-gray-300"
        >
          Splash Blood
        </button>
      </div>
    </div>
  );
}
