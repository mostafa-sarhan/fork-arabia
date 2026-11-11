import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './lib/i18n/LanguageProvider'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root was not found in the document.')
}

createRoot(rootElement).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
