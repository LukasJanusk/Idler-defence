import type { Meta, StoryObj } from '@storybook/react-vite';
import Instructions from '@/components/Instructions';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export

const meta = {
  title: 'Instructions',
  component: Instructions,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    onClose: () => {},
  },
} satisfies Meta<typeof Instructions>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Default: Story = {
  args: {},
};
