import { NavLink } from 'react-router';

type Props = {
  text: string;
  onClick?: () => void;
};

export default function StartGameButton({ text, onClick }: Props) {
  const handleClick = () => {
    onClick?.();
  };
  return (
    <NavLink
      to="/game"
      className="group relative z-10 flex h-28 w-72 items-center justify-center rounded-xl border-2 border-medieval-parchment/40 bg-gradient-to-b from-medieval-green-500 to-medieval-green-700 text-3xl font-bold text-medieval-parchment shadow-sm transition-all duration-200 hover:scale-105 hover:from-medieval-green-400 hover:to-medieval-green-600 hover:shadow-md active:scale-95 active:brightness-90"
      onClick={handleClick}
    >
      <span className="duration-200 group-hover:animate-pulse group-hover:text-4xl">
        {text}
      </span>
      <div className="absolute inset-0 rounded-xl border-4 border-medieval-parchment/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </NavLink>
  );
}
