import { useEffect, useState } from 'react';
import SkillButton from '../reusable/SkillButton';
import Indicator from '../reusable/Indicator';
import Container from '../reusable/Container';
import type { PartyPositionName, Skill } from '@/types';
import { useGameStore } from '../../store';
import type { CharacterAction } from '../../model/entities/character';

type SkillContainerProps = {
  skills: Skill[];
  state: CharacterAction;
  position: PartyPositionName;
};
export default function SkillContainer({
  skills,
  state,
  position,
}: SkillContainerProps) {
  const [selectedSkill, setSelectedSkill] = useState(
    skills.find((skill) => skill.action === state) || null,
  );
  const setCharacterState = useGameStore((store) => store.updateCharacterState);
  const handleSelectSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setCharacterState(position, {
      state: skill.action as CharacterAction,
    });
  };
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
        <div className="items center flex flex-row gap-1">
          {' '}
          <span className="text-base">LVL</span>
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
          icon="⚔️"
          value={selectedSkill?.damage || 0}
          info={'Damage dealt by the skill.'}
        />
        <Indicator
          icon="💨"
          value={selectedSkill?.speed || 0}
          info="Current percentage of the base skill speed."
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
