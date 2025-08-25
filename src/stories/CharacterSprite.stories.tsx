import type { Meta, StoryObj } from '@storybook/react-vite';
import CharacterSprite from '@/components/CharacterSprite/CharacterSprite';

import { createAvailableCharacters } from '@/defaults';

const character = createAvailableCharacters().values().next().value;

const meta = {
  title: 'Character Sprite',
  component: CharacterSprite,

  parameters: {
    layout: 'centered',
  },
  args: {
    position: 'pos1',
    character: character,
  },
} satisfies Meta<typeof CharacterSprite>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { position: 'pos1', character: character },
};
