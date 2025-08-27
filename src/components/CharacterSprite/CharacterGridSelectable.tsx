import AddNewCharacterButton from './AddNewCharacterButton';
import CharacterSprite from './CharacterSprite';
import { GRID_AREA_SIZE } from '@/constants';

import { useGameStore } from '@/store';
import type { AnyCharacter, PartyPositionName } from '@/types';

export type CharacterGridSelectableProps = {
  position: PartyPositionName;
  character: AnyCharacter | null;
};
function SelectedIndicator() {
  return (
    <div
      className={`absolute bottom-[0px] left-0 z-20 h-1 w-full animate-pulse bg-medieval-emerald px-8`}
    />
  );
}
export default function CharacterGridSelectable({
  position,
  character,
}: CharacterGridSelectableProps) {
  const selectedPosition = useGameStore((store) => store.selectedPosition);
  const selectPosition = useGameStore((store) => store.selectPosition);

  if (!character)
    return (
      <div
        style={{
          width: GRID_AREA_SIZE,
          height: GRID_AREA_SIZE,
          minWidth: GRID_AREA_SIZE,
          minHeight: GRID_AREA_SIZE,
          maxHeight: GRID_AREA_SIZE,
          maxWidth: GRID_AREA_SIZE,
        }}
        className="relative flex items-center justify-center"
      >
        <AddNewCharacterButton position={position} />
        {position === selectedPosition && <SelectedIndicator />}
      </div>
    );

  return (
    <div
      style={{
        width: GRID_AREA_SIZE,
        height: GRID_AREA_SIZE,
        minWidth: GRID_AREA_SIZE,
        minHeight: GRID_AREA_SIZE,
        maxHeight: GRID_AREA_SIZE,
        maxWidth: GRID_AREA_SIZE,
      }}
      className={`relative flex flex-row items-center justify-center`}
    >
      <div
        aria-label={`Select character ${character.name}`}
        onClick={() => selectPosition(position)}
      >
        {character && (
          <CharacterSprite position={position} character={character} />
        )}
        {position === selectedPosition && <SelectedIndicator />}
      </div>
    </div>
  );
}
