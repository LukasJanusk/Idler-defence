import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GameClockProvider } from './context/GameClockProvider.tsx';
import { GameContextProvider } from './context/GameContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameClockProvider>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </GameClockProvider>
  </StrictMode>,
);
