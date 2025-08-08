import { createAnimation } from './animation';
import idle from './assets/warrior/_Idle.png';
import attackOne from './assets/warrior/_Attack.png';
import attackTwo from './assets/warrior/_Attack2NoMovement.png';
import comboAttack from './assets/warrior/_AttackComboNoMovement.png';
import hit from './assets/warrior/_Hit.png';
import death from './assets/warrior/_DeathNoMovement.png';
import type { SpriteAnimations, WarriorActions } from './types';

const idleUrl = new URL(idle, import.meta.url).href;
const attackOneUrl = new URL(attackOne, import.meta.url).href;
const attackTwoUrl = new URL(attackTwo, import.meta.url).href;
const comboUrl = new URL(comboAttack, import.meta.url).href;
const hitUrl = new URL(hit, import.meta.url).href;
const deathUrl = new URL(death, import.meta.url).href;

export const idleAnimation = await createAnimation(idleUrl, 10, 100);
export const attackOneAnimation = await createAnimation(attackOneUrl, 4, 100);
export const attackTwoAnimation = await createAnimation(attackTwoUrl, 6, 100);
export const comboAttackAnimation = await createAnimation(comboUrl, 10, 100);
export const hitAnimation = await createAnimation(hitUrl, 1, 100);
export const deathAnimation = await createAnimation(deathUrl, 10, 100);

export const warriorAnimations: SpriteAnimations<WarriorActions> = {
  idle: idleAnimation,
  attack: attackTwoAnimation,
  combo: comboAttackAnimation,
  hit: hitAnimation,
  death: deathAnimation,
};
