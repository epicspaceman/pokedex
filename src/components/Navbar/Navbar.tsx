import { useNavigate } from "react-router"
import PokemonSearchBar from "../PokemonSearchBar/PokemonSearchBar"
import generateRandomPokemonId from "../../core/RandomPokemonId"

function Navbar() {
    const navigate = useNavigate()

    function redirectToRandomPokemon() {
        navigate(`/pokemon/${generateRandomPokemonId()}`)
    }

    return (
        <>
            <PokemonSearchBar />
            <button onClick={() => redirectToRandomPokemon()}>Random Pokemon</button>
        </>
    )
}

export default Navbar