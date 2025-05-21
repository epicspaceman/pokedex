const MAX_POKEMON_ID = 1000;
const MIN_POKEMON_ID = 1;

export default function generateRandomPokemonId(): number {
    return Math.floor(Math.random() * (MAX_POKEMON_ID-MIN_POKEMON_ID) + MIN_POKEMON_ID)
}