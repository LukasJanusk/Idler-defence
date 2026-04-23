import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'primary' | 'secondary';
};

export default function LevelScreenButton({
  children,
  onClick,
  className,
  type = 'primary',
}: Props) {
  return (
    <button
      className={`rounded border-2 border-medieval-silver p-2 text-xl font-bold text-medieval-parchment shadow-sm duration-200 hover:scale-105 hover:border-medieval-parchment hover:shadow-md active:scale-95 ${type === 'primary' ? 'bg-medieval-green-500 hover:bg-medieval-green-600' : 'bg-medieval-stoneCrimson hover:bg-medieval-stoneCrimsonDark'} ${className}`}
      onClick={() => {
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}
