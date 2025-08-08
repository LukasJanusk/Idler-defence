import { v4 } from 'uuid';
import { Warrior } from './character';
import type { GameState, WarriorActions } from './types';
import { createWarriorAnimations } from './warriorAnimations';

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
const warriorActions: WarriorActions[] = [
  'idle',
  'attack',
  'hit',
  'death',
  'resurrect',
  'combo',
];
export async function initializeGameState(): Promise<GameState> {
  return {
    party: { pos1: null, pos2: null, pos3: null, pos4: null },
    availableCharacters: [
      new Warrior(
        `Warrior${v4()}`,
        pickRandomName(namesMale),
        await createWarriorAnimations(),
        warriorActions,
      ),
      new Warrior(
        `Warrior${v4()}`,
        pickRandomName(namesMale),
        await createWarriorAnimations(),
        warriorActions,
      ),
      new Warrior(
        `Warrior${v4()}`,
        pickRandomName(namesMale),
        await createWarriorAnimations(),
        warriorActions,
      ),
      new Warrior(
        `Warrior${v4()}`,
        pickRandomName(namesMale),
        await createWarriorAnimations(),
        warriorActions,
      ),
      new Warrior(
        `Warrior${v4()}`,
        pickRandomName(namesMale),
        await createWarriorAnimations(),
        warriorActions,
      ),
      new Warrior(
        `Warrior${v4()}`,
        pickRandomName(namesMale),
        await createWarriorAnimations(),
        warriorActions,
      ),
    ],
  };
}
