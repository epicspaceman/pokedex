import { Pokemon} from "../../lib/defintions";
import { fetchSpecies } from "../../core/PokeAPI";
import { useHandleQuery } from "../../core/queryutils";
import PokemonEvolutions from "../PokemonEvolutions/PokemonEvolutions";
import { useCallback } from "react";

function PokemonInfoBox({ pokemon }: { pokemon: Pokemon }) {    
    const [isLoading, isError, error, species] = useHandleQuery({
        queryFunction: useCallback(() => fetchSpecies(pokemon.species.url), [pokemon])
    })

    if (isError && error != undefined) {
        return (
            <div>Error: {error.message}</div>
        )
    }

    if (isLoading || species === undefined) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            <div>
                <h1>Pokedex</h1>
                <p>Name: {pokemon.name}</p>
                <p>Height: {pokemon.height} hectograms</p>
                <p>Weight: {pokemon.weight} decimeters</p>

                <PokemonEvolutions species={species} />
            </div>
        </>
    )
}

export default PokemonInfoBox