import LevelSelectScreen from '@/components/LevelSelect/LevelSelectScreen';
import type { LevelSelectable } from '@/types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const levels: LevelSelectable[] = [
  {
    id: 1,
    name: 'Level 1',
    image: undefined,
    locked: false,
  },
  {
    id: 2,
    name: 'Level 2',
    image: undefined,
    locked: false,
  },
  {
    id: 3,
    name: 'Level 3',
    image: undefined,
    locked: true,
  },
];
const meta = {
  title: 'Level Select Screen',
  component: LevelSelectScreen,

  parameters: {
    layout: 'centered',
  },
  args: {
    levels: levels,
    returnToMenu: () => {
      console.log('Return to Menu');
    },
    startGame: () => {
      console.log('Game Started');
    },
  },
  render: (args) => (
    <div className="mx-auto h-[640px] w-[1152px] overflow-x-auto bg-gray-900">
      <LevelSelectScreen {...args} />
    </div>
  ),
} satisfies Meta<typeof LevelSelectScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    levels: levels,
  },
};
