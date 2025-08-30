import { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import Button from './reusable/Button';
import { useGameStore } from '@/store';

export default function Menu() {
  const [live, setLive] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [leaving, setLeaving] = useState<boolean>(false);
  const setSettings = useGameStore((store) => store.setSettings);
  const settings = useGameStore((store) => store.settings);
  const pause = useGameStore((store) => store.pause);
  const play = useGameStore((store) => store.play);
  const gamePause = () => {
    setLive(false);
    pause();
  };
  const gamePlay = () => {
    setLive(true);
    play();
  };
  const toggleMenu = () => {
    if (!leaving) setLeaving(true);
    setTimeout(() => {
      setLeaving(false);
      setOpen((prev) => !prev);
    }, 90);
  };
  return (
    <div className="absolute right-2 top-2 w-[256px]">
      <div className="relative flex flex-col items-end gap-1">
        <button
          onClick={toggleMenu}
          className={`z-50 h-10 w-10 border-2 border-medieval-parchment ${open ? 'bg-medieval-stoneCrimson' : 'bg-medieval-stone'} text-medieval-parchment transition-all duration-200 hover:scale-105 active:scale-95`}
        >
          <MenuIcon className="h-full w-full" />
        </button>
        {open && (
          <div
            className={`flex ${leaving ? 'animate-leaveRight' : 'animate-slideLeft'} border-medieval-parchement z-50 w-full flex-col gap-2 border-2 bg-medieval-wood p-2`}
          >
            <Button
              onClick={() => {
                if (live) {
                  gamePause();
                } else {
                  gamePlay();
                }
              }}
            >
              {live ? 'Pause' : 'Resume'}
            </Button>
            <Button
              onClick={() => setSettings({ showGrid: !settings.showGrid })}
            >
              {`Grid - ${settings.showGrid ? 'Off' : 'On'}`}
            </Button>
            <Button
              onClick={() =>
                setSettings({ drawParticles: !settings.drawParticles })
              }
            >
              {`Particles - ${settings.drawParticles ? 'Off' : 'On'}`}
            </Button>
            <Button
              onClick={() =>
                setSettings({ automateSkillCast: !settings.automateSkillCast })
              }
            >{`Autocast - ${settings.automateSkillCast ? 'Off' : 'On'}`}</Button>
            <Button
              onClick={() => {
                alert('Not yet implemented');
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                alert('Not yet implemented');
              }}
            >
              Exit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
