import type { Meta, StoryObj } from '@storybook/react-vite';
import fireball from '@/assets/fireball_icon.svg';
import fireMageIdle from '@/assets/fire_wizard_idle_icon.svg';
import fireMageStab from '@/assets/fire_wizard_stab_icon.svg';
import flamejet from '@/assets/flamejet_icon.svg';
import { fn } from 'storybook/test';
import SkillContainer from '@/SkillContainer';

const fireMageSkills = [
  {
    id: '1',
    name: 'Regenerate',
    description:
      'The fire mage stands ready, channeling inner flames and regenerates Mana.',
    url: fireMageIdle,
    onSelect: fn(),
    damage: 0,
    duration: 0.4,
    speed: 1,
  },
  {
    id: '2',
    name: 'Fire ball',
    description: 'A fiery projectile that deals damage to a single target.',
    url: fireball,
    onSelect: fn(),
    damage: 60,
    duration: 0.7,
    speed: 1,
  },
  {
    id: '3',
    name: 'Flame Jet',
    description:
      'A continuous stream of fire that damages all enemies in its path.',
    url: flamejet,
    onSelect: fn(),
    damage: 30,
    duration: 1,
    speed: 0.8,
  },
  {
    id: '4',
    name: 'Quick Stab',
    description:
      'A quick melee attack that deals moderate damage to a single target.',
    url: fireMageStab,
    onSelect: fn(),
    damage: 40,
    duration: 0.4,
    speed: 1.2,
  },
];
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'SkillContainer',
  component: SkillContainer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    skills: fireMageSkills,
  },
} satisfies Meta<typeof SkillContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const FireMage: Story = {
  args: {
    skills: fireMageSkills,
  },
};
