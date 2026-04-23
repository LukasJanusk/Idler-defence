import { useEffect, useState } from 'react';
import SkillButton from '@/components/reusable/SkillButton';
import Indicator from '@/components/reusable/Indicator';
import Container from '@/components/reusable/Container';
import type { PartyPositionName, Skill } from '@/types';
import { useGameStore } from '@/store';
import type { CharacterAction } from '@/model/entities/character';
import { PlusCircle } from 'lucide-react';
import { useHover } from '@/hooks/useHover';
import { MAXIMUM_SKILL_LEVEL } from '@/constants';

type Props<T extends string> = {
  skills: Skill<T>[];
  state: CharacterAction;
  position: PartyPositionName;
};
export default function SkillContainer<T extends string>({
  skills,
  state,
  position,
}: Props<T>) {
  const [selectedSkill, setSelectedSkill] = useState<Skill<T> | null>(
    skills.find((skill) => skill.action === state) || null,
  );
  const setCharacterState = useGameStore((store) => store.updateCharacterState);
  const gold = useGameStore((store) => store.gold);
  const levelUpSkill = useGameStore((store) => store.levelUpSkill);

  const canUpgrade =
    selectedSkill &&
    selectedSkill.level < MAXIMUM_SKILL_LEVEL &&
    selectedSkill.level * selectedSkill.skillLevelUpData.upgradeCost < gold;

  const upgradeSkill = () => {
    if (!canUpgrade) return;
    levelUpSkill<T>(position, selectedSkill);
  };
  const handleSelectSkill = (skill: Skill<T>) => {
    setSelectedSkill(skill);
    setCharacterState(position, {
      state: skill.action as CharacterAction,
      lastAction: null,
    });
  };
  const [buttonRef, hover] = useHover<HTMLButtonElement>();
  useEffect(() => {
    setSelectedSkill(skills.find((skill) => skill.action === state) || null);
  }, [state, skills]);

  return (
    <Container size="md">
      <div className="mt-2 flex h-[64px] flex-row items-center justify-around">
        {skills.map((skill) => (
          <div key={skill.id} className="">
            <SkillButton
              url={skill.url}
              skillName={skill.name}
              selected={selectedSkill ? skill === selectedSkill : false}
              onClick={() => handleSelectSkill(skill)}
              size="md"
              disabled={
                state === 'dead' || state === 'death' || state === 'hit'
              }
            />
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center justify-between px-2 text-2xl font-bold text-medieval-silver">
        {selectedSkill?.name}
        <div className="items center relative flex flex-row gap-1">
          {hover && canUpgrade && (
            <div
              className={`absolute -top-10 z-50 -translate-x-1/2 text-nowrap rounded bg-medieval-dark p-1 ${canUpgrade ? 'text-medieval-parchment' : 'text-red-800'}`}
            >
              {selectedSkill
                ? selectedSkill.level *
                    selectedSkill.skillLevelUpData.upgradeCost +
                  ' 🪙'
                : ''}
            </div>
          )}{' '}
          {canUpgrade && (
            <button
              aria-label="skill upgrade button"
              ref={buttonRef}
              className={`rounded-full hover:scale-105 active:scale-95 active:bg-medieval-green-700`}
              onClick={upgradeSkill}
            >
              <PlusCircle className={`animate-pulse text-medieval-emerald`} />
            </button>
          )}
          <div className="text-base">lvl:</div>
          <div className="h-[24px] w-[24px] rounded-full bg-medieval-emerald text-center text-base font-bold text-white">
            {selectedSkill?.level}
          </div>
        </div>
      </div>
      <div className="font-semi-bold border-box m-2 flex-grow overflow-auto border-2 border-medieval-parchment bg-medieval-wood px-2 text-sm text-medieval-silver">
        {selectedSkill?.description}
      </div>
      <div className="flex w-full flex-row items-center justify-start gap-1 bg-medieval-stone p-2">
        <Indicator
          icon={selectedSkill?.armor ? '🛡️' : '⚔️'}
          value={
            selectedSkill?.armor
              ? selectedSkill?.armor
              : selectedSkill?.damage || 0
          }
          info={
            selectedSkill?.armor
              ? 'Armor provided by skill'
              : 'Damage dealt by the skill'
          }
        />
        <Indicator
          icon="🔵"
          value={selectedSkill?.cost || 0}
          info="Energy cost."
        />
        <Indicator
          icon="⏳"
          value={selectedSkill?.duration || 0}
          info="Duration of the skill in seconds."
        />
        <Indicator
          icon="❔"
          value={0}
          info="Every character has four skills. This panel displays selected skill information."
        />
      </div>
    </Container>
  );
}
