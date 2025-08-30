import type { EnemyAction } from '../model/entities/character';
import { Enemy } from '../model/entities/enemy';

import { useState, type ReactNode } from 'react';
import EnemySprite from './EnemySprite';
import EnemyInfo from './EnemyInfo';

type Props = {
  enemies: Enemy<EnemyAction>[];
  children: ReactNode;
};
export default function EnemyComponent({ enemies, children }: Props) {
  const [enemyInfo, setEnemyInfo] = useState<Enemy<EnemyAction> | null>(null);

  return (
    <div className="relative left-0 top-0 z-0 h-full w-full bg-transparent">
      {enemies.map((enemy) => {
        return <EnemySprite setInfo={setEnemyInfo} enemy={enemy} />;
      })}
      {children}
      <EnemyInfo enemy={enemyInfo} />
    </div>
  );
}
