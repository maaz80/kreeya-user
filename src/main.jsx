import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { DataProvider } from './context/DataContext.jsx'

// Gracefully handle Vite chunk loading or MIME type mismatch errors by forcing a full reload to fetch fresh assets
window.addEventListener('vite:preloadError', (event) => {
  console.warn('Vite preload error caught. Reloading page...', event);
  window.location.reload(true);
});

window.addEventListener('error', (event) => {
  const msg = event.message || '';
  if (msg.includes('Failed to fetch dynamically imported module') || msg.includes('Expected a JavaScript-or-Wasm module script')) {
    console.warn('Global module load error caught. Reloading page...', event);
    window.location.reload(true);
  }
}, true);


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <HelmetProvider>
      <DataProvider>
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <App />
        </Suspense>
      </DataProvider>
    </HelmetProvider>
  </BrowserRouter>
)
