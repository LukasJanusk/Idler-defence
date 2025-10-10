import { useGameStore } from '@/store';
import Button from './Button';
import Toggle from './Toggle';

export default function Settings() {
  const settings = useGameStore((store) => store.settings);
  const setSettings = useGameStore((store) => store.setSettings);
  return (
    <div className="relative flex h-[600px] min-h-[512px] w-[640px] flex-col gap-2 overflow-auto border-4 border-medieval-silver bg-medieval-wood p-6 text-medieval-parchment shadow-xl">
      <div className="flex w-full flex-row items-center justify-between">
        <Button
          aria-label={`toggle grid button`}
          onClick={() => setSettings({ showGrid: !settings.showGrid })}
          className="mr-2 w-full"
        >
          Grid
        </Button>
        <Toggle
          on={settings.showGrid}
          onClick={() => setSettings({ showGrid: !settings.showGrid })}
        />
      </div>
      <div className="flex w-full flex-row items-center justify-between">
        <Button
          aria-label={`toggle particles button`}
          onClick={() =>
            setSettings({ drawParticles: !settings.drawParticles })
          }
          className="mr-2 w-full"
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
      <div className="flex w-full flex-row items-center justify-between">
        <Button
          aria-label={`toggle autocast button`}
          onClick={() =>
            setSettings({
              automateSkillCast: !settings.automateSkillCast,
            })
          }
          className="mr-2 w-full"
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
      <div className="flex w-full flex-row items-center justify-between">
        <Button
          aria-label={`toggle show ui button`}
          onClick={() => setSettings({ showUi: !settings.showUi })}
          className="mr-2 w-full"
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
