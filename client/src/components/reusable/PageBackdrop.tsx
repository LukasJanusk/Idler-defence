import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export default function PageBackdrop({ children }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gray-400 p-4 text-2xl">
      {children}
    </div>
  );
}
