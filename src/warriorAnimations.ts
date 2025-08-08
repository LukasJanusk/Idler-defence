import { createAnimation } from './animation';
import idle from './assets/warrior/_Idle.png';
import attackOne from './assets/warrior/_Attack.png';
import attackTwo from './assets/warrior/_Attack2NoMovement.png';
import comboAttack from './assets/warrior/_AttackComboNoMovement.png';
import hit from './assets/warrior/_Hit.png';
import death from './assets/warrior/_DeathNoMovement.png';
import dead from './assets/warrior/_DeadNoMovement.png';
import resurrect from './assets/warrior/_ResurrectNoMovement.png';
import type { SpriteAnimations, WarriorActions } from './types';

const idleUrl = new URL(idle, import.meta.url).href;

const attackOneUrl = new URL(attackOne, import.meta.url).href;
const attackTwoUrl = new URL(attackTwo, import.meta.url).href;
const comboUrl = new URL(comboAttack, import.meta.url).href;
const hitUrl = new URL(hit, import.meta.url).href;
const deathUrl = new URL(death, import.meta.url).href;
const deadUrl = new URL(dead, import.meta.url).href;
const resurrectUrl = new URL(resurrect, import.meta.url).href;

export const idleAnimation = async () =>
  createAnimation(idleUrl, 10, 100, 'idle');
export const attackOneAnimation = async () =>
  await createAnimation(attackOneUrl, 4, 100, 'attack');
export const attackTwoAnimation = async () =>
  await createAnimation(attackTwoUrl, 6, 100, 'attack');
export const comboAttackAnimation = async () =>
  await createAnimation(comboUrl, 10, 100, 'combo');
export const hitAnimation = async () =>
  await createAnimation(hitUrl, 1, 100, 'hit');
export const deathAnimation = async () =>
  await createAnimation(deathUrl, 10, 100, 'death');
export const deadAnimation = async () =>
  await createAnimation(deadUrl, 1, 100, 'death');
export const resurrectAnimation = async () =>
  await createAnimation(resurrectUrl, 10, 100, 'resurrect');

export async function createWarriorAnimations(): Promise<
  SpriteAnimations<WarriorActions>
> {
  return {
    idle: await idleAnimation(),
    attack: await attackTwoAnimation(),
    combo: await comboAttackAnimation(),
    hit: await hitAnimation(),
    death: await deathAnimation(),
    dead: await deadAnimation(),
    resurrect: await resurrectAnimation(),
  };
}
