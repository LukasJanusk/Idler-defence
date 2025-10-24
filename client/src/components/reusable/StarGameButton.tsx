import type { ReactNode } from 'react';
import { NavLink } from 'react-router';

type Props = {
  children?: ReactNode;
  onClick?: () => void;
};

export default function StartGameButton({ children, onClick }: Props) {
  const handleClick = () => {
    onClick?.();
  };
  return (
    <NavLink
      to="/game"
      className={`flex h-28 w-72 items-center justify-center rounded bg-medieval-green-500 text-3xl font-bold shadow-md duration-200 hover:scale-105 hover:bg-medieval-green-600 hover:shadow-lg active:scale-95 active:bg-medieval-stoneCrimson`}
      onClick={handleClick}
    >
      {children}
    </NavLink>
  );
}
