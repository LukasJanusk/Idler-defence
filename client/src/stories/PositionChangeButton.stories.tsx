import type { Meta, StoryObj } from '@storybook/react-vite';
import PositionChangeButton from '@/components/CharacterScreen/CharacterSprite/PositionChangeButton';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export

const meta = {
  title: 'Position Change Button',
  component: PositionChangeButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    direction: 'right',
    position: 'pos1',
    size: 'md',
  },
} satisfies Meta<typeof PositionChangeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Left: Story = {
  args: {
    direction: 'left',
    position: 'pos1',
    size: 'md',
  },
};
export const Right: Story = {
  args: {
    direction: 'right',
    position: 'pos1',
    size: 'md',
  },
};
export const Small: Story = {
  args: {
    direction: 'right',
    position: 'pos1',
    size: 'sm',
  },
};
export const Medium: Story = {
  args: {
    direction: 'right',
    position: 'pos1',
    size: 'md',
  },
};
export const Large: Story = {
  args: {
    direction: 'right',
    position: 'pos1',
    size: 'lg',
  },
};
