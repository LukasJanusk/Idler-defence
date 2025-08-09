import { v4 } from 'uuid';
import { FireMage, Knight, LightningMage, Wizard } from './character';
import type { GameState } from './types';
import { createFireMageAnimations } from './fireWizardAnimations';
import { createWizardAnimations } from './wizardAnimations';
import { createKnightAnimations } from './knightAnimations';
import { createLightningMageAnimations } from './lightningMageAnimations';

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
export async function initializeGameState(): Promise<GameState> {
  return {
    party: { pos1: null, pos2: null, pos3: null, pos4: null },
    availableCharacters: [
      new Wizard(
        `Wizard${v4()}`,
        pickRandomName(namesMale),
        await createWizardAnimations(),
      ),
      new LightningMage(
        `LightningMage${v4()}`,
        pickRandomName(namesFemale),
        await createLightningMageAnimations(),
      ),
      new Knight(
        `Knight${v4()}`,
        pickRandomName(namesMale),
        await createKnightAnimations(),
      ),
      new FireMage(
        `FireMage${v4()}`,
        pickRandomName(namesMale),
        await createFireMageAnimations(),
      ),
    ],
    projectiles: [],
  };
}
