import { useHover } from '@/hooks/useHover';
import PositionChangeButton from './PositionChangeButton';
import Sprite from '../reusable/Sprite';
import type { AnyCharacter, PartyPositionName } from '@/types';
import Bar from '../reusable/Bar';
import { useGameStore } from '@/store';

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
    <div className={`relative`} ref={divRef}>
      <div
        className={`absolute -top-8 left-1/2 flex w-full -translate-x-1/2 flex-col items-center gap-1 px-4 ${selectedPosition === position ? 'opacity-100' : 'opacity-50'}`}
      >
        {' '}
        <div className="rounded bg-medieval-stoneLight/50 px-2 font-bold text-medieval-dark">
          {character.name}
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
