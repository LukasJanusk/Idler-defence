import LevelSelectCard from '@/components/LevelSelect/LevelSelectCard';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Level Select Card',
  component: LevelSelectCard,

  parameters: {
    layout: 'centered',
  },
  args: {
    level: 1,
    selected: 1,
    setSelected: () => {
      console.log(`Level selected`);
    },
  },
} satisfies Meta<typeof LevelSelectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: 1,
    selected: 1,
    locked: false,
  },
};
export const NotSelected: Story = {
  args: {
    level: 1,
    selected: 2,
    locked: false,
  },
};
export const Locked: Story = {
  args: {
    level: 1,
    selected: 2,
    locked: true,
  },
};
