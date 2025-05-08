import { Pokemon, PokemonType} from "../../lib/defintions";
import { fetchSpecies } from "../../core/PokeAPI";
import { useHandleQuery } from "../../core/queryutils";
import PokemonEvolutions from "../PokemonEvolutions/PokemonEvolutions";
import { useCallback } from "react";
import './PokemonInfoBox.css'

function PokemonInfoBox({ pokemon }: { pokemon: Pokemon }) {    
    const {isLoading, isError, error, data} = useHandleQuery({
        queryFunction: useCallback(() => fetchSpecies(pokemon.species.url), [pokemon])
    })

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
        <>
            <div>
                <div className="nameline">
                    <p className="number">No. {pokemon.id}</p>
                    <p className="name">{pokemon.name}</p>
                </div>

                <div className="typeline">
                    <p className="type">TYPES</p>
                    <div className="types">
                        {pokemon.types.map((type: PokemonType, idx: number) => <p className="type" key={idx}>{type.type.name}</p>)}
                    </div>
                </div>

                <div className="heightline">
                    <p className="height">HEIGHT</p>
                    <p className="height">{pokemon.height} decimeters</p>
                </div>
                <div className="weightline">
                    <p className="height">WEIGHT</p>
                    <p className="height">{pokemon.weight} hectograms</p>
                </div>

                <PokemonEvolutions species={data} />
            </div>
        </>
    )
}

export default PokemonInfoBox