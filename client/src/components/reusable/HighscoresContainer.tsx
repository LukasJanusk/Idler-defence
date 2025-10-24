import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  classNames?: string;
};

export default function HighscoresContainer({ children, classNames }: Props) {
  return (
    <div
      className={`relative flex max-h-[512px] min-h-[512px] w-[512px] flex-col items-center justify-center border-4 border-medieval-silver bg-medieval-stone p-4 text-medieval-parchment shadow-xl ${classNames ?? ''} `}
    >
      {children}
    </div>
  );
}
