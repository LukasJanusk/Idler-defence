import type { Meta, StoryObj } from '@storybook/react-vite';
import CharacterAttributes from '@/CharacterAttributes';
import type { Attributes } from '@/types';
import { FireMage } from '@/model/entities/character';
import { createFireMageAnimations } from '@/model/animations/fireWizardAnimations';
import { v4 } from 'uuid';
const attributes: Attributes = {
  strength: 10,
  dexterity: 15,
  intelligence: 20,
  vitality: 25,
};

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
    character: new FireMage(
      'FireMage-test' + v4(),
      'Vadim',
      createFireMageAnimations(),
    ),
    availableAttributes: 0,
    hired: true,
  },
} satisfies Meta<typeof CharacterAttributes>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Default: Story = {
  args: {
    character: new FireMage(
      'FireMage-test' + v4(),
      'Vadim',
      createFireMageAnimations(),
    ),
    availableAttributes: 0,
  },
};
export const HiredAvailablePoints: Story = {
  args: {
    character: new FireMage(
      'FireMage-test' + v4(),
      'Vadim',
      createFireMageAnimations(),
    ),
    availableAttributes: 10,
    hired: true,
  },
};
export const HiredNoAvailablePoints: Story = {
  args: {
    character: new FireMage(
      'FireMage-test' + v4(),
      'Vadim',
      createFireMageAnimations(),
    ),
    availableAttributes: 0,
    hired: true,
  },
};
export const ToHire: Story = {
  args: {
    character: new FireMage(
      'FireMage-test' + v4(),
      'Vadim',
      createFireMageAnimations(),
    ),
    availableAttributes: 0,
    hired: false,

    onHire: (id: string) => {
      console.log(`Hire character with id: ${id}`);
    },
  },
};
