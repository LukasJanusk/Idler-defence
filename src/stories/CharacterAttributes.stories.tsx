import type { Meta, StoryObj } from '@storybook/react-vite';
import CharacterAttributes, { type Attributes } from '@/CharacterAttributes';
import { FireMageSkills } from './SkillContainer.stories';
const attributes: Attributes = {
  strength: 10,
  dexterity: 15,
  intelligence: 20,
  vitality: 25,
};
const character = { id: '1', name: 'Hero' };
const setAttributes = (name: keyof Attributes) => {
  attributes[name] += 1;
};

const meta = {
  title: 'CharacterAttributes',
  component: CharacterAttributes,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    character: character,
    attributes: attributes,
    availableAttributes: 0,
    skills: FireMageSkills,
  },
} satisfies Meta<typeof CharacterAttributes>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Default: Story = {
  args: {
    character: character,
    availableAttributes: 0,
    attributes: attributes,
    skills: FireMageSkills,
    pos: 'pos4',
  },
};
export const HiredAvailablePoints: Story = {
  args: {
    character: character,
    availableAttributes: 10,
    attributes: attributes,
    skills: FireMageSkills,
    pos: 'pos1',
    setAttributes: setAttributes,
  },
};
export const HiredNoAvailablePoints: Story = {
  args: {
    character: character,
    availableAttributes: 0,
    attributes: attributes,
    skills: FireMageSkills,
    pos: 'pos1',
    setAttributes: setAttributes,
  },
};
export const ToHire: Story = {
  args: {
    character: character,
    availableAttributes: 0,
    attributes: attributes,
    skills: FireMageSkills,
    pos: undefined,
    setAttributes: setAttributes,
    onHire: (id: string) => {
      console.log(`Hire character with id: ${id}`);
    },
  },
};
