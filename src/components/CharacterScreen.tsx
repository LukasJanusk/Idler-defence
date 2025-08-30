import CharacterAttributes from './CharacterAttributes/CharacterAttributes';
import Container from './reusable/Container';
import SkillContainer from './CharacterSkills/SkillContainer';
import CharacterSelect from './CharacterSkills/CharacterSelect';
import { GRID_AREA_SIZE } from '@/constants';
import CharacterGridSelectable from './CharacterSprite/CharacterGridSelectable';
import { useGameStore } from '@/store';
import { useState } from 'react';
import type { AnyCharacter, PartyPositionName } from '@/types';

export type CharacterScreenProps = {
  party: Record<PartyPositionName, AnyCharacter | null>;
  onAlert?: (message: string | null) => void;
};
export default function CharacterScreen({
  party,
  onAlert,
}: CharacterScreenProps) {
  const [selectedId, setSelectedId] = useState<null | string>(null);

  const availableCharacters = useGameStore(
    (store) => store.availableCharacters,
  );
  const gold = useGameStore((store) => store.gold);
  const selectedPosition = useGameStore((store) => store.selectedPosition);
  const selectedCharacter = selectedPosition ? party[selectedPosition] : null;
  const addCharacter = useGameStore((store) => store.addCharacterToParty);
  const hireCharacter = (id: string) => {
    if (!selectedPosition) return;
    const price = Array.from(availableCharacters).find(
      (c) => c.id === selectedId,
    )?.price;
    if (!price || price > gold) {
      onAlert?.('Not enough gold!');
      return;
    }
    addCharacter(selectedPosition, id);
  };
  const [showMenu, setShowMenu] = useState<boolean>(true);
  return (
    <div
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      className="absolute left-[0px] top-[248px]"
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
        <CharacterGridSelectable position={'pos4'} character={party.pos4} />
        <CharacterGridSelectable position={'pos3'} character={party.pos3} />
        <CharacterGridSelectable position={'pos2'} character={party.pos2} />
        <CharacterGridSelectable position={'pos1'} character={party.pos1} />
      </div>
      {showMenu && (
        <div className="animate-enterRight">
          <Container size="lg">
            <div className={`flex flex-row`}>
              {selectedPosition && (
                <>
                  <div className="grid grid-cols-2 grid-rows-1">
                    {selectedCharacter ? (
                      <SkillContainer
                        position={selectedPosition}
                        state={selectedCharacter.state}
                        skills={selectedCharacter.skills}
                      />
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
                    onHire={hireCharacter}
                  />
                </>
              )}
            </div>
          </Container>{' '}
        </div>
      )}
    </div>
  );
}
