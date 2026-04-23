import { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import Button from '@/components/reusable/Button';
import { useGameStore } from '@/store';
import Instructions from './Instructions';
import InGameSettingsModal from './InGameSettingsModal';

export default function Menu() {
  const [open, setOpen] = useState<boolean>(false);
  const [leaving, setLeaving] = useState<boolean>(false);
  const settings = useGameStore((store) => store.settings);
  const pause = useGameStore((store) => store.pause);
  const play = useGameStore((store) => store.play);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const setGameStarted = useGameStore((store) => store.setGameStarted);
  const handleGameOver = useGameStore((store) => store.handleGameOver);

  const returnToLevelSelectScreen = () => {
    handleGameOver();
    setGameStarted(false);
  };
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
    <div className="absolute right-2 top-4 z-[60] w-[240px]">
      {showInstructions && (
        <Instructions onClose={() => setShowInstructions(false)} />
      )}
      {showSettings && (
        <InGameSettingsModal onClose={() => setShowSettings(false)} />
      )}
      <div className="relative z-[70] flex flex-col items-end gap-1">
        <button
          aria-label="Menu button"
          onClick={toggleMenu}
          className={`z-[70] h-10 w-10 border-2 border-medieval-parchment ${open ? 'bg-medieval-stoneCrimson' : 'bg-medieval-stone'} text-medieval-parchment transition-all duration-200 hover:scale-105 active:scale-95`}
        >
          <MenuIcon className="h-full w-full" />
        </button>
        {open && (
          <div
            className={`flex ${leaving ? 'animate-leaveRight' : 'animate-slideLeft'} border-medieval-parchement z-[70] w-full flex-col gap-2 border-2 bg-medieval-wood p-2`}
          >
            <Button
              aria-label={`${settings.pause ? 'resume button' : 'pause button'}`}
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
            <Button
              aria-label={`toggle help button`}
              onClick={(event) => {
                event.stopPropagation();
                setShowInstructions((prev) => !prev);
              }}
              className={`mr-2 w-full ${showInstructions ? 'bg-medieval-stoneCrimson' : ''}`}
            >
              Help
            </Button>
            <Button
              aria-label="toggle settings button"
              onClick={(event) => {
                event.stopPropagation();
                setShowSettings((prev) => !prev);
              }}
              className={`mr-2 w-full ${showSettings ? 'bg-medieval-stoneCrimson' : ''}`}
            >
              Settings
            </Button>
            <Button
              aria-label={`Level select button`}
              onClick={() => {
                returnToLevelSelectScreen();
              }}
            >
              Level Select
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
