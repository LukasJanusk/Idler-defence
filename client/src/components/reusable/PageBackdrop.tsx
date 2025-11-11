import type { ReactNode } from 'react';
import BG from '@/assets/background/bg_homepage.jpg';
type Props = {
  children: ReactNode;
};
export default function PageBackdrop({ children }: Props) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-gray-400 text-2xl">
      <img
        className={`absolute h-full w-full`}
        src={new URL(BG, import.meta.url).href}
      />
      {children}
    </div>
  );
}
