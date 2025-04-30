export type Pokemon = 
    | {
        id: number
        name: string
        height: number
        weight: number
        abilities: PokemonAbility[]
    }
    | undefined;

export type PokemonAbility = 
    | {
        is_hidden: boolean
        slot: number
        ability: Ability
    }
    | undefined;

export type Ability =
    | {
        id: number
        name: string
    }
    | undefined