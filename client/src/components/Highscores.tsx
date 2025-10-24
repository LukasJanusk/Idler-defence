import ErrorComponent from '@/components/reusable/ErrorComponent';
import HighscoresComponent from '@/components/reusable/HighscoresComponent';
import HighscoresContainer from '@/components/reusable/HighscoresContainer';
import LoadingCircle from '@/components/reusable/LoadingCircle';
import useHighscores from '@/hooks/useHighscores';

export default function Highscores() {
  const { highscores, loading, error, setLoading, setError } = useHighscores();
  if (error)
    return (
      <HighscoresContainer>
        <ErrorComponent
          message={error}
          onClose={() => {
            setError(null);
            setLoading(true);
          }}
          action={{
            name: 'Try Again',
            handle: () => {
              setError(null);
              setLoading(true);
            },
          }}
        />
      </HighscoresContainer>
    );

  return loading || !highscores ? (
    <HighscoresContainer>
      <LoadingCircle />
    </HighscoresContainer>
  ) : (
    <HighscoresComponent highscores={highscores} />
  );
}
