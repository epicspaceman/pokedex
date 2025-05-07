import { useCallback, useState } from 'react'
import './App.css'
import PokemonInfoBox from './components/PokemonInfoBox/PokemonInfoBox';
import { useHandleQuery } from './core/queryutils';
import { fetchPokemon } from './core/PokeAPI';
import search from './assets/search.svg'

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
        <form action={searchPokemon}>
          <input type='text' name='pokequery' id='pokequery' placeholder='ex: Pikachu or 25' required/>
          <button type='submit'><img src={search} /></button>
        </form>

        {error?.message === 'Not Found' ? <span>Could not find specified pokemon</span> : <PokemonInfoBox pokemon={pokemon} setPokemonId={setPokemonId}/>}
      </div>
    </>
  )
}

export default App
