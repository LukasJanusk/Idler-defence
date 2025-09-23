import type { ReactNode } from 'react';
import { GRID_AREA_SIZE } from '@/constants';

type Props = {
  size: 'sm' | 'md' | 'lg';
  title?: string;
  children: ReactNode;
};

export default function GameModal({ size, title, children }: Props) {
  let width = GRID_AREA_SIZE * 1.5;
  let height = GRID_AREA_SIZE * 1.5;
  if (size === 'md') {
    width = GRID_AREA_SIZE * 2;
    height = GRID_AREA_SIZE * 2;
  } else if (size === 'lg') {
    width = GRID_AREA_SIZE * 4;
  }

  const top = height;

  return (
    <div
      className="absolute z-50 flex flex-col overflow-hidden rounded border-2 border-medieval-stoneLight bg-medieval-parchment text-medieval-stone"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        top: `-${top}px`,
        left: '50%',
        transform: 'translateX(-50%) translateY(-8px)',
      }}
    >
      {title && (
        <>
          <h1
            className={`${size === 'sm' ? 'text-lg' : 'text-xl'} px-2 font-bold`}
          >
            {title}
          </h1>
          <hr />
        </>
      )}

      <div
        className={`${size === 'sm' ? 'text-sm' : 'text-md'} overflow-auto p-2`}
      >
        {children}
      </div>
    </div>
  );
}
