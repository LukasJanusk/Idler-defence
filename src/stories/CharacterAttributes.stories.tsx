import type { Meta, StoryObj } from '@storybook/react-vite';
import CharacterAttributes from '@/components/CharacterScreen/CharacterAttributes/CharacterAttributes';
import { FireMage } from '@/model/entities/character';
import { createFireMageAnimations } from '@/model/animations/fireWizardAnimations';
import { v4 } from 'uuid';

const char1 = new FireMage(
  'FireMage-test' + v4(),
  'Vadim',
  createFireMageAnimations(),
);
char1.availableAttributes = 4;
char1.level = 4;
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
    hired: true,
    onHire: (id: string) => {
      console.log('onHire ran with ' + id);
    },
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
  },
};
export const HiredAvailablePoints: Story = {
  args: {
    character: char1,
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
    hired: false,
    onHire: (id) => {
      console.log(`Hire character with id: ${id}`);
    },
  },
};
