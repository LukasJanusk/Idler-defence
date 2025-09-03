import type { Meta, StoryObj } from '@storybook/react-vite';
import Indicator from '../components/reusable/Indicator';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export

const meta = {
  title: 'Indicator',
  component: Indicator,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    info: 'DMG',
    icon: '⚔️',
    value: 100,
  },
} satisfies Meta<typeof Indicator>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Damage: Story = {
  args: {
    info: 'This indicator shows the damage dealt by the skill.',
    icon: '⚔️',
    value: 100,
  },
};
export const Duration: Story = {
  args: {
    info: 'This Indicator shows the duration of the skill in seconds.',
    icon: '⏳',
    value: 0.4,
  },
};
export const Speed: Story = {
  args: {
    info: 'Shows the speed of the skill as a percentage of the base speed.',
    icon: '💨',
    value: 0.9,
  },
};
export const Info: Story = {
  args: {
    info: 'This is an default indicator for generic info.',
    icon: '❔',
    value: 0,
  },
};
