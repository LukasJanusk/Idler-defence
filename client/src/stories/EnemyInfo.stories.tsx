import type { Meta, StoryObj } from '@storybook/react-vite';
import EnemyInfo from '@/components/EnemyComponent/EnemyInfo';
import { createZombieOne } from '@/defaults';

const enemy = createZombieOne();
const meta = {
  title: 'Enemy Info',
  component: EnemyInfo,
  parameters: {
    layout: 'centered',
  },
  args: {
    enemy: enemy,
  },
} satisfies Meta<typeof EnemyInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    enemy: enemy,
  },
};
