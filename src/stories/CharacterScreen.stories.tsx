import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import CharacterScreen from '@/components/CharacterScreen';
import { useGameStore } from '@/store';
import { createAvailableCharacters } from '@/defaults';
import { GameClock } from '@/model/gameClock';
import { Grid } from '@/model/grid';
import { FireMage } from '@/model/entities/character';
import { createFireMageAnimations } from '@/model/animations/fireWizardAnimations';

const withGameStore = (
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
    party: {
      pos1: null,
      pos2: null,
      pos3: null,
      pos4: new FireMage('test', 'Existing Mage', createFireMageAnimations()),
    },
    availableCharacters: createAvailableCharacters(),
    ...initialState,
  });

  return Story({}, context);
};

const meta = {
  title: 'Character Screen',
  component: CharacterScreen,
  decorators: [
    (Story, context) => withGameStore(Story, context.args as {}, context),
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
