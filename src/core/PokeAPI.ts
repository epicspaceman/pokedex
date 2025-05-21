import { EvolutionChain, Pokemon, PokemonSpecies } from "../lib/defintions"
import generateRandomPokemonId from "./RandomPokemonId"

export async function fetchData<t>(url: string): Promise<t | Response>  {
    const response = await fetch(url, {method: 'GET'})
    if (!response.ok) {
        return response
    }

    const json = await response.json()

    // console.log(json)
    return json
}

export async function fetchPokemon(identifier?: number | string): Promise<Pokemon | Response> {
    // when given no identifier, generate a random id between the maximum and minimum pokemon ids
    const id = identifier ? identifier : generateRandomPokemonId()
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`

    return fetchData<Pokemon>(url)
}

export async function fetchSpecies(url: string): Promise<PokemonSpecies | Response> { return fetchData<PokemonSpecies>(url) }

export async function fetchEvolutionChain(url: string): Promise<EvolutionChain | Response> { return fetchData<EvolutionChain>(url) }