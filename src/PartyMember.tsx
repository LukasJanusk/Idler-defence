import { useEffect, useState } from 'react';
import ActionButton from './ActionButton';
import Sprite from './Sprite';
import type { AnyCharacter, PartyPositionName } from './types';
import { useGameContext } from './context/useGameContext';
import { PlusCircle, ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import CharacterSelectModal from './CharacterSelectModal';
import type { AnyAction } from './character';

type PartyMemberProps = {
  character: AnyCharacter | null;
  position: PartyPositionName;
};

export default function PartyMember({ character, position }: PartyMemberProps) {
  const [characterSelectMolaleOpen, setCharacterSelectModalOpen] =
    useState(false);
  const { dispatch } = useGameContext();
  const onAnimationEnd = (state: AnyAction) => {
    if (state === 'death') {
      dispatch({
        type: 'SET_PARTY_MEMBER_STATE',
        payload: { position, newState: 'dead' },
      });
    }
    if (state === 'resurrect') {
      dispatch({
        type: 'SET_PARTY_MEMBER_STATE',
        payload: { position, newState: 'idle' },
      });
    }
  };
  useEffect(() => {
    if (!character) return;
    if (character.state === 'hit') {
      const timer = setTimeout(() => {
        dispatch({
          type: 'SET_PARTY_MEMBER_STATE',
          payload: {
            position: position,
            newState: 'idle',
          },
        });
      }, character.stunRecovery);
      return () => clearTimeout(timer);
    }
  }, [character, position, dispatch]);

  return (
    <div className="relative bottom-44 flex flex-col items-center justify-center">
      <h1 className="rounded bg-black/80 px-2 text-xl font-bold text-white">
        {character?.name}
      </h1>
      {characterSelectMolaleOpen && (
        <div className="absolute top-0">
          <CharacterSelectModal
            position={position}
            onClick={() => setCharacterSelectModalOpen(false)}
          />
        </div>
      )}
      {character ? (
        <>
          <div className="absolute bottom-0 left-0 border-2 border-transparent hover:border-gray-500">
            <Sprite
              animations={character.animations}
              state={character.state}
              scale={1}
              onAnimationEnd={onAnimationEnd}
            />
          </div>
          <div className="flex flex-row items-center">
            <button
              className="mr-2 rounded-lg border-2 border-black bg-gray-500 text-black transition-all duration-200 hover:scale-105 hover:border-blue-600 hover:bg-gray-400 hover:text-blue-600"
              onClick={() =>
                dispatch({
                  type: 'MOVE_PARTY_MEMBER',
                  payload: {
                    from: position,
                    to:
                      position === 'pos4'
                        ? 'pos1'
                        : (`pos${Number(position.slice(-1)) + 1}` as PartyPositionName),
                  },
                })
              }
            >
              <ArrowBigLeft />
            </button>
            <button
              className="mr-2 rounded-lg border-2 border-black bg-gray-500 text-black transition-all duration-200 hover:scale-105 hover:border-blue-600 hover:bg-gray-400 hover:text-blue-600"
              onClick={() =>
                dispatch({
                  type: 'MOVE_PARTY_MEMBER',
                  payload: {
                    from: position,
                    to:
                      position === 'pos1'
                        ? 'pos4'
                        : (`pos${Number(position.slice(-1)) - 1}` as PartyPositionName),
                  },
                })
              }
            >
              <ArrowBigRight />
            </button>
          </div>
          <div className="z-20 flex flex-col gap-1">
            {character.actions.map((action) => (
              <ActionButton
                isActive={character.state === action}
                label={action}
                key={action}
                onClick={() =>
                  dispatch({
                    type: 'SET_PARTY_MEMBER_STATE',
                    payload: { newState: action, position },
                  })
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
