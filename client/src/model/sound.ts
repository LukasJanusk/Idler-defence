import fireball from '@/assets/Sounds/fireball.ogg';
import flamejet from '@/assets/Sounds/flamejet.ogg';
import firewizardStab from '@/assets/Sounds/firewizard_stab.ogg';

import wizardArcaneBlast from '@/assets/Sounds/arcaneblast.ogg';
import wizardMagicSphere from '@/assets/Sounds/magicsphere.ogg';
import wizardMagicArrow from '@/assets/Sounds/magicarrow.ogg';

import knightStab from '@/assets/Sounds/knight_stab.ogg';

import zap from '@/assets/Sounds/zap.ogg';
import chargedBolts from '@/assets/Sounds/chargedbolts.ogg';

import levelUpSound from '@/assets/Sounds/level_up.ogg';
import zombieOneDeathSound from '@/assets/Sounds/zombie_one_death.ogg';
import zombieOneHurtSound from '@/assets/Sounds/zombie_one_hurt.ogg';

export const fireBallSound = new Audio(new URL(fireball, import.meta.url).href);
export const flamejetSound = new Audio(new URL(flamejet, import.meta.url).href);
export const fireWizardStabSound = new Audio(
  new URL(firewizardStab, import.meta.url).href,
);
export const magicSphereSound = new Audio(
  new URL(wizardMagicSphere, import.meta.url).href,
);
export const magicArrowSound = new Audio(
  new URL(wizardMagicArrow, import.meta.url).href,
);
export const arcaneBlastSound = new Audio(
  new URL(wizardArcaneBlast, import.meta.url).href,
);
export const knightStabSound = new Audio(
  new URL(knightStab, import.meta.url).href,
);
export const zapSound = new Audio(new URL(zap, import.meta.url).href);

export const chargedBoltsSound = new Audio(
  new URL(chargedBolts, import.meta.url).href,
);

export const levelUp = new Audio(new URL(levelUpSound, import.meta.url).href);
export const zombieOneDeath = new Audio(
  new URL(zombieOneDeathSound, import.meta.url).href,
);
export const zombieOneHurt = new Audio(
  new URL(zombieOneHurtSound, import.meta.url).href,
);
