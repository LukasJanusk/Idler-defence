import { createAnimation } from '../animation';
import idle from '@/assets/Gorgon_1/Idle.png';
import attack from '@/assets/Gorgon_1/Attack_1.png';
// import attack2 from '@/assets/Gorgon_1/Attack_2.png';
// import attack3 from '@/assets/Gorgon_1/Attack_3.png';
import dead from '@/assets/Gorgon_1/Dead.png';
import death from '@/assets/Gorgon_1/Death.png';
import hit from '@/assets/Gorgon_1/Hurt.png';
import move from '@/assets/Gorgon_1/Walk.png';
import type { EnemyAction } from '@/model/entities/character';
import type { SpriteAnimations } from '@/types';
import resurrect from '@/assets/Gorgon_1/Resurrect.png';

const idleUrl = new URL(idle, import.meta.url).href;
const attackUrl = new URL(attack, import.meta.url).href;
const hitUrl = new URL(hit, import.meta.url).href;
const deathUrl = new URL(death, import.meta.url).href;
const deadUrl = new URL(dead, import.meta.url).href;
const moveUrl = new URL(move, import.meta.url).href;

export const idleAnimation = () => createAnimation(idleUrl, 7, 100, 'idle');

export const attackAnimation = () =>
  createAnimation(attackUrl, 16, 100, 'attack');

export const hitAnimation = () => createAnimation(hitUrl, 3, 100, 'hit');

export const deathAnimation = () => createAnimation(deathUrl, 3, 100, 'death');

export const deadAnimation = () => createAnimation(deadUrl, 1, 100, 'dead');

export const moveAnimation = () => createAnimation(moveUrl, 13, 100, 'move');

export const ressurrectAnimation = () =>
  createAnimation(resurrect, 3, 100, 'resurrect');

export function createGreenGorgonAnimations(): SpriteAnimations<EnemyAction> {
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
