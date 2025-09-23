import { useHover } from '@/hooks/useHover';
import SkillButton from '../../reusable/SkillButton';
import SkillModal from '../../reusable/SkillModal';
import type { Skill } from '@/types';

type CharacterToHireSkillsProps<T extends string> = {
  skills: Skill<T>[];
};
type Props<T extends string> = {
  skill: Skill<T>;
};
function CharacterToHireSkill<T extends string>({ skill }: Props<T>) {
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
export default function CharacterToHireSkills<T extends string>({
  skills,
}: CharacterToHireSkillsProps<T>) {
  return (
    <div className="flex w-full flex-row items-center justify-around gap-1 bg-medieval-stone px-2 py-1">
      {skills.map((skill) => (
        <CharacterToHireSkill skill={skill} key={skill.id} />
      ))}
    </div>
  );
}
