import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import CharacterScreen from '@/components/CharacterScreen';
import { useGameStore } from '@/store';
import { createAvailableCharacters, defaultSettings } from '@/defaults';
import { GameClock } from '@/model/gameClock';
import { Grid } from '@/model/grid';
import ParticleContextProvider from '@/context/ParticleContextProvider';
import type { CharacterScreenProps } from '@/components/CharacterScreen';

const withGameAndParticlesContext = (
  Story: StoryFn<typeof CharacterScreen>,
  props: CharacterScreenProps,
  context: Parameters<StoryFn<typeof CharacterScreen>>[1],
  initialState?: Partial<ReturnType<typeof useGameStore>>,
) => {
  const clock = new GameClock();
  clock.start();
  const grid = new Grid(9, 5, 128);

  useGameStore.setState((prev) => ({
    ...prev,
    gameClock: clock,
    gold: 1000,
    grid: grid,
    selectedPosition: null,
    settings: defaultSettings,
    availableCharacters: createAvailableCharacters(),
    ...initialState,
  }));

  return (
    <ParticleContextProvider>
      <Story {...props} {...context} />
    </ParticleContextProvider>
  );
};

const meta: Meta<typeof CharacterScreen> = {
  title: 'Character Screen',
  component: CharacterScreen,
  decorators: [
    (Story, context) =>
      withGameAndParticlesContext(Story, context.args, context),
  ],
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
