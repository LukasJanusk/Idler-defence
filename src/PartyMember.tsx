import { useState } from 'react';
import ActionButton from './ActionButton';
import Sprite from './components/reusable/Sprite';
import type { PartyPositionName } from './types';
import { PlusCircle, ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import CharacterSelectModal from './CharacterSelectModal';
import { useGameStore } from './store';

type PartyMemberProps = {
  position: PartyPositionName;
};

export default function PartyMember({ position }: PartyMemberProps) {
  const [characterSelectMolaleOpen, setCharacterSelectModalOpen] =
    useState(false);
  const moveCharacter = useGameStore((store) => store.moveCharacter);
  const character = useGameStore((store) => store.party[position]);
  const updateCharacterState = useGameStore(
    (store) => store.updateCharacterState,
  );

  return (
    <div className="relative bottom-96 flex flex-col items-center justify-center border-2 border-green-500">
      <h1 className="rounded bg-black/80 px-2 text-xl font-bold text-white">
        {character?.name}
      </h1>
      {characterSelectMolaleOpen && (
        <div className="absolute bottom-0">
          <CharacterSelectModal
            position={position}
            onClick={() => setCharacterSelectModalOpen(false)}
          />
        </div>
      )}
      {character ? (
        <>
          <div className="absolute bottom-80 left-0 border-2 border-transparent hover:border-gray-500">
            <Sprite
              animation={
                character.animations[
                  character.state as keyof typeof character.animations
                ]
              }
              entity="character"
            />
          </div>
          <div className="flex flex-row items-center">
            <button
              className="mr-2 rounded-lg border-2 border-black bg-gray-500 text-black transition-all duration-200 hover:scale-105 hover:border-blue-600 hover:bg-gray-400 hover:text-blue-600"
              onClick={() =>
                moveCharacter(
                  position,
                  position === 'pos4'
                    ? 'pos1'
                    : (`pos${Number(position.slice(-1)) + 1}` as PartyPositionName),
                )
              }
            >
              <ArrowBigLeft />
            </button>
            <button
              className="bg-medie mr-2 rounded-lg border-2 border-black bg-gray-500 text-black transition-all duration-200 hover:scale-105 hover:border-blue-600 hover:bg-gray-400 hover:text-blue-600"
              onClick={() =>
                moveCharacter(
                  position,
                  position === 'pos1'
                    ? 'pos4'
                    : (`pos${Number(position.slice(-1)) - 1}` as PartyPositionName),
                )
              }
            >
              <ArrowBigRight />
            </button>
          </div>
          <div className="z-20 flex flex-col gap-1 overflow-auto">
            {character.actions.map((action) => (
              <ActionButton
                isActive={character.state === action}
                label={action}
                key={action}
                onClick={() =>
                  updateCharacterState(position, { state: action })
                }
              />
            ))}
          </div>
        </>
      ) : (
        <button className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none">
          <PlusCircle
            onClick={() => setCharacterSelectModalOpen((prev) => !prev)}
            className="h-12 w-12 rounded-full text-gray-700"
          />
        </button>
      )}
    </div>
  );
}
