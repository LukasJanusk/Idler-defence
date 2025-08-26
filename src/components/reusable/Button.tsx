import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};
export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="border-2 border-medieval-silver bg-medieval-stone p-2 font-bold text-medieval-parchment transition-all duration-200 hover:scale-105 hover:bg-medieval-stoneCrimson active:scale-95"
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  );
}
