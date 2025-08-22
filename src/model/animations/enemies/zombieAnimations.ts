import { createAnimation } from '../animation';
import idle from '@/assets/Zombie_1/idle.png';
import attack from '@/assets/Zombie_1/Attack.png';
import dead from '@/assets/Zombie_1/Dead.png';
import death from '@/assets/Zombie_1/Death.png';
import hit from '@/assets/Zombie_1/Hurt.png';
import move from '@/assets/Zombie_1/Walk.png';
import type { EnemyAction } from '@/model/entities/character';
import type { SpriteAnimations } from '@/types';

const idleUrl = new URL(idle, import.meta.url).href;
const attackUrl = new URL(attack, import.meta.url).href;
const hitUrl = new URL(hit, import.meta.url).href;
const deathUrl = new URL(death, import.meta.url).href;
const deadUrl = new URL(dead, import.meta.url).href;
const moveUrl = new URL(move, import.meta.url).href;

export const idleAnimation = () => createAnimation(idleUrl, 6, 100, 'idle');

export const attackAnimation = () =>
  createAnimation(attackUrl, 5, 100, 'attack');

export const hitAnimation = () => createAnimation(hitUrl, 4, 100, 'hit');

export const deathAnimation = () => createAnimation(deathUrl, 5, 100, 'death');

export const deadAnimation = () => createAnimation(deadUrl, 1, 100, 'death');

export const moveAnimation = () => createAnimation(moveUrl, 6, 100, 'move');

export const ressurrectAnimation = () =>
  createAnimation(idleUrl, 6, 100, 'resurrect');

export function createZombieOneAnimations(): SpriteAnimations<EnemyAction> {
  return {
    idle: idleAnimation(),
    attack: attackAnimation(),
    hit: hitAnimation(),
    death: deathAnimation(),
    dead: deadAnimation(),
    move: moveAnimation(),
    resurrect: ressurrectAnimation(),
  };
}
