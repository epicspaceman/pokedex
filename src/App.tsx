import { useEffect, useState } from 'react'
import './App.css'
import { Pokemon } from './lib/defintions';

const MAX_POKEMON_ID = 1000;
const MIN_POKEMON_ID = 1;

function App() {
  // set pokemon
  const [pokemon, setPokemon] = useState<Pokemon>(undefined)

  function fetchPokemon(identifier: number | string) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}/`, {method: 'GET'})
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setPokemon(json)
      })
  }

  // fetch random pokemon on load
  useEffect(() => {
    const randomId = Math.floor(Math.random() * (MAX_POKEMON_ID-MIN_POKEMON_ID) + MIN_POKEMON_ID)

    fetchPokemon(randomId)
  }, [])

  if (pokemon === undefined) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <div className='container'>
        <h1>Pokedex</h1>
        <p>Name: {pokemon.name}</p>
        <p>Height: {pokemon.height} hectograms</p>
        <p>Weight: {pokemon.weight} decimeters</p>
      </div>
    </>
  )
}

export default App
