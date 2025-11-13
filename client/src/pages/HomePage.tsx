import PageBackdrop from '@/components/reusable/PageBackdrop';
import StartGameButton from '@/components/reusable/StarGameButton';
import Highscores from '@/components/Highscores';

function HomePage() {
  return (
    <PageBackdrop>
      <div className="z-10 flex h-full w-full flex-col items-center justify-center gap-2 p-4">
        <Highscores />
        <StartGameButton text={'Start Game'} />
      </div>
    </PageBackdrop>
  );
}

export default HomePage;
