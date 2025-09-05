import type { Highscores, Score } from '@/types';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { parseCreateScore, parseHighscores } from '../../schema/scoreSchema';
import ErrorComponent from '@/components/reusable/ErrorComponent';
import z, { ZodError } from 'zod';
import config from '@/config';
import CloseButton from '../reusable/CloseButton';

type GameOverFormProps = {
  score: number;
  onSubmit: (Highscores: Highscores, userScore: Score) => void;
  onClose: () => void;
};

export default function GameOverForm({
  onSubmit,
  onClose,
  score,
}: GameOverFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const timestamp = new Date().toISOString();
      const createScoreData = parseCreateScore({
        score,
        name,
        date: timestamp,
      });
      const response = await fetch(`${config.apiUrl}/highscores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createScoreData),
      });
      const data = await response.json();
      const parsed = parseHighscores(data);
      const userScore = parsed.find(
        (s) => s.date === timestamp && s.name === name && s.score === score,
      );
      if (!userScore) {
        throw new Error('Could not find userscore');
      }
      onSubmit(parsed, userScore);
    } catch (err) {
      if (err instanceof ZodError) {
        setError(z.prettifyError(err));
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to submit highscores');
      }
    } finally {
      setLoading(false);
    }
  };

  if (error)
    return (
      <ErrorComponent
        message={error}
        onClose={() => setError(null)}
        action={{ name: 'Return', handle: () => setError(null) }}
      />
    );
  if (loading)
    return (
      <LoaderCircle className="h-[100px] w-[100px] animate-spin text-medieval-parchment" />
    );
  return (
    <div className="relative max-h-[512px] w-[320px] border-4 border-medieval-silver bg-medieval-stone p-4 text-medieval-parchment shadow-xl">
      <h1 className="mb-2 text-center text-[40px] font-bold text-medieval-parchment">
        GAME OVER!
      </h1>
      <hr />
      <p className="my-4 text-lg text-medieval-parchment">
        Score:
        <span className="ml-2 text-[36px] font-bold text-medieval-green-500">
          {score}
        </span>
      </p>
      <form
        className="flex flex-col gap-2 text-medieval-parchment"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="name">Name:</label>
        <input
          className="bg-medieval-dark/10 px-3 py-2 text-medieval-parchment placeholder-white/50 outline-none ring-2 ring-medieval-silver/40 transition focus:bg-medieval-stone focus:ring-2 focus:ring-medieval-silver"
          name="name"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button
          className="mt-2 border-2 border-medieval-silver bg-emerald-700 p-4 text-xl font-bold transition-all duration-200 hover:scale-105 hover:bg-emerald-600 active:scale-95 active:bg-medieval-stoneCrimson"
          type="submit"
        >
          Submit
        </button>
      </form>
      <CloseButton onClose={() => onClose()} />
    </div>
  );
}
