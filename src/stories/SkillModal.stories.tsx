import type { Meta, StoryObj } from '@storybook/react-vite';
import SkillModal from '@/SkillModal';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export

const meta = {
  title: 'Skill Modal',
  component: SkillModal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    title: 'Title',
    children: 'Hello this is my text',
    size: 'md',
  },
} satisfies Meta<typeof SkillModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const WithTitle: Story = {
  args: {
    title: 'Title',
    children: 'Hello this is my text',
    size: 'md',
  },
};
export const NoTitle: Story = {
  args: {
    children: 'Hello this is my text',
    size: 'md',
    title: undefined,
  },
};
export const Small: Story = {
  args: {
    title: 'Title',
    children: 'Hello this is my text',
    size: 'sm',
  },
};
export const Medium: Story = {
  args: {
    title: 'Titile',
    children: 'Hello this is my text',
    size: 'md',
  },
};
export const Large: Story = {
  args: {
    title: 'Title',
    children: 'Hello this is my text',
    size: 'lg',
  },
};
export const Overflow: Story = {
  args: {
    title: 'Title',
    children:
      'This big wall of text. This big wall of text. This big wall of text. This big wall of text. This big wall of text. This big wall of text. This big wall of text. This big wall of text. This big wall of text.This big wall of text. This big wall of text. This big wall of text.This big wall of text. This big wall of text. This big wall of text.This big wall of text. This big wall of text. This big wall of text.This big wall of text. This big wall of text. This big wall of text. This big wall of text. This big wall of text. This big wall of text.This big wall of text. This big wall of text. This big wall of text.This big wall of text. This big wall of text. This big wall of text.This big wall of text. This big wall of text. This big wall of text.This big wall of text. This big wall of text. This big wall of text.This big wall of text. This big wall of text. This big wall of text.This big wall of text. This big wall of text. This big wall of text.This big wall of text. This big wall of text. This big wall of text.This big wall of text. This big wall of text. This big wall of text.',
    size: 'lg',
  },
};
