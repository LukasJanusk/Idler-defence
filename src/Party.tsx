import type { Character } from './character';
import type { CharacterActions } from './types';

type PartyProps = {
  first: Character<CharacterActions>;
  second: Character<CharacterActions>;
  third: Character<CharacterActions>;
  fourth: Character<CharacterActions>;
};
export default function Party({ first, second, third, fourth }: PartyProps) {}
