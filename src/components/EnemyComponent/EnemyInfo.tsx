import type { EnemyAction } from '@/model/entities/character';
import type { Enemy } from '@/model/entities/enemy';
import Bar from '../reusable/Bar';
import Indicator from '../reusable/Indicator';

type EnemyInfoProps = {
  enemy: Enemy<EnemyAction> | null;
};

export default function EnemyInfo({ enemy }: EnemyInfoProps) {
  if (enemy === null || enemy.state === 'dead') return <></>;
  return (
    <div className="absolute bottom-0 right-0 flex h-[256px] w-[256px] animate-slideLeft flex-col justify-between border-4 border-medieval-parchment bg-medieval-stone p-2">
      <div className="text-2xl font-bold text-medieval-parchment">
        {enemy.name}
      </div>
      <div className="h-24 overflow-auto border-2 border-medieval-silver bg-medieval-wood px-1 text-medieval-parchment">
        {enemy.description}
      </div>
      <div className="">
        <div className="text-center text-medieval-parchment">Health</div>
        <Bar
          size="md"
          value={enemy.health}
          maxValue={enemy.maxHealth}
          showValues={true}
        />
      </div>
      <div className="flex flex-row gap-[2px]">
        <Indicator
          value={enemy.damage}
          icon="⚔️"
          info="Damage enemy deals on hit"
        />
        <Indicator value={enemy.armor} icon="🛡️" info="Enemy armor" />
        <Indicator value={enemy.speed} icon="💨" info="Enemy speed" />
        <Indicator value={0} icon="❔" info="Information about enemy" />
      </div>
    </div>
  );
}
