import { useState } from 'react';
import SkillButton from './SkillButton';
import Indicator from './Indicator';

export type Skill = {
  id: string;
  name: string;
  description: string;
  url: string;
  damage: number;
  duration: number;
  speed: number;
  onSelect: () => void;
};
type SkillContainerProps = {
  skills: Skill[];
};
export default function SkillContainer({ skills }: SkillContainerProps) {
  const [selectedSkill, setSelectedSkill] = useState<number>(0);

  const handleSelectSkill = (index: number, skill: Skill) => {
    setSelectedSkill(index);
    skill.onSelect();
  };
  return (
    <div className="content-box flex h-[256px] w-[256px] flex-col flex-nowrap border-4 border-medieval-wood bg-medieval-stone shadow-lg">
      <div className="mt-2 flex h-[64px] flex-row items-center justify-around">
        {skills.map((skill, index) => (
          <div key={skill.id} className="">
            <SkillButton
              url={skill.url}
              skillName={skill.name}
              selected={selectedSkill === index}
              onClick={() => handleSelectSkill(index, skill)}
              size="md"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center justify-between px-2 text-2xl font-bold text-medieval-silver">
        {skills[selectedSkill].name}
        <div className="items center flex flex-row gap-1">
          {' '}
          <span className="text-base">LVL</span>
          <div className="h-[24px] w-[24px] rounded-full bg-medieval-emerald text-center text-base font-bold text-white">
            10
          </div>
        </div>
      </div>
      <div className="font-semi-bold text-md flex-grow overflow-auto border-2 border-medieval-parchment bg-medieval-wood px-2 text-medieval-silver">
        {skills[selectedSkill].description}
      </div>
      <div className="flex w-full flex-row items-center justify-start gap-1 bg-medieval-stone py-1">
        <Indicator
          icon="⚔️"
          value={skills[selectedSkill].damage}
          info={'Damage dealt by the skill.'}
        />
        <Indicator
          icon="💨"
          value={skills[selectedSkill].speed}
          info="Current percentage of the base skill speed."
        />
        <Indicator
          icon="⏳"
          value={skills[selectedSkill].duration}
          info="Duration of the skill in seconds."
        />
        <Indicator
          icon="❔"
          value={0}
          info="Every character has four skills. This panel displays selected skill information."
        />
      </div>
    </div>
  );
}
