import { ReactElement, useCallback } from "react"
import { fetchEvolutionChain } from "../../core/PokeAPI"
import { useHandleQuery } from "../../core/queryutils"
import { ChainLink, PokemonSpecies } from "../../lib/defintions"
import './PokemonEvolutions.css'
import arrowRight from '../../assets/arrow-right.svg'
import { NavLink } from "react-router"
import PokemonSprite from "../PokemonSprite/PokemonSprite"

function PokemonEvolutions({ species }: { species: PokemonSpecies }) {
    const {isLoading, isError, error, data} = useHandleQuery({
        queryFunction: useCallback(() => fetchEvolutionChain(species.evolution_chain.url), [species]),
        queryKeys: [species.name, 'evolution_chain']
    })

    function displayEvolutions(evolves_to: ChainLink[]) {
        return (
            <div className="linkSection">
                <img src={arrowRight}/>
                <div>
                    {evolves_to.map((chainLink: ChainLink, idx: number): ReactElement => {
                            return (
                                <div className="linkSection" key={idx}>
                                    <NavLink key={idx} to={`/pokemon/${chainLink.species.name}`} className="chainLink">
                                        <PokemonSprite identifier={chainLink.species.name} />
                                    </NavLink>
                                    {chainLink.evolves_to.length > 0 && displayEvolutions(chainLink.evolves_to)}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div>Error: {error.message}</div>
        )
    }

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="evoline">
            <NavLink className="chainLink" to={`/pokemon/${data.chain.species.name}`}>
                <PokemonSprite identifier={data.chain.species.name} />
            </NavLink>
            {data.chain.evolves_to.length > 0 && displayEvolutions(data.chain.evolves_to)}
        </div>
    )
}

export default PokemonEvolutions