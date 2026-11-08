import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initSessionSync } from '@/store/sessionSync';
import App from './App.tsx';
import './index.css';

async function enableMocking() {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS === 'true') {
    const { worker } = await import('./mocks/browser');
    return worker.start();
  }
}

enableMocking().then(() => {
  initSessionSync();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
