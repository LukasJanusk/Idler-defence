import { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import Button from '@/components/reusable/Button';
import { useGameStore } from '@/store';
import Toggle from '../reusable/Toggle';

export default function Menu() {
  const [open, setOpen] = useState<boolean>(false);
  const [leaving, setLeaving] = useState<boolean>(false);
  const setSettings = useGameStore((store) => store.setSettings);
  const settings = useGameStore((store) => store.settings);
  const pause = useGameStore((store) => store.pause);
  const play = useGameStore((store) => store.play);

  const gamePause = () => {
    pause();
  };
  const gamePlay = () => {
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
    <div className="absolute right-2 top-4 w-[256px]">
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
                if (settings.pause) {
                  gamePlay();
                } else {
                  gamePause();
                }
              }}
            >
              {settings.pause ? 'Resume' : 'Pause'}
            </Button>
            <div className="flex w-full flex-row items-center justify-between">
              <Button
                onClick={() => setSettings({ showGrid: !settings.showGrid })}
                className="mr-2 w-full"
              >
                Grid
              </Button>
              <Toggle
                on={settings.showGrid}
                onClick={() => setSettings({ showGrid: !settings.showGrid })}
              />
            </div>
            <div className="flex w-full flex-row items-center justify-between">
              <Button
                onClick={() =>
                  setSettings({ drawParticles: !settings.drawParticles })
                }
                className="mr-2 w-full"
              >
                Particles
              </Button>
              <Toggle
                on={settings.drawParticles}
                onClick={() =>
                  setSettings({ drawParticles: !settings.drawParticles })
                }
              />
            </div>
            <div className="flex w-full flex-row items-center justify-between">
              <Button
                onClick={() =>
                  setSettings({
                    automateSkillCast: !settings.automateSkillCast,
                  })
                }
                className="mr-2 w-full"
              >
                Autocast
              </Button>
              <Toggle
                on={settings.automateSkillCast}
                onClick={() =>
                  setSettings({
                    automateSkillCast: !settings.automateSkillCast,
                  })
                }
              />
            </div>
            <div className="flex w-full flex-row items-center justify-between">
              <Button
                onClick={() => setSettings({ showUi: !settings.showUi })}
                className="mr-2 w-full"
              >
                Always show UI
              </Button>
              <Toggle
                on={settings.showUi}
                onClick={() => setSettings({ showUi: !settings.showUi })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
