import { User } from 'lucide-react';

const LARGE = 64;
const MEDIUM = 56;
const SMALL = 40;

type Props = {
  onClick?: () => void;
  url?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function AvatarIcon({ url, className, size, onClick }: Props) {
  return (
    <div
      style={{
        height: `${size === 'sm' ? SMALL : size === 'md' ? MEDIUM : LARGE}px`,
        width: `${size === 'sm' ? SMALL : size === 'md' ? MEDIUM : LARGE}px`,
      }}
      className={`group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gradient-to-t from-transparent via-medieval-stone to-medieval-dark p-1 ${className || ''}`}
      onClick={() => onClick?.()}
    >
      {url ? (
        <img className={`h-full w-full rounded-full`} src={url} />
      ) : (
        <User className="h-full w-full rounded-full text-gray-400 duration-200 group-hover:text-gray-300" />
      )}
      <div
        className={`absolute z-10 h-full w-full duration-200 group-hover:bg-white/10`}
      />
    </div>
  );
}
