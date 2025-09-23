import AddNewCharacterButton from './AddNewCharacterButton';
import CharacterSprite from './CharacterSprite';
import { GRID_AREA_SIZE } from '@/constants';
import { useGameStore } from '@/store';
import type { AnyCharacter, PartyPositionName } from '@/types';

export type Props = {
  position: PartyPositionName;
  character: AnyCharacter | null;
};
function SelectedIndicator() {
  return (
    <div
      className={`border-b-6 absolute bottom-[-5px] left-0 h-6 w-full animate-pulse rounded-b-xl rounded-e-md rounded-s-md rounded-t-2xl border-8 border-t-4 border-medieval-emerald`}
    />
  );
}
export default function CharacterGridSelectable({
  position,
  character,
}: Props) {
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
        {position === selectedPosition && <SelectedIndicator />}{' '}
        {character && (
          <CharacterSprite position={position} character={character} />
        )}
      </div>
    </div>
  );
}
