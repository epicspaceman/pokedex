import { useCallback, useState } from "react"
import { fetchEvolutionChain } from "../../core/PokeAPI"
import { useHandleQuery } from "../../core/queryutils"
import { ChainLink, PokemonSpecies } from "../../lib/defintions"
import './PokemonEvolutions.css'
import arrowRight from '/arrow-right.svg?url'
import chevronDown from '/chevron-down.svg?url'
import chevronUp from '/chevron-up.svg?url'
import { NavLink } from "react-router"
import PokemonSprite from "../PokemonSprite/PokemonSprite"

function getIdFromURL(url: string): string {
    const splitURL = url.split("/")
    const speciesId = splitURL[splitURL.length - 2]

    return speciesId
}

function PokemonEvolutions({ species }: { species: PokemonSpecies }) {
    const {isLoading, isError, error, data} = useHandleQuery({
        queryFunction: useCallback(() => fetchEvolutionChain(species.evolution_chain.url), [species]),
        queryKeys: [species.name, 'evolution_chain']
    })

    const [chainIdx, setChainIdx] = useState(0)

    function displayEvolutions(evolves_to: ChainLink[]) {
        return (
            <div className="linkSection">
                <img src={arrowRight}/>
                <div>
                    {
                        evolves_to.length > 1 
                        ? (
                            <div className="evolvesToContainer">
                                {chainIdx > 0 && <img src={chevronUp} onClick={() => setChainIdx(chainIdx - 1)} className="evolutionChainButtonUp"/>}
                                <NavLink to={`/pokemon/${evolves_to[chainIdx].species.name}`} className="chainLink">
                                    <PokemonSprite identifier={getIdFromURL(evolves_to[chainIdx].species.url)} />
                                </NavLink>
                                {chainIdx < evolves_to.length - 1 && <img src={chevronDown} onClick={() => setChainIdx(chainIdx + 1)} className="evolutionChainButtonDown"/>}
                            </div>
                        ) 
                        : (
                            <div className="evolvesToContainer">
                                <NavLink to={`/pokemon/${evolves_to[0].species.name}`} className="chainLink">
                                    <PokemonSprite identifier={getIdFromURL(evolves_to[0].species.url)} />
                                </NavLink>
                            </div>
                        )
                    }

                    {/* {evolves_to.map((chainLink: ChainLink, idx: number): ReactElement => {
                            return (
                                <div className="linkSection" key={idx}>
                                    <NavLink key={idx} to={`/pokemon/${chainLink.species.name}`} className="chainLink">
                                        <PokemonSprite identifier={getIdFromURL(chainLink.species.url)} />
                                    </NavLink>
                                    {chainLink.evolves_to.length > 0 && displayEvolutions(chainLink.evolves_to)}
                                </div>
                            )
                        })
                    } */}
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
                <PokemonSprite identifier={getIdFromURL(data.chain.species.url)} />
            </NavLink>
            {data.chain.evolves_to.length > 0 && displayEvolutions(data.chain.evolves_to)}
        </div>
    )
}

export default PokemonEvolutions