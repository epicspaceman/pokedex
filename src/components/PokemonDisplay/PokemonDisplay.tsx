import { useCallback } from "react"
import PokemonInfoBox from "../PokemonInfoBox/PokemonInfoBox"
import { useHandleQuery } from "../../core/queryutils"
import { fetchPokemon } from "../../core/PokeAPI"
import searchIcon from '../../assets/search.svg'
import { useNavigate, useParams } from "react-router"

function PokemonDisplay() {
    const { identifier } = useParams()
    const navigate = useNavigate()
    
    const {isLoading, isError, error, data} = useHandleQuery({
        queryFunction: useCallback(() => fetchPokemon(identifier), [identifier])
    })

    function searchPokemon(formData: FormData) {
        const query = formData.get('pokequery')?.toString() ?? ''

        console.log(query)

        navigate(`/pokemon/${query}`)
    }

    if (isError) {
        if (error.message === 'Not Found') {
            return (
                <div className="container">
                    <form action={searchPokemon}>
                        <input type='text' name='pokequery' id='pokequery' placeholder='ex: Pikachu or 25' required/>
                        <button type='submit'><img src={searchIcon} /></button>
                    </form>

                    <p>Could not find '{identifier}'</p>
                </div>
            )
        }

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
            <button type='submit'><img src={searchIcon} /></button>
            </form>

            <PokemonInfoBox pokemon={data} />
        </div>
        </>
    )
}

export default PokemonDisplay