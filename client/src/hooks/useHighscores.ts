import config from '@/config';
import { parseHighscores, type Highscores } from '@/modules/score/schema';
import { useEffect, useState } from 'react';
import z, { ZodError } from 'zod';

export default function useHighscores() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [highscores, setHighscores] = useState<Highscores | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/highscores`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`Error fetching highscores: ${response.statusText}`);
        }
        const data = await response.json();
        const parsed = parseHighscores(data);
        setHighscores(parsed);
      } catch (err) {
        if (err instanceof ZodError) {
          setError(z.prettifyError(err));
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred fetching highscores.');
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [error]);

  return { highscores, loading, error, setLoading, setError };
}
