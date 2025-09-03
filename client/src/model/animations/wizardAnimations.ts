import { createAnimation } from './animation';
import idle from '@/assets/Wanderer_Magican/Idle.png';
import attackOne from '@/assets/Wanderer_Magican/Attack_1.png';
import attackTwo from '@/assets/Wanderer_Magican/Attack_2.png';
import magicSphere from '@/assets/Wanderer_Magican/Magic_sphere.png';
import hit from '@/assets/Wanderer_Magican/Hurt.png';
import death from '@/assets/Wanderer_Magican/Death.png';
import dead from '@/assets/Wanderer_Magican/Dead.png';
import resurrect from '@/assets/Wanderer_Magican/Resurrect.png';
import type { SpriteAnimations } from '@/types';
import type { WizardAction } from '@/model/entities/character';

const idleUrl = new URL(idle, import.meta.url).href;
const attackOneUrl = new URL(attackOne, import.meta.url).href;
const attackTwoUrl = new URL(attackTwo, import.meta.url).href;
const magicSpehereUrl = new URL(magicSphere, import.meta.url).href;
const hitUrl = new URL(hit, import.meta.url).href;
const deathUrl = new URL(death, import.meta.url).href;
const deadUrl = new URL(dead, import.meta.url).href;
const resurrectUrl = new URL(resurrect, import.meta.url).href;

export const idleAnimation = () => createAnimation(idleUrl, 8, 100, 'idle');

export const attackOneAnimation = () =>
  createAnimation(attackTwoUrl, 9, 100, 'magicArrow');

export const attackTwoAnimation = () =>
  createAnimation(attackOneUrl, 7, 100, 'magicBall');

export const magicSphereAnimation = () =>
  createAnimation(magicSpehereUrl, 16, 100, 'magicSphere');

export const hitAnimation = () => createAnimation(hitUrl, 4, 100, 'hit');

export const deathAnimation = () => createAnimation(deathUrl, 4, 100, 'death');

export const deadAnimation = () => createAnimation(deadUrl, 1, 100, 'dead');

export const resurrectAnimation = () =>
  createAnimation(resurrectUrl, 4, 100, 'resurrect');

export function createWizardAnimations(): SpriteAnimations<WizardAction> {
  return {
    idle: idleAnimation(),
    magicArrow: attackOneAnimation(),
    magicBall: attackTwoAnimation(),
    magicSphere: magicSphereAnimation(),
    hit: hitAnimation(),
    death: deathAnimation(),
    dead: deadAnimation(),
    resurrect: resurrectAnimation(),
  };
}
