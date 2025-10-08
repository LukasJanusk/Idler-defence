import { Route, Routes } from 'react-router';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
import { Navigation } from './components/Navigation/Navigation';

function App() {
  return (
    <div className="flex h-screen flex-col">
      <header className="fixed top-0 flex max-h-12 min-h-12 w-screen items-center bg-medieval-wood px-6 text-2xl font-bold text-medieval-parchment">
        <h1>Idler defence</h1>
        <Navigation />
      </header>
      <Routes>
        <Route element={<HomePage />} path={'/'} />{' '}
        <Route element={<GamePage />} path={'/game'} />
      </Routes>
      <footer className="h-8 bg-medieval-wood"></footer>
    </div>
  );
}

export default App;
