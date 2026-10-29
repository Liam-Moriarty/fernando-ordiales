import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/instrument-sans';
import '@fontsource-variable/spline-sans-mono';
import { App } from './App';
import './style.css';

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
