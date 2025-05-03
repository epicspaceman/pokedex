import { useCallback } from "react"
import { fetchEvolutionChain } from "../../core/PokeAPI"
import { useHandleQuery } from "../../core/queryutils"
import { ChainLink, PokemonSpecies } from "../../lib/defintions"

function PokemonEvolutions({ species }: { species: PokemonSpecies}) {
    const [isLoading, isError, error, evolutionChain] = useHandleQuery({
        queryFunction: useCallback(() => fetchEvolutionChain(species.evolution_chain.url), [species])
    })

    if (isError && error != undefined) {
        return (
            <div>Error: {error.message}</div>
        )
    }

    if (isLoading || evolutionChain === undefined) {
        return (
            <div>Loading...</div>
        )
    }


    return (
        <div>
            <h2>evolution line:</h2>
            <p>{evolutionChain.chain.species.name}</p>
            {evolutionChain.chain.evolves_to.map((chainLink: ChainLink, idx: number) => <p key={idx}>{chainLink.species.name}</p>)}
        </div>
    )
}

export default PokemonEvolutions