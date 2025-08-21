import { createAnimation } from './animation';
import idle from '@/assets/Fire_Wizard/Idle.png';
import attackOne from '@/assets/Fire_Wizard/Attack_1.png';
import attackTwo from '@/assets/Fire_Wizard/Attack_2.png';
import fireBall from '@/assets/Fire_Wizard/Fireball.png';
import flameJet from '@/assets/Fire_Wizard/Flame_jet.png';
import hit from '@/assets/Fire_Wizard/Hurt.png';
import death from '@/assets/Fire_Wizard/Death.png';
import dead from '@/assets/Fire_Wizard/Dead.png';
import resurrect from '@/assets/Fire_Wizard/Resurrect.png';
import type { SpriteAnimations } from '@/types';
import type { FireMageAction } from '@/model/entities/character';

const idleUrl = new URL(idle, import.meta.url).href;
const attackOneUrl = new URL(attackOne, import.meta.url).href;
const attackTwoUrl = new URL(attackTwo, import.meta.url).href;
const fireBallUrl = new URL(fireBall, import.meta.url).href;
const flameJetUrl = new URL(flameJet, import.meta.url).href;
const hitUrl = new URL(hit, import.meta.url).href;
const deathUrl = new URL(death, import.meta.url).href;
const deadUrl = new URL(dead, import.meta.url).href;
const resurrectUrl = new URL(resurrect, import.meta.url).href;

export const idleAnimation = () => createAnimation(idleUrl, 7, 100, 'idle');

export const attackOneAnimation = () =>
  createAnimation(attackOneUrl, 4, 100, 'attack');

export const attackTwoAnimation = () =>
  createAnimation(attackTwoUrl, 4, 100, 'attack');

export const fireBallAnimation = () =>
  createAnimation(fireBallUrl, 8, 100, 'fireball');

export const flameJetAnimation = () =>
  createAnimation(flameJetUrl, 14, 100, 'flamejet');

export const hitAnimation = () => createAnimation(hitUrl, 3, 100, 'hit');

export const deathAnimation = () => createAnimation(deathUrl, 6, 100, 'death');

export const deadAnimation = () => createAnimation(deadUrl, 1, 100, 'death');

export const resurrectAnimation = () =>
  createAnimation(resurrectUrl, 6, 100, 'resurrect');

export function createFireMageAnimations(): SpriteAnimations<FireMageAction> {
  return {
    idle: idleAnimation(),
    attack: attackTwoAnimation(),
    fireball: fireBallAnimation(),
    flamejet: flameJetAnimation(),
    hit: hitAnimation(),
    death: deathAnimation(),
    dead: deadAnimation(),
    resurrect: resurrectAnimation(),
  };
}
