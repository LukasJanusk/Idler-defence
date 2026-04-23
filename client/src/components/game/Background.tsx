import bg from '@/assets/background/bg_dungeon.png';

export default function Background() {
  return (
    <img
      src={new URL(bg, import.meta.url).href}
      alt="level-background"
      className="pointer-events-none absolute left-0 top-0 z-0"
    />
  );
}
