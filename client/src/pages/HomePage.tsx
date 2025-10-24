import PageBackdrop from '@/components/reusable/PageBackdrop';
import StartGameButton from '@/components/reusable/StarGameButton';
import Highscores from '@/components/Highscores';

function HomePage() {
  return (
    <PageBackdrop>
      <Highscores />
      <StartGameButton>Start Game</StartGameButton>
    </PageBackdrop>
  );
}

export default HomePage;
