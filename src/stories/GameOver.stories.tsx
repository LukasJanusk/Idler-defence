import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import GameOver from '@/components/GameOver/GameOver';
import { useGameStore } from '@/store';

const withGameStore = (
  Story: StoryFn<typeof GameOver>,
  initialState?: Partial<ReturnType<typeof useGameStore>>,
) => {
  useGameStore.setState((prev) => ({
    ...prev,
    gameOver: true,
    score: 1000,
    handleGameOver: () => {
      console.log('Game over handled');
    },
    ...initialState,
  }));

  return <Story />;
};

const meta: Meta<typeof GameOver> = {
  title: 'Game over',

  component: GameOver,
  decorators: [(Story) => withGameStore(Story)],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
