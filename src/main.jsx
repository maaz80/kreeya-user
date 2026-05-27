import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <HelmetProvider>
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <App />
      </Suspense>
    </HelmetProvider>
  </BrowserRouter>
)
