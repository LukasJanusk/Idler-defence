import { useHover } from '@/hooks/useHover';
import PositionChangeButton from './PositionChangeButton';
import Sprite from '../reusable/Sprite';
import type { AnyCharacter, PartyPositionName } from '@/types';
import Bar from '../reusable/Bar';
import { useGameStore } from '@/store';
import { PlusIcon } from 'lucide-react';
import HorizontalScroll from '../reusable/HorizontalScroll';

export type CharacterSpriteProps = {
  position: PartyPositionName;
  character: AnyCharacter;
};
export default function CharacterSprite({
  character,
  position,
}: CharacterSpriteProps) {
  const [divRef, hover] = useHover<HTMLDivElement>();
  const selectedPosition = useGameStore((store) => store.selectedPosition);

  return (
    <div className={`relative cursor-pointer`} ref={divRef}>
      {character.availableAttributes > 0 && (
        <PlusIcon className="-translateY-1/2 absolute -right-2 animate-pulse text-medieval-emerald" />
      )}
      <div
        className={`absolute -top-12 left-1/2 flex w-full -translate-x-1/2 flex-col items-center gap-1 px-4 ${selectedPosition === position ? 'opacity-100' : 'opacity-50'}`}
      >
        <div className="w-full font-bold">
          <HorizontalScroll> {character.name}</HorizontalScroll>
        </div>

        <Bar
          maxValue={character.maxHealth}
          value={character.health}
          colorStyles="bg-medieval-blood"
          size="sm"
          showValues={hover}
        />
        <Bar
          maxValue={character.maxEnergy}
          value={character.energy}
          colorStyles="bg-medieval-arcane"
          size="sm"
          showValues={hover}
        />
      </div>
      <div className="relative -top-[8px] h-full w-full">
        <Sprite
          animation={
            character.animations[
              character.state as keyof typeof character.animations
            ]
          }
          entity="character"
        />
      </div>

      {hover && !character.isDead() && !character.isDeath() && (
        <div className="absolute bottom-1 left-0 flex w-full flex-row justify-between">
          <PositionChangeButton
            position={position}
            direction="left"
            size="sm"
          />
          <PositionChangeButton
            position={position}
            direction="right"
            size="sm"
          />
        </div>
      )}
    </div>
  );
}
