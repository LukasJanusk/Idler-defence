import type { Meta, StoryObj } from '@storybook/react-vite';
import Bar from '@/components/reusable/Bar';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Bar',
  component: Bar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    value: 50,
    maxValue: 100,
    size: 'md',
    colorStyles: '',
    showValues: false,
  },
} satisfies Meta<typeof Bar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Half: Story = {
  args: {
    value: 50,
    maxValue: 100,
    showValues: true,
    size: 'sm',
  },
};
export const Empty: Story = {
  args: {
    value: 0,
    maxValue: 100,
    showValues: true,
    size: 'sm',
  },
};
export const Full: Story = {
  args: {
    value: 100,
    maxValue: 100,
    showValues: true,
    size: 'sm',
  },
};
export const Medium: Story = {
  args: {
    value: 50,
    maxValue: 100,
    showValues: true,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    value: 50,
    maxValue: 100,
    showValues: true,
    size: 'lg',
  },
};
export const Crimson: Story = {
  args: {
    value: 740,
    maxValue: 1000,
    colorStyles: 'bg-medieval-stoneCrimson',
  },
};
export const WithLabel: Story = {
  args: {
    value: 740,
    maxValue: 1000,
    colorStyles: 'bg-blue-500',
    size: 'lg',
    label: 'Magica',
  },
};
