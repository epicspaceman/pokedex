import { useCallback, useState } from 'react'
import './App.css'
import PokemonInfoBox from './components/PokemonInfoBox/PokemonInfoBox';
import { useHandleQuery } from './core/queryutils';
import { fetchPokemon } from './core/PokeAPI';

function App() {
  const [pokemonId, setPokemonId] = useState<string>()

  const [isLoading, isError, error, pokemon] = useHandleQuery({
      queryFunction: useCallback(() => fetchPokemon(pokemonId), [pokemonId])
  })

  function searchPokemon(formData: FormData) {
    const query = formData.get('pokequery')?.toString() ?? ''

    console.log(query)

    setPokemonId(query)
  }

  if (isError && error!.message !== 'Not Found') {

    return (
      <div>An unexpected error occurred: {error?.message}</div>
    )
  }

  if (isLoading || pokemon === undefined) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <div className='container'>

        {error?.message === 'Not Found' ? <span>Could not find specified pokemon</span> : <PokemonInfoBox pokemon={pokemon} />}

        <form action={searchPokemon}>
          <h1>search</h1>
          <input type='text' name='pokequery' id='pokequery' placeholder='ex: Pikachu or 25' required/>
          <button type='submit'>search</button>
        </form>
      </div>
    </>
  )
}

export default App
