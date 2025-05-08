import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import PokemonDisplay from './components/PokemonDisplay/PokemonDisplay.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path='/pokemon' >
          <Route path=':identifier' element={<PokemonDisplay />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
