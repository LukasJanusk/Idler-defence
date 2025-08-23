import { useState } from 'react';
import type { AnyCharacter, PartyPositionName } from './types';
import Container from './Container';

type CharacterSelectProps = {
  availableCharacters: Set<AnyCharacter>;
  position: PartyPositionName;
};

export default function CharacterSelect({
  availableCharacters,
}: CharacterSelectProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null,
  );

  const handleSelectCharacter = (charId: string) => {
    setSelectedCharacter(charId);
  };
  const isSelected = (id: string) => id === selectedCharacter;
  return (
    <Container size="md">
      <div className="flex flex-row items-center justify-between px-2 text-2xl font-bold text-medieval-silver">
        Select Character
      </div>
      <ul className="flex flex-grow flex-col gap-1 overflow-auto px-2">
        {/* Header row */}
        <li className="flex flex-row justify-between border-b-2 border-medieval-parchment text-lg font-bold text-medieval-silver">
          <div className="">Class</div>
          <div className="">Name</div>
          <div className="">Price</div>
        </li>
        {Array.from(availableCharacters).map((char) => (
          <li key={char.id}>
            <button
              onClick={() => handleSelectCharacter(char.id)}
              className={`flex w-full flex-row items-center justify-between gap-2 border-2 border-medieval-parchment text-medieval-silver transition-all duration-200 hover:scale-105 active:scale-95 ${
                isSelected(char.id)
                  ? 'bg-medieval-stoneCrimson'
                  : 'bg-medieval-wood hover:bg-medieval-green-800'
              }`}
            >
              <span className="pl-2">{char.icon}</span>
              <span className="font-semibold">{char.name}</span>
              <span className="pr-2 font-bold text-medieval-gold">
                {'200'}
                {` 🪙`}
              </span>
            </button>
          </li>
        ))}{' '}
      </ul>
      <div className="flex flex-row justify-self-end border-t-2 border-medieval-parchment text-lg font-bold text-medieval-silver"></div>
    </Container>
  );
}
