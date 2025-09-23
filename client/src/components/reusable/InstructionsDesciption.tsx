import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export default function InstructionsDescription({ children }: Props) {
  return (
    <div className="w-[500px] border-2 border-medieval-silver bg-medieval-stone p-6">
      {children}
    </div>
  );
}
