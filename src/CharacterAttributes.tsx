import Container from './Container';
import { Plus } from 'lucide-react';
import type { AnyCharacter, Attributes } from './types';
import CharacterToHireSkills from './CharacterToHireSkills';
import Indicator from './Indicator';
import { useGameStore } from './store';

type CharacterAttributesProps = {
  character: AnyCharacter | null;
  availableAttributes: number;
  hired: boolean;
  onHire?: (id: string) => void;
  setAttributes?: (name: keyof Attributes) => void;
};

export default function CharacterAttributes({
  character,
  availableAttributes,
  hired,
  onHire,
  setAttributes,
}: CharacterAttributesProps) {
  const handleDisband = useGameStore((store) => store.removeCharacterFromParty);

  if (!character) return <></>;
  return (
    <Container size="md">
      <div className="flex h-full flex-col gap-1 px-2 text-medieval-silver">
        <div className="flex flex-row items-center justify-between text-2xl font-bold text-medieval-silver">
          {character.characterClass}
        </div>
        {Object.keys(character.attributes).map((key) => {
          const attrKey = key as keyof Attributes;
          return (
            <div key={attrKey} className="flex flex-row justify-between">
              <div
                className={`flex w-full flex-row items-center justify-between gap-1 border-2 border-medieval-parchment bg-medieval-wood text-medieval-silver transition-all duration-200`}
              >
                <span className="pl-2">
                  {attrKey === 'strength'
                    ? '💪'
                    : attrKey === 'dexterity'
                      ? '🏹'
                      : attrKey === 'intelligence'
                        ? '🧠'
                        : '❤️'}
                </span>
                <span>
                  {attrKey.charAt(0).toUpperCase() + attrKey.slice(1)}
                </span>
                <span className="pr-2 font-bold">
                  {character.attributes[attrKey]}
                </span>
              </div>
              {availableAttributes > 0 && (
                <button
                  className="flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                  onClick={() => {
                    if (setAttributes) setAttributes(attrKey);
                  }}
                  aria-label={`Increase ${attrKey}`}
                >
                  <Plus className="text-medieval-emerald" />
                </button>
              )}
            </div>
          );
        })}
      </div>
      {availableAttributes > 0 && (
        <div className="mb-8 flex flex-row justify-center text-lg font-bold text-medieval-parchment">
          {`Available points: ${availableAttributes}`}
        </div>
      )}
      {hired ? (
        <button
          className={`mb-2 h-8 w-32 self-center rounded border-2 border-medieval-stoneCrimson font-bold text-medieval-parchment transition-all duration-200 hover:scale-100 hover:border-transparent hover:bg-medieval-stoneCrimson active:scale-95`}
          onClick={() => handleDisband()}
        >
          Disband ❌
        </button>
      ) : (
        <div className="mb-2 flex flex-col items-center justify-center text-medieval-parchment">
          <CharacterToHireSkills skills={character.skills} />

          <button
            className={`mx-2 w-auto rounded border-2 border-medieval-emerald bg-transparent px-4 font-bold text-medieval-parchment transition-all duration-200 hover:border-transparent hover:bg-medieval-emerald active:scale-95`}
            onClick={() => {
              if (onHire) onHire(character.id);
            }}
          >
            Hire 💰
          </button>
        </div>
      )}
      <div className="absolute bottom-2 right-2">
        <Indicator
          info="Strength: increase damage, dexterity: increase skill speed, intelligence: increase Energy, vitality: increase Health"
          icon="❔"
          value={0}
        />
      </div>
    </Container>
  );
}
