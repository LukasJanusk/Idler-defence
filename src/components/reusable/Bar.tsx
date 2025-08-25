import { useEffect, useRef, useState } from 'react';

type BarProps = {
  value: number;
  maxValue: number;
  showValues?: boolean;
  size?: 'sm' | 'md' | 'lg';
  colorStyles?: string;
  label?: string;
};

const SMALL_HEIGHT = 20;
const MEDIUM_HEIGHT = 32;
const LARGE_HEIGHT = 40;

const SMALL_LABEL_OFFSET = -26;
const LARGE_LABEL_OFFSET = -30;

const MIN_WIDTH = 100;

export default function Bar({
  value,
  maxValue,
  showValues,
  size,
  colorStyles,
  label,
}: BarProps) {
  const [maxWidth, setMaxWidth] = useState(0);
  const maxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!maxRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMaxWidth(entry.contentRect.width);
      }
    });
    observer.observe(maxRef.current);
    return () => observer.disconnect();
  }, []);

  const height =
    size === 'sm' ? SMALL_HEIGHT : size === 'lg' ? LARGE_HEIGHT : MEDIUM_HEIGHT;
  const color = colorStyles?.length ? colorStyles : 'bg-medieval-green-800';
  const displayValue = value > maxValue ? maxValue : value;
  return (
    <div
      ref={maxRef}
      className={`relative box-border flex w-full justify-start border-2 border-medieval-silver bg-medieval-stone shadow-md`}
      style={{ minWidth: `${MIN_WIDTH}px` }}
    >
      <div
        style={{
          width: `${Math.round((displayValue / maxValue) * maxWidth)}px`,
          height: `${height}px`,
          maxHeight: `${height}px`,
        }}
        className={`${color} h-full min-h-[20px] flex-row`}
      ></div>{' '}
      {showValues && (
        <div
          className={`${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-medieval-silver`}
        >{`${displayValue}/${maxValue}`}</div>
      )}
      {label && (
        <div
          style={{
            top: size !== 'lg' ? SMALL_LABEL_OFFSET : LARGE_LABEL_OFFSET,
          }}
          className={`${size === 'lg' ? 'text-lg' : 'text-md'} absolute left-1/2 -translate-x-1/2 text-nowrap rounded bg-medieval-stoneLight/50 px-1 font-bold text-medieval-dark`}
        >
          {label}
        </div>
      )}
    </div>
  );
}
