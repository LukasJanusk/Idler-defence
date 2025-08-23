import Container from './Container';
import type { Skill } from './SkillContainer';
import { Plus } from 'lucide-react';
import type { PartyPositionName } from './types';
import SkillButton from './SkillButton';

export type Attributes = {
  strength: number;
  dexterity: number;
  intelligence: number;
  vitality: number;
};
type CharacterAttributesProps = {
  character: { id: string; name: string };
  attributes: Attributes;
  availableAttributes: number;
  skills: Skill[];
  pos?: PartyPositionName | null;
  onHire?: (id: string) => void;
  setAttributes?: (name: keyof Attributes) => void;
};

export default function CharacterAttributes({
  character,
  attributes,
  availableAttributes,
  skills,
  pos,
  onHire,
  setAttributes,
}: CharacterAttributesProps) {
  return (
    <Container size="md">
      <div className="items-around flex h-full flex-col gap-1 p-2 text-medieval-silver">
        <div className="flex flex-row items-center justify-between px-2 text-2xl font-bold text-medieval-silver">
          {character.name}
        </div>
        {Object.keys(attributes).map((key) => {
          const attrKey = key as keyof Attributes;
          return (
            <div key={attrKey} className="flex flex-row justify-between">
              <div
                className={`flex w-full flex-row items-center justify-between gap-2 border-2 border-medieval-parchment bg-medieval-wood text-medieval-silver transition-all duration-200`}
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
                <span className="pr-2 font-bold">{attributes[attrKey]}</span>
              </div>
              {pos && availableAttributes > 0 && (
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
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
      {pos && availableAttributes > 0 && (
        <div className="flex flex-row justify-center text-lg font-bold text-medieval-parchment">
          {`Available points: ${availableAttributes}`}
        </div>
      )}
      {pos && (
        <button
          className={`h-12 w-32 self-center rounded border-2 border-medieval-stoneCrimson font-bold text-medieval-parchment transition-all duration-200 hover:border-transparent hover:bg-medieval-stoneCrimson`}
          onClick={() => onHire && onHire(character.id)}
        >
          Disband ❌
        </button>
      )}
      {!pos && (
        <div className="flex flex-col items-center justify-center text-medieval-parchment">
          <div className="flex w-full flex-row items-center justify-around gap-1 bg-medieval-stone px-2 py-1">
            {skills.map((skill) => (
              <SkillButton
                key={skill.name}
                size="sm"
                url={skill.url}
                disabled={true}
                skillName={skill.name}
              />
            ))}
          </div>
          {onHire && (
            <button
              className={`mx-2 w-auto rounded border-2 border-medieval-emerald bg-transparent px-4 font-bold text-medieval-parchment transition-all duration-200 hover:border-transparent hover:bg-medieval-emerald active:scale-95`}
              onClick={() => onHire(character.id)}
            >
              Hire 💰
            </button>
          )}
        </div>
      )}
    </Container>
  );
}
