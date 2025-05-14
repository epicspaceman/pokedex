import { FlavorText, Pokemon, PokemonType } from "../../lib/defintions";
import { fetchSpecies } from "../../core/PokeAPI";
import { useHandleQuery } from "../../core/queryutils";
import PokemonEvolutions from "../PokemonEvolutions/PokemonEvolutions";
import { useCallback } from "react";
import './PokemonInfoBox.css'
import { TYPE_COLORS } from "../../core/PokemonTypeColors";

function filterFlavorTexts(flavorTexts: FlavorText[]): string {
    const text = flavorTexts.find((flavorText: FlavorText) => flavorText.language.name === 'en')?.flavor_text ?? ''
    return text.replace('\f', ' ')
}

function capitalize(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
}

const DECIMETERS_TO_INCHES = 3.937
const HECTOGRAMS_TO_POUNDS =  1 / 4.536

function decimetersToImperial(decimeters: number): string {
    const inches = decimeters * DECIMETERS_TO_INCHES

    return Math.round(inches / 12) + '\'' + (inches % 12).toLocaleString('en-US', {minimumIntegerDigits: 2, maximumFractionDigits: 0}) + '"'
}

function hectogramsToImperial(hectograms: number): string {
    return (hectograms * HECTOGRAMS_TO_POUNDS).toLocaleString('en-US', {maximumFractionDigits: 2}) + ' lbs'
}

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
        <div className="pokeInfoContainer">
            <div className="pokeDataContainer">
                <div>
                    <img src={pokemon.sprites.front_default} alt={data.name} className="pokemonImg"/>
                </div>
                <div className="stats">
                    <div className="nameline">
                        <p className="number">No. {pokemon.id}</p>
                        <p className="name">{capitalize(pokemon.name)}</p>
                    </div>

                    <div className="typeline">
                        <p className="typeLabel">TYPES</p>
                        <div className="types">
                            {pokemon.types.map((type: PokemonType, idx: number) => <p className="type" style={{backgroundColor: TYPE_COLORS[type.type.name]}} key={idx}>{capitalize(type.type.name)}</p>)}
                        </div>
                    </div>

                    <div className="heightline">
                        <p className="height">HEIGHT</p>
                        <p className="height">{decimetersToImperial(pokemon.height)}</p>
                    </div>
                    <div className="weightline">
                        <p className="height">WEIGHT</p>
                        <p className="height">{hectogramsToImperial(pokemon.weight)}</p>
                    </div>

                    <PokemonEvolutions species={data} />
                </div>
            </div>

            <div className="flavorText">
                <p>{filterFlavorTexts(data.flavor_text_entries)}</p>
            </div>
        </div>
    )
}

export default PokemonInfoBox