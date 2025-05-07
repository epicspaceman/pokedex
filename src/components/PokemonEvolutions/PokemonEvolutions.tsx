import { Dispatch, SetStateAction, useCallback } from "react"
import { fetchEvolutionChain } from "../../core/PokeAPI"
import { useHandleQuery } from "../../core/queryutils"
import { ChainLink, PokemonSpecies } from "../../lib/defintions"
import './PokemonEvolutions.css'
import arrowRight from '../../assets/arrow-right.svg'

function PokemonEvolutions({ species, setPokemonId }: { species: PokemonSpecies, setPokemonId: Dispatch<SetStateAction<string | undefined>>}) {
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
        <div className="evoline">
            <p className="chainLink" onClick={() => setPokemonId(evolutionChain.chain.species.name)}>{evolutionChain.chain.species.name}</p>
            <img src={arrowRight}/>
            {evolutionChain.chain.evolves_to.map((chainLink: ChainLink, idx: number) => <p key={idx} onClick={() => setPokemonId(chainLink.species.name)} className="chainLink">{chainLink.species.name}</p>)}
        </div>
    )
}

export default PokemonEvolutions