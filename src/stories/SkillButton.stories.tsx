import type { Meta, StoryObj } from '@storybook/react-vite';
import fireball from '@/assets/fireball_icon.svg';
import fireMageIdle from '@/assets/fire_wizard_idle_icon.svg';
import fireMageStab from '@/assets/fire_wizard_stab_icon.svg';
import flamejet from '@/assets/flamejet_icon.svg';
import { fn } from 'storybook/test';
import SkillButton from '@/components/reusable/SkillButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'SkillButton',
  component: SkillButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    onClick: fn(),
    url: fireball,
    skillName: 'Fireball',
    size: 'md',
    disabled: false,
    selected: false,
  },
} satisfies Meta<typeof SkillButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Xs: Story = {
  args: {
    onClick: fn(),
    url: fireball,
    skillName: 'Fireball',
    size: 'xs',
  },
};
export const Small: Story = {
  args: {
    onClick: fn(),
    url: fireball,
    skillName: 'Fireball',
    size: 'sm',
  },
};
export const Medium: Story = {
  args: {
    onClick: fn(),
    url: fireball,
    skillName: 'Fireball',
  },
};
export const Large: Story = {
  args: {
    onClick: fn(),
    url: fireball,
    skillName: 'Fireball',
    size: 'lg',
  },
};

export const Selected: Story = {
  args: {
    onClick: fn(),
    url: fireball,
    skillName: 'Fireball',
    size: 'lg',
    selected: true,
  },
};
export const Flamejet: Story = {
  args: {
    onClick: fn(),
    url: flamejet,
    skillName: 'Flamejet',
    size: 'lg',
    selected: false,
  },
};
export const Stab: Story = {
  args: {
    onClick: fn(),
    url: fireMageStab,
    skillName: 'Stab',
    size: 'lg',
    selected: false,
  },
};
export const Idle: Story = {
  args: {
    onClick: fn(),
    url: fireMageIdle,
    skillName: 'Idle',
    size: 'lg',
    selected: false,
  },
};
export const Disabled: Story = {
  args: {
    onClick: fn(),
    url: fireMageIdle,
    skillName: 'Idle',
    size: 'lg',
    selected: false,
    disabled: true,
  },
};
