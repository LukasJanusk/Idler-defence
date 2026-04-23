import { Attack } from './attack';
import type { EnemyAction } from './character';
import { Enemy } from './enemy';
import { Projectile } from './projectile';

export const isProjectile = (entity: unknown): entity is Projectile => {
  if (entity instanceof Projectile) {
    return true;
  }
  return false;
};

export const isEnemy = (entity: unknown): entity is Enemy<EnemyAction> => {
  if (entity instanceof Enemy) {
    return true;
  }
  return false;
};

export const isAttack = (entity: unknown): entity is Attack => {
  if (entity instanceof Attack) {
    return true;
  }
  return false;
};
