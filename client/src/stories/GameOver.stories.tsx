import type { Meta, StoryObj } from '@storybook/react-vite';
import GameOver from '@/components/GameOver/GameOver';
import { useGameStore } from '@/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withGameStore = (Story: any, context: any) => {
  useGameStore.setState((prev) => ({
    ...prev,
    gameOver: true,
    score: 1000,
    handleGameOver: () => console.log('Game over handled'),
  }));

  return <Story {...context.args} />;
};

const meta: Meta<typeof GameOver> = {
  title: 'Game over',
  component: GameOver,
  decorators: [withGameStore],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
