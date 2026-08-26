import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;

// scripts/prerender.mjs bakes static HTML into #root so that crawlers which
// never execute JavaScript still see the page's real content. Clear it before
// mounting: createRoot renders into an empty container, and leaving the static
// copy in place would briefly double the page.
if (container.dataset.prerendered) {
  container.innerHTML = '';
  delete container.dataset.prerendered;
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
