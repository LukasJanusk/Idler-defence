import { Route, Routes } from 'react-router';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
import { Navigation } from './components/Navigation/Navigation';
import Avatar from './components/reusable/Avatar';

function App() {
  return (
    <div className="flex h-screen flex-col">
      <header className="top-0 flex max-h-14 min-h-14 w-screen items-center gap-2 bg-medieval-wood bg-gradient-to-t from-medieval-arcane via-medieval-stone to-medieval-dark px-6 text-2xl font-bold text-medieval-parchment">
        <h1>Idler defence</h1>
        <Navigation />
        <Avatar className={`ml-auto justify-self-end`} />
      </header>
      <Routes>
        <Route element={<HomePage />} path={'/'} />
        <Route element={<GamePage />} path={'/game'} />
      </Routes>
      <footer className="bottom-0 h-8 bg-gradient-to-b from-medieval-arcane via-medieval-stone to-medieval-dark"></footer>
    </div>
  );
}

export default App;
