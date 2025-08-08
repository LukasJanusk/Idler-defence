import { XCircle } from 'lucide-react';
import { useGameContext } from './useGameContext';
import type { Character } from './character';
import type { CharacterActions } from './types';

type Props = {
  onClick: () => void;
  position: 'pos1' | 'pos2' | 'pos3' | 'pos4';
};
export default function CharacterSelectModal({ onClick, position }: Props) {
  const { state, dispatch } = useGameContext();
  const addCharacterToParty = (character: Character<CharacterActions>) => {
    dispatch({
      type: 'ADD_PARTY_MEMBER',
      payload: { position, character },
    });
    onClick();
  };
  return (
    <div className="relative rounded-sm bg-black/50 p-6 shadow-lg">
      <button
        className="absolute right-2 top-2 h-6 w-6 rounded-full bg-red-800 p-1 hover:bg-red-500"
        onClick={() => onClick()}
      >
        <XCircle className="h-full w-full text-white" />
      </button>
      <h2 className="mb-4 text-xl font-bold text-white">Select Character</h2>
      <div className="flex flex-col items-center justify-center space-y-2">
        {state.availableCharacters.map((character) => (
          <button
            key={character.id}
            className="flex max-h-[400px] flex-col items-center justify-center overflow-y-auto rounded-lg bg-gray-700 p-1 text-white hover:bg-gray-600"
            onClick={() => addCharacterToParty(character)}
          >
            {character.name}
            {character.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
