import bg from '@/assets/bg_castle.jpg';
import PartyMember from './PartyMember';
import { useParticleContext } from '@/context/ParticleContext';
import ProjectileSprite from './ProjectileSprite';
import { useMemo } from 'react';
import EnemyComponent from './EnemyComponent';
import { createZombieOne } from './defaults';
import { useGameStore } from './store';
import SkillButton from './SkillButton';
import fireballIcon from '@/assets/fireball_icon.svg?url';

export default function Game() {
  const grid = useGameStore((store) => store.grid);
  const { splashBlood } = useParticleContext();
  // const grid = useGameGridContext();
  // useGrid(grid);
  const enemy = useMemo(() => createZombieOne(), []);

  // console.log(
  //   grid.grid
  //     .flat()
  //     .map((area) => area.attacks)
  //     .flat().length,
  // );
  return (
    <div
      style={{
        width: 1152,
        height: 640,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* <img src={new URL(bg, import.meta.url).href}></img> */}
      <SkillButton skillName="Fireball" url={fireballIcon} />
      <div className="absolute left-0 top-0 z-10 grid grid-cols-9 grid-rows-5">
        {Array.from({ length: 45 }).map(() => (
          <div className="absolure box-border h-[128px] w-[128px] border-2 border-red-500"></div>
        ))}
        <PartyMember position={'pos4'} />
        <PartyMember position={'pos3'} />
        <PartyMember position={'pos2'} />
        <PartyMember position={'pos1'} />
        <button
          onClick={() => splashBlood(200, 200, 100)}
          className="z-1000 border-transaprent absolute right-20 rounded-xl border-2 bg-gray-500 p-2 font-bold text-white hover:bg-gray-300"
        >
          Splash Blood
        </button>
      </div>

      <EnemyComponent enemy={enemy} />

      {grid.grid
        .flat()
        .map((area) =>
          area.projectiles.map((proj) =>
            proj.isAlive ? (
              <ProjectileSprite key={proj.id} projectile={proj} />
            ) : null,
          ),
        )}
    </div>
  );
}
