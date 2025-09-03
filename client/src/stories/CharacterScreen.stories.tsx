import type { Meta, StoryObj } from '@storybook/react-vite';
import CharacterScreen from '@/components/CharacterScreen/CharacterScreen';
import { useGameStore } from '@/store';
import { createAvailableCharacters, defaultSettings } from '@/defaults';
import { GameClock } from '@/model/gameClock';
import { Grid } from '@/model/grid';
import ParticleContextProvider from '@/context/ParticleContextProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withGameAndParticlesContext = (Story: any, context: any) => {
  const clock = new GameClock();
  clock.start();
  const grid = new Grid(9, 5, 128);
  const availableCharacters = createAvailableCharacters();
  useGameStore.setState((prev) => ({
    ...prev,
    gameClock: clock,
    gold: 1000,
    grid: grid,
    selectedPosition: null,
    settings: defaultSettings,
    availableCharacters: availableCharacters,
    addCharacterToParty: (pos, id) => {
      const char = Array.from(availableCharacters).find((c) => c.id === id);
      if (!char) return;
      char.pos = pos;
      grid.setCharacterToPosition(pos, char);
      availableCharacters.delete(char);
    },
  }));

  return (
    <ParticleContextProvider>
      <Story {...context.args} />;
    </ParticleContextProvider>
  );
};

const meta: Meta<typeof CharacterScreen> = {
  title: 'Character Screen',
  component: CharacterScreen,
  decorators: [(Story, context) => withGameAndParticlesContext(Story, context)],
  parameters: { layout: 'centered' },
  args: {
    party: { pos1: null, pos2: null, pos3: null, pos4: null },
    onAlert: (message: string | null) => console.log(message),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    party: { pos1: null, pos2: null, pos3: null, pos4: null },
    onAlert: (message: string | null) => console.log(message),
  },
};
