import { useNavigate } from 'react-router';
import './App.css'
import { useEffect } from 'react';
import generateRandomPokemonId from './core/RandomPokemonId';

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/pokemon/${generateRandomPokemonId()}`)
  }, [])

  return (
    <>
      An Unexpected Error Occurred. Try reloading the page.
    </>
  )
}

export default App
