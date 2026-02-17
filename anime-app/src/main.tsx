import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { WatchProvider } from './context/WatchContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <WatchProvider>
        <App />
      </WatchProvider>
    </BrowserRouter>
  </StrictMode>,
)
