import { PlusCircle } from 'lucide-react';
import type { PartyPositionName } from '@/types';
import { useGameStore } from '@/store';

type AddNewCharacterButtonProps = {
  position: PartyPositionName;
};

export default function AddNewCharacterButton({
  position,
}: AddNewCharacterButtonProps) {
  const selectPosition = useGameStore((store) => store.selectPosition);

  return (
    <button
      className={`flex h-16 w-16 items-center justify-center rounded-full bg-medieval-stone/80 text-medieval-silver opacity-30 duration-200 hover:scale-105 hover:text-medieval-green-600 hover:opacity-100 active:scale-95`}
      aria-label={`Add new Character to ${position}`}
      onClick={() => selectPosition(position)}
    >
      <PlusCircle className="rounded-ful h-12 w-12" />
    </button>
  );
}
