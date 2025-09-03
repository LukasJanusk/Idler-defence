import type { Meta, StoryObj } from '@storybook/react-vite';
import HighscoresComponent from '@/components/reusable/HighscoresComponent';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export

const meta = {
  title: 'Highscores',
  component: HighscoresComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    onClose: () => {},
    highscores: [
      {
        id: '1',
        name: 'Mark',
        score: 10000,
        date: new Date().toISOString(),
        rank: 1,
      },
    ],
    score: {
      id: '1',
      name: 'Mark',
      score: 10000,
      date: new Date().toISOString(),
      rank: 1,
    },
  },
} satisfies Meta<typeof HighscoresComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Default: Story = {
  args: {
    onClose: () => {},
    highscores: [
      {
        id: '1',
        name: 'Mark',
        score: 100033,
        date: new Date().toISOString(),
        rank: 1,
      },
      {
        id: '2',
        name: 'Jack',
        score: 10000,
        date: new Date().toISOString(),
        rank: 2,
      },
      {
        id: '3',
        name: 'Mark',
        score: 5000,
        date: new Date().toISOString(),
        rank: 3,
      },
      {
        id: '4',
        name: 'Jarome',
        score: 3400,
        date: new Date().toISOString(),
        rank: 4,
      },
      {
        id: '5',
        name: 'Tyrone',
        score: 100,
        date: new Date().toISOString(),
        rank: 5,
      },
      {
        id: '6',
        name: 'T',
        score: 90,
        date: new Date().toISOString(),
        rank: 6,
      },
      {
        id: '7',
        name: 'Julius',
        score: 20,
        date: new Date().toISOString(),
        rank: 7,
      },
      {
        id: '9921',
        name: 'Tyrone',
        score: 29,
        date: new Date().toISOString(),
        rank: 8,
      },
      {
        id: '5123',
        name: 'Nd-100%%',
        score: 18,
        date: new Date().toISOString(),
        rank: 9,
      },
      {
        id: '512313',
        name: 'N1C00le',
        score: 8,
        date: new Date().toISOString(),
        rank: 10,
      },
      {
        id: '51231323',
        name: 'N!ce',
        score: 1,
        date: new Date().toISOString(),
        rank: 11,
      },
      {
        id: '5133',
        name: 'N1C00le',
        score: 7,
        date: new Date().toISOString(),
        rank: 12,
      },
      {
        id: '5133s3',
        name: 'N1C00le',
        score: 1,
        date: new Date().toISOString(),
        rank: 13,
      },
    ],
  },
};
