import { ReactComponent as LargeBorder } from '@/assets/large_border.svg?react';
import { GRID_AREA_SIZE } from '@/constants';

type Props = {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

export default function Container({ children, size = 'md' }: Props) {
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
          className="pointer-events-none absolute inset-0 -top-2 z-10 text-medieval-parchment"
          style={{ width: '100%', height: '100%' }}
        />
      )}

      <div
        className="relative flex flex-col bg-medieval-stone"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          minWidth: `${width}px`,
          minHeight: `${height}px`,
          maxWidth: `${width}px`,
          maxHeight: `${height}px`,
          marginLeft: `${size === 'lg' ? '8px' : '0px'}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
