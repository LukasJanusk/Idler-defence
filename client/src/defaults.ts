import { v4 } from 'uuid';
import {
  FireMage,
  Knight,
  LightningMage,
  Wizard,
} from './model/entities/character';
import type { AnyCharacter, GameState, Settings } from './types';
import { zombieOneDeath, zombieOneHurt } from './model/sound';

import { Enemy } from './model/entities/enemy';
import { createZombieOneAnimations } from './model/animations/enemies/zombieAnimations';
import { createBasicAttack } from './model/enemyAttacks/basicAttack';
import { createSavageZombieAnimations } from './model/animations/enemies/savageZombieAnimations';
import { createFastZombieAnimations } from './model/animations/enemies/fastZombieAnimations';
import { createHungryZombieAnimations } from './model/animations/enemies/HungryZombieAnimations';
import { createGreenGorgonAnimations } from './model/animations/enemies/greenGorgonAnimations';
import config from '@/config';

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

export const defaultSettings: Settings = {
  automateSkillCast: true,
  showGrid: false,
  drawParticles: true,
  pause: false,
  showUi: false,
};

export const defaultGold = () => 200;

export const createAvailableCharacters = () => {
  const available = new Set<AnyCharacter>();
  if (config.env === 'test')
    available.add(new LightningMage('test lightning mage', 'test'));
  else {
    available.add(new Wizard(`Wizard${v4()}`, pickRandomName(namesMale)));
    available.add(
      new LightningMage(`LightningMage${v4()}`, pickRandomName(namesFemale)),
    );
    available.add(new Knight(`Knight${v4()}`, pickRandomName(namesMale)));
    available.add(new FireMage(`FireMage${v4()}`, pickRandomName(namesMale)));
  }

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
  zombie.bounty = 20;
  zombie.experience = 50;
  zombie.stunRecovery = 100;
  zombie.description = 'Your average hard working zombie.';
  zombie.registerOnHit(() => zombieOneHurt.play());
  zombie.registerOnDeath(() => zombieOneDeath.play());
  return zombie;
};

export const createSavageZombie = () => {
  const savage = new Enemy(
    `SavageZombie-${v4()}`,
    'Savage zombie',
    2500,
    0,
    15,
    6,
    createSavageZombieAnimations(),
    { x: 768, y: 0, width: 128, height: 128 },
    createBasicAttack(0, 0, 15, 1),
  );
  savage.bounty = 100;
  savage.experience = 1000;
  savage.stunRecovery = 70;
  savage.description =
    'Starved and aggressive zombies are knwon as Savage zombies.';

  return savage;
};

export const createFastZombie = () => {
  const fast = new Enemy(
    `FastZombie-${v4()}`,
    'Fast Zombie',
    500,
    0,
    5,
    13,
    createFastZombieAnimations(),
    { x: 768, y: 0, width: 128, height: 128 },
    createBasicAttack(0, 0, 7, 1, 1),
  );
  fast.bounty = 30;
  fast.health = 600;
  fast.experience = 70;
  fast.stunRecovery = 100;
  fast.description = 'Zombies that are use of catching small animals.';

  return fast;
};

export const createHungryZombie = () => {
  const hungry = new Enemy(
    `HungryZombie-${v4()}`,
    'Hungry Zombie',
    300,
    0,
    4,
    4,
    createHungryZombieAnimations(),
    { x: 768, y: 0, width: 128, height: 128 },
    createBasicAttack(0, 0, 7, 1, 1),
  );
  hungry.bounty = 10;
  hungry.experience = 20;
  hungry.health = 300;
  hungry.stunRecovery = 300;
  hungry.description = 'Weak zombies, who have not had a meal in a long time.';

  return hungry;
};

export const createGreenGorgon = () => {
  const gorgon = new Enemy(
    `Gorgon-${v4()}`,
    'Green gorgon',
    10000,
    0,
    50,
    10,
    createGreenGorgonAnimations(),
    { x: 768, y: 0, width: 128, height: 128 },
    createBasicAttack(0, 0, 50, 1),
  );
  gorgon.bounty = 1000;
  gorgon.experience = 5000;
  gorgon.health = 10000;
  gorgon.stunRecovery = 75;
  gorgon.description =
    'Green gorgons are agile and relentless creatures. They slither through shadows, striking fear into any who dare cross their path.';

  return gorgon;
};

export const createTestEnemy = () => {
  const enemy = new Enemy(
    'test-enemy',
    'Test zombie',
    1,
    0,
    1,
    5,
    createZombieOneAnimations(),
    { x: 384, y: 256, width: 128, height: 128 },
    createBasicAttack(0, 0, 1, 1),
  );
  enemy.description = 'test description';
  enemy.bounty = 10;
  enemy.experience = 10;
  enemy.health = 1;

  return enemy;
};
