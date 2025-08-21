import { createAnimation } from './animation';
import idle from '@/assets/Lightning_Mage/Idle.png';
import attackOne from '@/assets/Lightning_Mage/Attack_1.png';
import chargedBolts from '@/assets/Lightning_Mage/Attack_2.png';
import hit from '@/assets/Lightning_Mage/Hurt.png';
import death from '@/assets/Lightning_Mage/Death.png';
import dead from '@/assets/Lightning_Mage/Dead.png';
import resurrect from '@/assets/Lightning_Mage/Resurrect.png';
import type { SpriteAnimations } from '@/types';
import type { LightningMageAction } from '@/model/entities/character';

const idleUrl = new URL(idle, import.meta.url).href;
const attackOneUrl = new URL(attackOne, import.meta.url).href;
const chargedBoltsUrl = new URL(chargedBolts, import.meta.url).href;
const hitUrl = new URL(hit, import.meta.url).href;
const deathUrl = new URL(death, import.meta.url).href;
const deadUrl = new URL(dead, import.meta.url).href;
const resurrectUrl = new URL(resurrect, import.meta.url).href;

export const idleAnimation = () => createAnimation(idleUrl, 7, 100, 'idle');
export const attackOneAnimation = () =>
  createAnimation(attackOneUrl, 10, 100, 'attack');
export const chargedBoltsAnimation = () =>
  createAnimation(chargedBoltsUrl, 4, 100, 'attack');
export const hitAnimation = () => createAnimation(hitUrl, 3, 100, 'hit');
export const deathAnimation = () => createAnimation(deathUrl, 5, 100, 'death');
export const deadAnimation = () => createAnimation(deadUrl, 1, 100, 'death');
export const resurrectAnimation = () =>
  createAnimation(resurrectUrl, 5, 100, 'resurrect');

export function createLightningMageAnimations(): SpriteAnimations<LightningMageAction> {
  return {
    idle: idleAnimation(),
    attack: attackOneAnimation(),
    chargedBolts: chargedBoltsAnimation(),
    hit: hitAnimation(),
    death: deathAnimation(),
    dead: deadAnimation(),
    resurrect: resurrectAnimation(),
  };
}
