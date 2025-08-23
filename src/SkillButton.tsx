import { ReactComponent as SkillBorder } from '@/assets/skill_border.svg?react';
import { useHover } from './hooks/useHover';

type SkillButtonProps = {
  url: string;
  skillName: string;
  selected?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
};

export default function SkillButton({
  url,
  skillName,
  selected = false,
  size = 'md',
  onClick,
}: SkillButtonProps) {
  const smStyles = 'h-[48px] w-[48px]';
  const mdStyles = 'h-[56px] w-[56px]';
  const lgStyles = 'h-[80px] w-[80px]';
  const sizeStyles =
    size === 'sm' ? smStyles : size === 'md' ? mdStyles : lgStyles;
  const [hoverRef, isHovering] = useHover<HTMLButtonElement>();

  const backgroundColorStyles = selected
    ? 'bg-medieval-stoneCrimson'
    : isHovering
      ? 'bg-medieval-green-800'
      : 'bg-medieval-stone';
  return (
    <button
      ref={hoverRef}
      className={`relative ${sizeStyles} transition-all duration-200 hover:scale-105 active:scale-95`}
      onClick={onClick}
      aria-label={skillName}
    >
      <div
        className={`absolute left-0 top-0 ${backgroundColorStyles} transiotn-all duration-200`}
      >
        <SkillBorder
          className={`relative z-20 transition-all duration-200 ${sizeStyles} ${isHovering || selected ? 'text-secondary' : 'text-medieval-silver'}`}
        />
        <img
          src={new URL(url, import.meta.url).href}
          className={`absolute left-0 top-0 z-10 ${sizeStyles}`}
          alt={skillName}
          draggable={false}
        />
      </div>
    </button>
  );
}
