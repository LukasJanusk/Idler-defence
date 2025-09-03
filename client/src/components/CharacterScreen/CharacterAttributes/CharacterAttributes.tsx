import Container from '../../reusable/Container';
import { Plus } from 'lucide-react';
import type { AnyCharacter, Attributes } from '@/types';
import CharacterToHireSkills from './CharacterToHireSkills';
import Indicator from '../../reusable/Indicator';
import { useGameStore } from '@/store';
import Bar from '../../reusable/Bar';

type CharacterAttributesProps = {
  character: AnyCharacter | null;
  hired: boolean;
  onHire?: (id: string) => void;
};

export default function CharacterAttributes({
  character,
  hired,
  onHire,
}: CharacterAttributesProps) {
  const handleDisband = useGameStore((store) => store.removeCharacterFromParty);

  if (!character) return <></>;
  return (
    <Container size="md">
      <div className="flex h-full flex-col px-2 text-medieval-silver">
        <div className="flex flex-row items-center justify-between pt-1 text-xl font-bold text-medieval-silver">
          <span>{character.characterClass} </span>
        </div>
        {Object.keys(character.attributes).map((key) => {
          const attrKey = key as keyof Attributes;
          return (
            <div
              key={attrKey}
              className="pointer flex flex-row justify-between border-2 border-transparent"
            >
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
              {character.availableAttributes > 0 && (
                <button
                  className="flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                  onClick={() => {
                    character.spendAttribute(attrKey);
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
      {character.availableAttributes > 0 && (
        <div className="flex flex-row justify-center text-xs font-bold text-medieval-parchment">
          {`Available points: ${character.availableAttributes}`}
        </div>
      )}
      {hired ? (
        <>
          <div className="px-4 pb-1">
            <span className="text-sm text-medieval-parchment">{`lvl: ${character.level}`}</span>
            <Bar
              size="sm"
              value={character.experience}
              maxValue={character.experienceToNext}
              showValues={true}
              colorStyles="bg-blue-900"
            />
          </div>
          <button
            className={`mb-2 h-8 w-32 self-center rounded border-2 border-medieval-stoneCrimson font-bold text-medieval-parchment transition-all duration-200 hover:scale-100 hover:border-transparent hover:bg-medieval-stoneCrimson active:scale-95`}
            onClick={() => handleDisband()}
          >
            Disband ❌
          </button>
        </>
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
