import { createAnimation } from './animation';
import idle from '@/assets/Knight/Idle.png';
import attackOne from '@/assets/Knight/Attack 1.png';
import attackTwo from '@/assets/Knight/Attack 2.png';
import attackThree from '@/assets/Knight/Attack 3.png';
import protect from '@/assets/Knight/Protect.png';
import guard from '@/assets/Knight/Defend.png';
import hit from '@/assets/Knight/Hurt.png';
import dead from '@/assets/Knight/Dead.png';
import death from '@/assets/Knight/Death.png';
import resurrect from '@/assets/Knight/Resurrect.png';
import type { SpriteAnimations } from '@/types';
import type { KnightAction } from '@/model/entities/character';

const idleUrl = new URL(idle, import.meta.url).href;

const attackOneUrl = new URL(attackOne, import.meta.url).href;
const attackTwoUrl = new URL(attackTwo, import.meta.url).href;
const attackThreeUrl = new URL(attackThree, import.meta.url).href;
const protectUrl = new URL(protect, import.meta.url).href;
const guardUrl = new URL(guard, import.meta.url).href;
const hitUrl = new URL(hit, import.meta.url).href;
const deathUrl = new URL(death, import.meta.url).href;
const deadUrl = new URL(dead, import.meta.url).href;
const resurrectUrl = new URL(resurrect, import.meta.url).href;

export const idleAnimation = () => createAnimation(idleUrl, 4, 100, 'idle');
export const attackOneAnimation = () =>
  createAnimation(attackOneUrl, 5, 100, 'attack');
export const attackTwoAnimation = () =>
  createAnimation(attackTwoUrl, 4, 100, 'attack');
export const attackThreeAnimation = () =>
  createAnimation(attackThreeUrl, 4, 100, 'attack');
export const protectAnimation = () =>
  createAnimation(protectUrl, 1, 100, 'attack');
export const guardAnimation = () => createAnimation(guardUrl, 5, 100, 'attack');
export const hitAnimation = () => createAnimation(hitUrl, 2, 100, 'hit');
export const deathAnimation = () => createAnimation(deathUrl, 6, 100, 'death');
export const deadAnimation = () => createAnimation(deadUrl, 1, 100, 'death');
export const resurrectAnimation = () =>
  createAnimation(resurrectUrl, 6, 100, 'resurrect');

export function createKnightAnimations(): SpriteAnimations<KnightAction> {
  return {
    idle: idleAnimation(),
    attack: attackThreeAnimation(),
    guard: guardAnimation(),
    protect: protectAnimation(),
    hit: hitAnimation(),
    death: deathAnimation(),
    dead: deadAnimation(),
    resurrect: resurrectAnimation(),
  };
}
