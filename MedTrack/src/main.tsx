import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Screen from './Screen'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Screen />
  </StrictMode>,
)
