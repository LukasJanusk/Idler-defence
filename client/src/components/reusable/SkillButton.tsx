import { ReactComponent as SkillBorder } from '@/assets/skill_border.svg?react';
import { useHover } from '@/hooks/useHover';
import missing from '@/assets/skill_icons/no_skill_icon.png';

type SkillButtonProps = {
  url: string;
  skillName: string;
  selected?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
};

export default function SkillButton({
  url,
  skillName,
  selected = false,
  size = 'md',
  onClick,
  disabled = false,
}: SkillButtonProps) {
  const xsStyles = 'h-[38px] w-[38px]';
  const smStyles = 'h-[48px] w-[48px]';
  const mdStyles = 'h-[56px] w-[56px]';
  const lgStyles = 'h-[80px] w-[80px]';
  const sizeStyles =
    size === 'sm'
      ? smStyles
      : size === 'md'
        ? mdStyles
        : size === 'xs'
          ? xsStyles
          : lgStyles;
  const [hoverRef, isHovering] = useHover<HTMLButtonElement>();

  const backgroundColorStyles = selected
    ? 'bg-medieval-stoneCrimson'
    : isHovering && !disabled
      ? 'bg-medieval-green-800'
      : 'bg-medieval-dark/40';
  return (
    <button
      ref={hoverRef}
      className={`relative ${sizeStyles} transition-all ${!disabled && 'duration-200 hover:scale-105 active:scale-95'} text-xs`}
      onClick={onClick}
      aria-label={skillName}
      disabled={disabled}
    >
      <div
        className={`absolute left-0 top-0 ${backgroundColorStyles} transiotn-all duration-200`}
      >
        <SkillBorder
          className={`relative z-20 transition-all duration-200 ${sizeStyles} ${disabled ? 'text-medieval-silver' : isHovering || selected ? 'text-secondary' : 'text-medieval-silver'}`}
        />
        {url && url !== '' ? (
          <img
            src={new URL(url, import.meta.url).href}
            className={`absolute left-0 top-0 z-10 ${sizeStyles}`}
            alt={skillName}
            draggable={false}
          />
        ) : (
          <img
            src={new URL(missing, import.meta.url).href}
            className={`absolute left-0 top-0 z-10 text-medieval-silver ${sizeStyles}`}
          />
        )}
      </div>
    </button>
  );
}
