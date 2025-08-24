import { ReactComponent as LargeBorder } from '@/assets/large_border.svg?react';
import { GRID_AREA_SIZE } from './constants';

type ContainerProps = {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

export default function Container({ children, size = 'md' }: ContainerProps) {
  let width = GRID_AREA_SIZE;
  let height = GRID_AREA_SIZE;

  if (size === 'md') {
    width = GRID_AREA_SIZE * 2;
    height = GRID_AREA_SIZE * 2;
  } else if (size === 'lg') {
    width = GRID_AREA_SIZE * 4;
    height = GRID_AREA_SIZE * 2;
  }

  return (
    <div
      className="relative box-border"
      style={{
        width: `${size === 'lg' ? width + 16 : width}px`,
        height: `${size === 'lg' ? height + 16 : height}px`,
      }}
    >
      {size === 'lg' && (
        <LargeBorder
          className="pointer-events-none absolute -left-2 -top-4 z-10 box-border text-medieval-parchment"
          style={{
            width: `${width + 16}px`,
            height: `${height + 32}px`,
          }}
        />
      )}

      <div
        className="relative flex flex-col flex-nowrap overflow-visible bg-medieval-stone"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          minWidth: `${width}px`,
          minHeight: `${height}px`,
          maxWidth: `${width}px`,
          maxHeight: `${height}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
