import { useParams } from "react-router"
import PokemonDisplay from "./components/PokemonDisplay/PokemonDisplay"

function Pokemon() {
    const { identifier } = useParams()

    return (
        <>
            <PokemonDisplay identifier={identifier}/>
        </>
    )
}

export default Pokemon