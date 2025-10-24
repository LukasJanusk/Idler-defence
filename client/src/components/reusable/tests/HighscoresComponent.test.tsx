import Highscores from '@/components/reusable/HighscoresComponent';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
const mockScore = {
  id: '1',
  rank: 1,
  name: 'Alice',
  score: 1000,
  date: new Date().toISOString(),
};
const mockHighscores = [
  mockScore,
  { id: '2', rank: 2, name: 'Bob', score: 200, date: new Date().toISOString() },
  {
    id: '3',
    rank: 3,
    name: 'Janice',
    score: 100,
    date: new Date().toISOString(),
  },
];

describe('<HighscoresComponent />', () => {
  it('renders HighscoresComponent with scores sorted', async () => {
    render(
      <Highscores
        onClose={() => {}}
        score={mockScore}
        highscores={mockHighscores}
      />,
    );

    const rows = screen.getAllByRole('listitem');

    expect(rows[0]).toHaveTextContent('RankNameScoreDate');
    expect(rows[1]).toHaveTextContent('1.Alice1000');
    expect(rows[2]).toHaveTextContent('2.Bob200');
    expect(rows[3]).toHaveTextContent('3.Janice100');
  });

  it('runs onClose callback', async () => {
    const onClose = vi.fn();
    render(
      <Highscores
        onClose={onClose}
        score={mockScore}
        highscores={mockHighscores}
      />,
    );
    await userEvent.click(screen.getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalled();
  });
  it('hightlights current user scores', async () => {
    render(
      <Highscores
        onClose={() => {}}
        score={mockScore}
        highscores={mockHighscores}
      />,
    );

    const rows = screen.getAllByRole('listitem');

    expect(rows[1]).toHaveClass('bg-medieval-silver/30');
    expect(rows[3]).toHaveClass('bg-medieval-stone');
  });
});
