import type { Skill } from '@/types';
import fireball from '@/assets/fireball_icon.svg';
import fireMageIdle from '@/assets/fire_wizard_idle_icon.svg';
import fireMageStab from '@/assets/fire_wizard_stab_icon.svg';
import flamejet from '@/assets/flamejet_icon.svg';
export const FireMageSkills: Skill[] = [
  {
    id: `FireMage-Regenerate`,
    name: 'Regenerate',
    description:
      'The fire mage stands ready, channeling inner flames and regenerates Mana.',
    url: new URL(fireMageIdle, import.meta.url).href,
    baseDamage: 0,
    damage: 0,
    duration: 0.7,
    speed: 1,
    action: 'idle',
    level: 1,
    cost: -10,
    multiplier: 1,
  },
  {
    id: 'FireMage-FireBall',
    name: 'Fire ball',
    description: 'A fiery projectile that deals damage to a single target.',
    url: new URL(fireball, import.meta.url).href,
    baseDamage: 70,
    damage: 70,
    duration: 0.8,
    speed: 1,
    action: 'fireball',
    level: 1,
    cost: 20,
    multiplier: 1,
  },
  {
    id: 'FireMage-FlameJet',
    name: 'Flame Jet',
    description:
      'A continuous stream of fire that damages all enemies in its path.',
    url: new URL(flamejet, import.meta.url).href,
    baseDamage: 30,
    damage: 30,
    duration: 1,
    speed: 1,
    action: 'flamejet',
    level: 1,
    cost: 35,
    multiplier: 1,
  },
  {
    id: 'FireMage-Stab',
    name: 'Quick Stab',
    description:
      'A quick melee attack that deals moderate damage to a single target.',
    url: new URL(fireMageStab, import.meta.url).href,
    baseDamage: 40,
    damage: 40,
    duration: 0.4,
    speed: 1,
    action: 'attack',
    level: 1,
    cost: 5,
    multiplier: 1,
  },
];
