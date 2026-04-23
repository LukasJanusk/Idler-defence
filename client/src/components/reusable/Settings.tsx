import { useGameStore } from '@/store';
import Button from './Button';
import CloseButton from './CloseButton';
import Toggle from './Toggle';

type Props = {
  title?: string;
  onClose?: () => void;
  className?: string;
  closeButtonClassName?: string;
};

export default function Settings({
  title,
  onClose,
  className = '',
  closeButtonClassName = '',
}: Props) {
  const settings = useGameStore((store) => store.settings);
  const setSettings = useGameStore((store) => store.setSettings);
  return (
    <div
      className={`relative flex h-[600px] min-h-[512px] w-[640px] flex-col gap-2 overflow-auto border-4 border-medieval-silver bg-medieval-stone p-6 text-medieval-parchment shadow-xl ${className}`}
    >
      {onClose && (
        <CloseButton onClose={onClose} className={closeButtonClassName} />
      )}
      {(title || onClose) && (
        <div className="mb-2 flex min-h-10 items-center pr-10">
          {title && <h1 className="text-2xl font-bold">{title}</h1>}
        </div>
      )}
      <div className="flex w-full flex-row items-center justify-between gap-3 rounded-sm border-2 border-medieval-silver/40 bg-medieval-silver/20 p-2">
        <Button
          aria-label={`toggle grid button`}
          onClick={() => setSettings({ showGrid: !settings.showGrid })}
          className="mr-2 w-full max-w-[320px] hover:bg-green-800"
        >
          Grid
        </Button>
        <Toggle
          on={settings.showGrid}
          onClick={() => setSettings({ showGrid: !settings.showGrid })}
        />
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-3 rounded-sm border-2 border-medieval-silver/40 bg-medieval-silver/20 p-2">
        <Button
          aria-label={`toggle particles button`}
          onClick={() =>
            setSettings({ drawParticles: !settings.drawParticles })
          }
          className="mr-2 w-full max-w-[320px] hover:bg-green-800"
        >
          Particles
        </Button>
        <Toggle
          on={settings.drawParticles}
          onClick={() =>
            setSettings({ drawParticles: !settings.drawParticles })
          }
        />
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-3 rounded-sm border-2 border-medieval-silver/40 bg-medieval-silver/20 p-2">
        <Button
          aria-label={`toggle autocast button`}
          onClick={() =>
            setSettings({
              automateSkillCast: !settings.automateSkillCast,
            })
          }
          className="mr-2 w-full max-w-[320px] hover:bg-green-800"
        >
          Autocast
        </Button>
        <Toggle
          on={settings.automateSkillCast}
          onClick={() =>
            setSettings({
              automateSkillCast: !settings.automateSkillCast,
            })
          }
        />
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-3 rounded-sm border-2 border-medieval-silver/40 bg-medieval-silver/20 p-2">
        <Button
          aria-label={`toggle show ui button`}
          onClick={() => setSettings({ showUi: !settings.showUi })}
          className="mr-2 w-full max-w-[320px] hover:bg-green-800"
        >
          Always show UI
        </Button>
        <Toggle
          on={settings.showUi}
          onClick={() => setSettings({ showUi: !settings.showUi })}
        />
      </div>
    </div>
  );
}
