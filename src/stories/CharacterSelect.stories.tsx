import type { Meta, StoryObj } from '@storybook/react-vite';
import CharacterSelect from '@/CharacterSelect';
import { createAvailableCharacters } from '@/defaults';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const createTwelveCharacters = () => {
  const set = createAvailableCharacters();
  const set2 = createAvailableCharacters();
  const set3 = createAvailableCharacters();
  const combined = new Set([...set, ...set2, ...set3]);
  return combined;
};

const meta = {
  title: 'CharacterSelect',
  component: CharacterSelect,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    availableCharacters: createAvailableCharacters(),
    position: 'pos1',
  },
} satisfies Meta<typeof CharacterSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const FourCharacters: Story = {
  args: {
    availableCharacters: createAvailableCharacters(),
  },
};
export const Empty: Story = {
  args: {
    availableCharacters: new Set(),
  },
};
export const TwelveCharacters: Story = {
  args: {
    availableCharacters: createTwelveCharacters(),
  },
};
