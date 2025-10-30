import Button from '../reusable/Button';
import { ReactComponent as Instagram } from '@/assets/social/instagram.svg?react';
import { ReactComponent as Facebook } from '@/assets/social/facebook.svg?react';
import Settings from '@/components/reusable/Settings';
import { useState } from 'react';
import BACKGROUND_IMAGE from '@/assets/background/bg_castle.png';

type Props = {
  startGame: () => void;
  gameStarted: boolean;
};
export default function MainMenu({ startGame, gameStarted }: Props) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div
      className={`relative flex h-full w-full gap-8 bg-medieval-dark bg-cover bg-center p-4 text-medieval-parchment`}
    >
      <img
        className={`pointer-events-none absolute left-0 top-0 h-full w-full bg-cover`}
        src={new URL(BACKGROUND_IMAGE, import.meta.url).href}
      />
      <div className="z-10 flex w-44 flex-col gap-4">
        <Button onClick={() => startGame()}>
          {gameStarted ? 'Continue' : 'New Game'}
        </Button>
        <Button
          className={`${settingsOpen && 'bg-medieval-stoneCrimson'}`}
          onClick={() => setSettingsOpen((prev) => !prev)}
        >
          Settings
        </Button>
        <Button onClick={() => alert('Not yet implemented')}>Credits</Button>
      </div>
      {settingsOpen && <Settings />}
      <div className="absolute bottom-0 right-0 flex w-40 gap-4 px-4 pb-4">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group min-h-12 min-w-12"
        >
          <div className="absolute h-12 w-12 rounded-xl bg-[#FF0069] opacity-0 blur-xl transition-all duration-200 group-hover:opacity-100" />
          <Instagram className="max-h-12 max-w-12 rounded-xl text-[#FF0069] blur-none transition-all duration-200 group-hover:scale-105 group-active:scale-95" />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group min-h-12 min-w-12"
        >
          <div className="absolute h-12 w-12 rounded-xl bg-[#0866FF] opacity-0 blur-xl transition-all duration-200 group-hover:opacity-100" />
          <Facebook className="max-h-12 max-w-12 rounded-xl text-[#0866FF] transition-all duration-200 group-hover:scale-105 group-active:scale-95" />
        </a>
      </div>
    </div>
  );
}
