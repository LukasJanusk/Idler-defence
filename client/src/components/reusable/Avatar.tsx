import { User } from 'lucide-react';

type Props = {
  url?: string;
  className?: string;
};

export default function Avatar({ url, className }: Props) {
  return (
    <div
      className={`group relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-medieval-stone p-1 ${className || ''}`}
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
