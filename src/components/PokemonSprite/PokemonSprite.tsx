import { useCallback } from "react"
import { fetchPokemon } from "../../core/PokeAPI"
import { useHandleQuery } from "../../core/queryutils"
import './PokemonSprite.css'

function PokemonSprite({ identifier, height, width }: { identifier: string, height?: string, width?: string }) {
    const {isLoading, isError, error, data} = useHandleQuery({
        queryFunction: useCallback(() => fetchPokemon(identifier), [identifier]),
        queryKeys: [identifier]
    })

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
        <div className="spriteContainer" style={ { height, width } } >
            <img src={data.sprites.front_default} alt={data.name} className="pokemonSprite" />
        </div>
    )
}

export default PokemonSprite