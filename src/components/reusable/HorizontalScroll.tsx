import type { ReactNode } from 'react';
import scroll from '@/assets/scroll_horizontal.png';

type HorizontalScrollProps = {
  children: ReactNode;
};

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  return (
    <div className="relative h-10">
      <img
        className={`pointer-events-none absolute left-0 top-0`}
        src={new URL(scroll, import.meta.url).href}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 italic text-medieval-stone">
        {children}
      </div>
    </div>
  );
}
