import { createAnimation } from './animation';
import idle from './assets/warrior/_Idle.png';
import attackOne from './assets/warrior/_Attack.png';
import attackTwo from './assets/warrior/_Attack2NoMovement.png';
import comboAttack from './assets/warrior/_AttackComboNoMovement.png';
import hit from './assets/warrior/_Hit.png';
import death from './assets/warrior/_DeathNoMovement.png';
import dead from './assets/warrior/_DeadNoMovement.png';
import resurrect from './assets/warrior/_ResurrectNoMovement.png';
import type { SpriteAnimations } from './types';
import type { WarriorAction } from './character';

const idleUrl = new URL(idle, import.meta.url).href;

const attackOneUrl = new URL(attackOne, import.meta.url).href;
const attackTwoUrl = new URL(attackTwo, import.meta.url).href;
const comboUrl = new URL(comboAttack, import.meta.url).href;
const hitUrl = new URL(hit, import.meta.url).href;
const deathUrl = new URL(death, import.meta.url).href;
const deadUrl = new URL(dead, import.meta.url).href;
const resurrectUrl = new URL(resurrect, import.meta.url).href;

export const idleAnimation = () => createAnimation(idleUrl, 10, 100, 'idle');
export const attackOneAnimation = () =>
  createAnimation(attackOneUrl, 4, 100, 'attack');
export const attackTwoAnimation = () =>
  createAnimation(attackTwoUrl, 6, 100, 'attack');
export const comboAttackAnimation = () =>
  createAnimation(comboUrl, 10, 100, 'combo');
export const hitAnimation = () => createAnimation(hitUrl, 1, 100, 'hit');
export const deathAnimation = () => createAnimation(deathUrl, 10, 100, 'death');
export const deadAnimation = () => createAnimation(deadUrl, 1, 100, 'death');
export const resurrectAnimation = () =>
  createAnimation(resurrectUrl, 10, 100, 'resurrect');

export function createWarriorAnimations(): SpriteAnimations<WarriorAction> {
  return {
    idle: idleAnimation(),
    attack: attackTwoAnimation(),
    combo: comboAttackAnimation(),
    hit: hitAnimation(),
    death: deathAnimation(),
    dead: deadAnimation(),
    resurrect: resurrectAnimation(),
  };
}
