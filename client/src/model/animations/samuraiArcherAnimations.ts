import { createAnimation } from './animation';
import idle from '@/assets/Samurai_Archer/Idle.png';
import attackOne from '@/assets/Samurai_Archer/Attack_1.png';
import attackThree from '@/assets/Samurai_Archer/Attack_3.png';
import bowShot from '@/assets/Samurai_Archer/Shot.png';
import hit from '@/assets/Samurai_Archer/Hurt.png';
import death from '@/assets/Samurai_Archer/Death.png';
import dead from '@/assets/Samurai_Archer/Dead.png';
import type { SpriteAnimations } from '@/types';
import type { SamuraiArcherAction } from '@/model/entities/character';

const idleUrl = new URL(idle, import.meta.url).href;
const attackOneUrl = new URL(attackOne, import.meta.url).href;
const attackThreeUrl = new URL(attackThree, import.meta.url).href;
const bowShotUrl = new URL(bowShot, import.meta.url).href;
const hitUrl = new URL(hit, import.meta.url).href;
const deathUrl = new URL(death, import.meta.url).href;
const deadUrl = new URL(dead, import.meta.url).href;

export const idleAnimation = () => createAnimation(idleUrl, 9, 100, 'idle');
export const slashAnimation = () =>
  createAnimation(attackOneUrl, 5, 100, 'attack');
export const drawCutAnimation = () =>
  createAnimation(attackThreeUrl, 6, 100, 'drawCut');
export const bowShotAnimation = () =>
  createAnimation(bowShotUrl, 14, 100, 'bowShot');
export const hitAnimation = () => createAnimation(hitUrl, 3, 100, 'hit');
export const deathAnimation = () => createAnimation(deathUrl, 5, 100, 'death');
export const deadAnimation = () => createAnimation(deadUrl, 1, 100, 'dead');
export const resurrectAnimation = () =>
  createAnimation(idleUrl, 9, 100, 'resurrect');

export function createSamuraiArcherAnimations(): SpriteAnimations<SamuraiArcherAction> {
  return {
    idle: idleAnimation(),
    attack: slashAnimation(),
    drawCut: drawCutAnimation(),
    bowShot: bowShotAnimation(),
    hit: hitAnimation(),
    death: deathAnimation(),
    dead: deadAnimation(),
    resurrect: resurrectAnimation(),
  };
}
