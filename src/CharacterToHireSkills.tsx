import { useHover } from './hooks/useHover';
import SkillButton from './SkillButton';
import SkillModal from './SkillModal';
import type { Skill } from './types';

type CharacterToHireSkillsProps = {
  skills: Skill[];
};
type CharacterToHireSkillProps = {
  skill: Skill;
};
function CharacterToHireSkill({ skill }: CharacterToHireSkillProps) {
  const [divRef, hover] = useHover<HTMLDivElement>();
  return (
    <div key={skill.name} ref={divRef} className="relative">
      {hover && (
        <SkillModal title={skill.name} size="sm">
          {skill.description}
        </SkillModal>
      )}
      <SkillButton
        size="xs"
        url={skill.url}
        disabled={true}
        skillName={skill.name}
      />
    </div>
  );
}
export default function CharacterToHireSkills({
  skills,
}: CharacterToHireSkillsProps) {
  return (
    <div className="flex w-full flex-row items-center justify-around gap-1 bg-medieval-stone px-2 py-1">
      {skills.map((skill) => (
        <CharacterToHireSkill skill={skill} key={skill.id} />
      ))}
    </div>
  );
}
