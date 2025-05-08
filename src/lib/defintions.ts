interface BaseQueryResult<DataType> {
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    error: Error | null
    data: DataType | undefined
}

interface SuccessQueryResult<DataType> extends BaseQueryResult<DataType> {
    isLoading: false
    isError: false
    isSuccess: true
    error: null
    data: DataType
}

interface LoadingQueryResult<DataType> extends BaseQueryResult<DataType> {
    isLoading: true
    isError: false
    isSuccess: false
    error: null
    data: undefined
}

interface ErrorQueryResult<DataType> extends BaseQueryResult<DataType> {
    isLoading: false
    isError: true
    isSuccess: false
    error: Error
    data: undefined
}

export type QueryResult<DataType> = SuccessQueryResult<DataType> | LoadingQueryResult<DataType> | ErrorQueryResult<DataType>

export type Pokemon = {
    id: number
    name: string
    height: number
    weight: number
    abilities: PokemonAbility[]
    moves: Move[]
    types: PokemonType[]
    species: PokemonSpecies
    sprites: PokemonSprites
};

export type PokemonSprites = {
    front_default: string
    front_shiny: string
    front_female: string
    front_shiny_female: string
}

export type PokemonSpecies = {
    id: number
    url: string
    name: string
    order: number
    gender_rate: number
    capture_rate: number
    base_happiness: number
    is_baby: boolean
    is_legendary: boolean
    is_mythical: boolean
    color: PokemonColor
    shape: PokemonShape
    evolves_from_species: PokemonSpecies
    evolution_chain: EvolutionChain
}

export type EvolutionChain = {
    id: number
    chain: ChainLink
    url: string
}

export type ChainLink = {
    is_baby: number
    species: PokemonSpecies
    evolves_to: ChainLink[]
}

export type PokemonShape = {
    id: number
    name: string
    pokemon_species: PokemonSpecies
}

export type PokemonColor = {
    id: number
    name: string
    pokemon_species: PokemonSpecies[]
}

export type PokemonAbility = {
    is_hidden: boolean
    slot: number
    ability: Ability
};

export type Ability = {
    id: number
    name: string
};

export type PokemonType = {
    slot: number
    type: Type
};

export type Type = {
    id: number
    name: string
    move_damage_class: MoveDamageClass
}

export type Move = {
    id: number
    name: string
    accuracy: number
    effect_chance: number
    pp: number
    priority: number
    power: number
    type: Type
}

export type MoveDamageClass = {
    id: number
    name: string
    moves: Move[]
}