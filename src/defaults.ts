import { v4 } from 'uuid';
import {
  FireMage,
  Knight,
  LightningMage,
  Wizard,
} from './model/entities/character';
import type { AnyCharacter, GameState, Settings } from './types';

import { Enemy } from './model/entities/enemy';
import { createZombieOneAnimations } from './model/animations/enemies/zombieAnimations';
import { createBasicAttack } from './model/enemyAttacks/basicAttack';

const pickRandomName = (names: string[]): string => {
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};
const namesMale: string[] = [
  'Marcus',
  'Gaius',
  'Titus',
  'Aurelius',
  'Vlad',
  'Junius',
  'Lucius',
  'Claudius',
  'Sextus',
  'Quintus',
  'Emilio',
  'Caius',
  'Tiberius',
  'Publius',
  'Decimus',
  'Servius',
  'Aulus',
  'Gnaeus',
  'Cnaeus',
  'Sergius',
  'Tullius',
  'Valerius',
  'Appius',
  'Antonius',
  'Cornelius',
  'Fabius',
  'Livius',
  'Manlius',
  'Pompeius',
];
const namesFemale: string[] = [
  'Julia',
  'Octavia',
  'Antonia',
  'Flavia',
  'Cornelia',
  'Aelia',
  'Livia',
  'Claudia',
];

export const createAvailableCharacters = () => {
  const available = new Set<AnyCharacter>();
  available.add(new Wizard(`Wizard${v4()}`, pickRandomName(namesMale)));
  available.add(
    new LightningMage(`LightningMage${v4()}`, pickRandomName(namesFemale)),
  );
  available.add(new Knight(`Knight${v4()}`, pickRandomName(namesMale)));
  available.add(new FireMage(`FireMage${v4()}`, pickRandomName(namesMale)));
  return available;
};
export function initializeGameState(): GameState {
  return {
    party: { pos1: null, pos2: null, pos3: null, pos4: null },
    availableCharacters: createAvailableCharacters(),
    projectiles: [],
  };
}

export const createZombieOne = () => {
  const zombie = new Enemy(
    `ZombieOne-${v4()}`,
    'Zombie',
    1000,
    0,
    5,
    5,
    createZombieOneAnimations(),
    { x: 768, y: 0, width: 128, height: 128 },
    createBasicAttack(0, 0, 0, 1),
  );
  zombie.bounty = 40;
  zombie.experience = 50;
  zombie.stunRecovery = 100;
  zombie.description = 'Slow moving and weak.';
  return zombie;
};

export const defaultSettings: Settings = {
  automateSkillCast: false,
  showGrid: false,
  drawParticles: false,
};
export const defaultGold = () => 200;
