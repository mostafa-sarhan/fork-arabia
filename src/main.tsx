import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './styles/index.css'
import App from './App.tsx'
import { LanguageProvider } from './lib/i18n/LanguageProvider'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root was not found in the document.')
}

const app = (
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
)

/*
 * Every page is prerendered (scripts/prerender.mjs), and the root says for
 * which URL. When that is this URL, React adopts the HTML already on screen
 * (hydrates). Otherwise it draws the page itself: in development, on the
 * 404 file served for an unknown URL, and with a query (?service=…), which
 * fills the forms in differently from the prerender.
 */
const prerenderedFor = rootElement.dataset.prerendered
const isSamePage = prerenderedFor === window.location.pathname && !window.location.search

if (isSamePage) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
