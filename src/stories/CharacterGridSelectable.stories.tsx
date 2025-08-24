import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import CharacterGridSelectable, {
  type CharacterGridSelectableProps,
} from '@/CharacterGridSelectable';
import { useGameStore } from '@/store';
import { createAvailableCharacters } from '@/defaults';
import { GameClock } from '@/model/gameClock';
import { Grid } from '@/model/grid';

const withGameStore = (
  Story: StoryFn<typeof CharacterGridSelectable>,
  props: CharacterGridSelectableProps,
  context: Parameters<StoryFn<typeof CharacterGridSelectable>>[1],
  initialState?: Partial<ReturnType<typeof useGameStore>>,
) => {
  const clock = new GameClock();
  clock.start();
  useGameStore.setState({
    gameClock: clock,
    grid: new Grid(9, 5, 128),
    selectedPosition: 'pos3',
    party: {
      pos1: createAvailableCharacters().values().next().value || null,
      pos2: null,
      pos3: createAvailableCharacters().values().next().value || null,
      pos4: null,
    },
    availableCharacters: createAvailableCharacters(),
    ...initialState,
  });

  return Story(props, context);
};

const meta = {
  title: 'Character Grid Selectable',
  component: CharacterGridSelectable,
  decorators: [
    (Story, context) =>
      withGameStore(
        Story,
        context.args as CharacterGridSelectableProps,
        context,
      ),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    position: 'pos1',
  },
} satisfies Meta<typeof CharacterGridSelectable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: 'pos1',
  },
};
export const Selected: Story = {
  args: {
    position: 'pos3',
  },
};
export const NoCharacter: Story = {
  args: {
    position: 'pos2',
  },
};
