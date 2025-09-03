import type { Meta, StoryObj } from '@storybook/react-vite';
import Toggle from '@/components/reusable/Toggle';

const meta = {
  title: 'Toggle',
  component: Toggle,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {},
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Deafault: Story = {};
export const Controlled: Story = {
  args: {
    on: true,
    defaultOn: true,
    onClick: (state: boolean) => {
      console.log(state);
    },
  },
};
