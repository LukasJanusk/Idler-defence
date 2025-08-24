import { useHover } from './hooks/useHover';
import PositionChangeButton from './PositionChangeButton';
import Sprite from './Sprite';
import type { AnyCharacter, PartyPositionName } from './types';

export type CharacterSpriteProps = {
  position: PartyPositionName;
  character: AnyCharacter;
};
export default function CharacterSprite({
  character,
  position,
}: CharacterSpriteProps) {
  const [divRef, hover] = useHover<HTMLDivElement>();

  return (
    <div className={`relative`} ref={divRef}>
      <Sprite
        animation={
          character.animations[
            character.state as keyof typeof character.animations
          ]
        }
        entity="character"
      />

      {hover && (
        <div className="absolute bottom-1 left-0 flex w-full flex-row justify-between">
          <PositionChangeButton
            position={position}
            direction="left"
            size="md"
          />
          <PositionChangeButton
            position={position}
            direction="right"
            size="md"
          />
        </div>
      )}
    </div>
  );
}
