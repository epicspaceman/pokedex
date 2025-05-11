import { useNavigate } from "react-router"
import searchIcon from '../../assets/search.svg'
import './PokemonSearchBar.css'

function PokemonSearchBar() {

    const navigate = useNavigate()

    function searchPokemon(formData: FormData) {
        const query = formData.get('pokequery')?.toString() ?? ''

        console.log(query)

        navigate(`/pokemon/${query}`)
    }

    return (
        <form className="searchContainer" action={searchPokemon}>
            <label className="searchLabel">Search for Pokemon</label>
            <div className="searchBarContainer">
                <input className="searchBar" type='text' name='pokequery' id='pokequery' required/>
                <button className="searchButton" type='submit'><img src={searchIcon} /></button>
            </div>
        </form>
    )
}

export default PokemonSearchBar