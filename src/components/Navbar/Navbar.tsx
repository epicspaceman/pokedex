import { useNavigate } from "react-router"
import PokemonSearchBar from "../PokemonSearchBar/PokemonSearchBar"
import generateRandomPokemonId from "../../core/RandomPokemonId"
import './Navbar.css'

function Navbar() {
    const navigate = useNavigate()

    function redirectToRandomPokemon() {
        navigate(`/pokemon/${generateRandomPokemonId()}`)
    }

    return (
        <div className="navbar">
            <PokemonSearchBar />
            <button className="randomPokemonButton" onClick={() => redirectToRandomPokemon()}>Random Pokemon</button>
        </div>
    )
}

export default Navbar