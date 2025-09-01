import { createAnimation } from '../animation';
import idle from '@/assets/Zombie_4/Idle.png';
import attack from '@/assets/Zombie_4/Attack.png';
import dead from '@/assets/Zombie_4/Dead.png';
import death from '@/assets/Zombie_4/Death.png';
import hit from '@/assets/Zombie_4/Hurt.png';
import move from '@/assets/Zombie_4/Walk.png';
import type { EnemyAction } from '@/model/entities/character';
import type { SpriteAnimations } from '@/types';

const idleUrl = new URL(idle, import.meta.url).href;
const attackUrl = new URL(attack, import.meta.url).href;
const hitUrl = new URL(hit, import.meta.url).href;
const deathUrl = new URL(death, import.meta.url).href;
const deadUrl = new URL(dead, import.meta.url).href;
const moveUrl = new URL(move, import.meta.url).href;

export const idleAnimation = () => createAnimation(idleUrl, 7, 100, 'idle');

export const attackAnimation = () =>
  createAnimation(attackUrl, 10, 100, 'attack');

export const hitAnimation = () => createAnimation(hitUrl, 4, 100, 'hit');

export const deathAnimation = () => createAnimation(deathUrl, 5, 100, 'death');

export const deadAnimation = () => createAnimation(deadUrl, 1, 100, 'dead');

export const moveAnimation = () => createAnimation(moveUrl, 12, 100, 'move');

export const ressurrectAnimation = () =>
  createAnimation(idleUrl, 5, 100, 'resurrect');

export function createHungryZombieAnimations(): SpriteAnimations<EnemyAction> {
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
