import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { runDiagnostics } from './utils/diagnostics'

// Make diagnostics available globally
window.runDiagnostics = runDiagnostics

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
