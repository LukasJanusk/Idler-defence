import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import CharacterScreen from '@/components/CharacterScreen';
import { useGameStore } from '@/store';
import { createAvailableCharacters } from '@/defaults';
import { GameClock } from '@/model/gameClock';
import { Grid } from '@/model/grid';
import ParticleContextProvider from '@/context/ParticleContextProvider';

const withGameAndParticlesContext = (
  Story: StoryFn<typeof CharacterScreen>,
  props: {},
  context: Parameters<StoryFn<typeof CharacterScreen>>[1],
  initialState?: Partial<ReturnType<typeof useGameStore>>,
) => {
  const clock = new GameClock();
  clock.start();

  useGameStore.setState({
    gameClock: clock,
    grid: new Grid(9, 5, 128),
    selectedPosition: null,
    party: useGrid(),
    availableCharacters: createAvailableCharacters(),
    ...initialState,
  });

  return (
    <ParticleContextProvider>
      <Story {...props} {...context} />
    </ParticleContextProvider>
  );
};

const meta = {
  title: 'Character Screen',
  component: CharacterScreen,
  decorators: [
    (Story, context) => withGameAndParticlesContext(Story, { ...context }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {},
} satisfies Meta<typeof CharacterScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
function useGrid(): { party: any } {
  throw new Error('Function not implemented.');
}
