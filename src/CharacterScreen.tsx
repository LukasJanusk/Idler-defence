import CharacterAttributes from './CharacterAttributes';
import Container from './Container';
import SkillContainer from './SkillContainer';
import CharacterSelect from './CharacterSelect';
import { GRID_AREA_SIZE } from './constants';
import CharacterGridSelectable from './CharacterGridSelectable';
import { useGameStore } from './store';
import { useState } from 'react';

export default function CharacterScreen() {
  const [selectedId, setSelectedId] = useState<null | string>(null);
  const availableCharacters = useGameStore(
    (store) => store.availableCharacters,
  );
  const selectedPosition = useGameStore((store) => store.selectedPosition);
  const party = useGameStore((store) => store.party);
  const selectedCharacter = selectedPosition ? party[selectedPosition] : null;

  return (
    <div
      className="absolute left-[8px] top-[256px]"
      style={{
        height: `${GRID_AREA_SIZE * 3}px`,
        width: `${GRID_AREA_SIZE * 4}px`,
      }}
    >
      <div
        className="flex flex-row justify-between"
        style={{
          height: `${GRID_AREA_SIZE}px`,
          width: `${GRID_AREA_SIZE * 4}px`,
        }}
      >
        <CharacterGridSelectable position={'pos4'} />
        <CharacterGridSelectable position={'pos3'} />
        <CharacterGridSelectable position={'pos2'} />
        <CharacterGridSelectable position={'pos1'} />
      </div>
      <Container size="lg">
        <div className={`flex flex-row`}>
          {selectedPosition && (
            <>
              <div className="grid grid-cols-2 grid-rows-1">
                {selectedCharacter ? (
                  <SkillContainer skills={selectedCharacter.skills} />
                ) : (
                  <CharacterSelect
                    availableCharacters={availableCharacters}
                    selected={selectedId}
                    setSelected={(id: string) => {
                      setSelectedId(id);
                    }}
                  />
                )}
              </div>

              <CharacterAttributes
                hired={party[selectedPosition] !== null}
                character={
                  selectedCharacter ||
                  Array.from(availableCharacters.values()).find(
                    (char) => char.id === selectedId,
                  ) ||
                  null
                }
                availableAttributes={0}
              />
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
