import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GameClockProvider } from './GameClockProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameClockProvider>
      <App />
    </GameClockProvider>
  </StrictMode>
);
