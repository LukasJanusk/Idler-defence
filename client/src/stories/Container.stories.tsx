import type { Meta, StoryObj } from '@storybook/react-vite';
import Container from '@/components/reusable/Container';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export

const meta = {
  title: 'Container',
  component: Container,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    children: '',
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Small: Story = {
  args: {
    children: '',
    size: 'sm',
  },
};
export const Medium: Story = {
  args: {
    children: '',
    size: 'md',
  },
};
export const Large: Story = {
  args: {
    children: '',
    size: 'lg',
  },
};
