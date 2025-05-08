import { useCallback, useState } from 'react'
import './App.css'
import PokemonInfoBox from './components/PokemonInfoBox/PokemonInfoBox';
import { useHandleQuery } from './core/queryutils';
import { fetchPokemon } from './core/PokeAPI';
import search from './assets/search.svg'

function App() {
  const [pokemonId, setPokemonId] = useState<string>()

  const {isLoading, isError, error, data} = useHandleQuery({
      queryFunction: useCallback(() => fetchPokemon(pokemonId), [pokemonId])
  })

  function searchPokemon(formData: FormData) {
    const query = formData.get('pokequery')?.toString() ?? ''

    console.log(query)

    setPokemonId(query)
  }

  if (isError) {

    return (
      <div>An unexpected error occurred: {error.message}</div>
    )
  }

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <div className='container'>
        <form action={searchPokemon}>
          <input type='text' name='pokequery' id='pokequery' placeholder='ex: Pikachu or 25' required/>
          <button type='submit'><img src={search} /></button>
        </form>

        <PokemonInfoBox pokemon={data} />
      </div>
    </>
  )
}

export default App
