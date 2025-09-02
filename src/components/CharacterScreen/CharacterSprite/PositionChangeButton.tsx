import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import { useGameStore } from '@/store';
import type { PartyPositionName } from '@/types';
import type React from 'react';

type PositionChangeButtonProps = {
  position: PartyPositionName;
  direction: 'left' | 'right';
  size: 'sm' | 'md' | 'lg';
};

export default function PositionChangeButton({
  position,
  direction,
  size,
}: PositionChangeButtonProps) {
  const moveCharacter = useGameStore((store) => store.moveCharacter);

  const moveLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    const from = position;
    const to =
      position === 'pos4'
        ? 'pos1'
        : (`pos${Number(position.slice(-1)) + 1}` as PartyPositionName);
    moveCharacter(from, to);
  };
  const moveRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    const from = position;
    const to =
      position === 'pos1'
        ? 'pos4'
        : (`pos${Number(position.slice(-1)) - 1}` as PartyPositionName);

    moveCharacter(from, to);
  };

  const colorStyles = `bg-medieval-stone hover:bg-medieval-green-800 border-medieval-parchment text-medieval-parchment hover:border-medieval-gold hover:text-medieval-gold active:bg-medieval-stoneCrimson`;
  const sizeStyles = `${size === 'sm' ? 'w-[28px] h-[28px] border-2' : size === 'md' ? 'w-[40px] h-[40px] border-4' : 'w-[64px] h-[64px] border-4'}`;
  return (
    <>
      <button
        className={`${colorStyles} ${sizeStyles} z-50 box-border p-1 transition-all duration-200 hover:scale-105 active:scale-95`}
        onClick={direction === 'left' ? moveLeft : moveRight}
        aria-label={`Move character ${direction} button`}
      >
        {direction === 'left' ? (
          <ArrowBigLeft className="h-auto w-full" />
        ) : (
          <ArrowBigRight className="h-auto w-full" />
        )}
      </button>
    </>
  );
}
