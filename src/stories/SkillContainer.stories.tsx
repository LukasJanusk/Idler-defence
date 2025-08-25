import type { Meta, StoryObj } from '@storybook/react-vite';

import SkillContainer from '@/components/CharacterSkills/SkillContainer';
import { FireMageSkills } from '@/model/entities/skills/fireMageSkills';

const meta = {
  title: 'SkillContainer',
  component: SkillContainer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    skills: FireMageSkills,
    position: 'pos1',
  },
} satisfies Meta<typeof SkillContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const FireMage: Story = {
  args: {
    skills: FireMageSkills,
    state: 'idle',
    position: 'pos1',
  },
};
