import type { Meta, StoryObj } from '@storybook/react-vite';
import CharacterSprite from '@/components/CharacterScreen/CharacterSprite/CharacterSprite';
import { createAvailableCharacters } from '@/defaults';
import { Wizard } from '@/model/entities/character';
import { createWizardAnimations } from '@/model/animations/wizardAnimations';

const character = createAvailableCharacters().values().next().value;
const character2 = new Wizard('test-wiz', 'Loppe', createWizardAnimations());
character2.state = 'dead';
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
export const Dead: Story = {
  args: { position: 'pos2', character: character2 },
};
