import { useHover } from '@/hooks/useHover';

export type IndicatorIcons = '⚔️' | '⏳' | '🔵' | '❔' | '🛡️' | '💨';

type IndicatorProps = {
  info: string;
  icon: IndicatorIcons;
  value: number;
};

export default function Indicator({ info, icon, value }: IndicatorProps) {
  const backgroundColorStyles = (icon: IndicatorIcons) => {
    switch (icon) {
      case '⚔️':
        return 'bg-medieval-stoneCrimson';
      case '⏳':
        return 'bg-medieval-gold';
      case '🔵':
        return 'bg-medieval-arcane';
      case '❔':
        return 'bg-medieval-emerald';
      case '🛡️':
        return 'bg-medieval-stoneLight';
      case '💨':
        return 'bg-yellow-600';
      default:
        return 'bg-medieval-emerald';
    }
  };

  const displayValue = () => {
    if (icon === '⚔️' || icon === '🛡️' || icon === '💨')
      return Math.round(value);
    else if (icon === '⏳') return `${value}s`;
    else if (icon === '🔵') return value < 0 ? `+${value * -1}` : value;
    else if (icon === '❔') return '';
    else return value;
  };
  const [elRef, modalOpen] = useHover<HTMLDivElement>();
  return (
    <div
      className={`relative flex cursor-pointer flex-row items-center justify-between gap-1`}
      ref={elRef}
    >
      <div
        className={`border-box flex h-[28px] w-[28px] items-center justify-center rounded-full text-sm text-white ${backgroundColorStyles(
          icon,
        )}`}
      >
        {icon}
      </div>
      {icon !== '❔' && (
        <span
          className={
            'min-w-[36px] max-w-[36px] rounded-md bg-medieval-parchment px-1 text-center text-xs font-semibold text-black'
          }
        >
          {displayValue()}
        </span>
      )}
      {modalOpen && info.length && (
        <div className="absolute -top-[128px] left-1/2 z-50 max-h-[128px] min-h-[64px] min-w-[128px] -translate-x-1/2 overflow-auto rounded-md bg-medieval-parchment p-2 text-center font-sans text-xs text-black shadow-lg">
          {info}
        </div>
      )}
    </div>
  );
}
