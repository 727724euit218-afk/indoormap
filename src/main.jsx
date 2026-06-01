import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import { MapProvider } from './context/MapContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <MapProvider>
        <App />
      </MapProvider>
    </ErrorBoundary>
  </StrictMode>,
)
