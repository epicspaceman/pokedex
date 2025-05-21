import { useCallback } from "react"
import PokemonInfoBox from "../PokemonInfoBox/PokemonInfoBox"
import { useHandleQuery } from "../../core/queryutils"
import { fetchPokemon } from "../../core/PokeAPI"
import "./PokemonDisplay.css"
import Navbar from "../Navbar/Navbar"

function PokemonDisplay({ identifier }: { identifier: string | undefined}) {    
    const {isLoading, isError, error, data} = useHandleQuery({
        queryFunction: useCallback(() => fetchPokemon(identifier), [identifier]),
        queryKeys: [identifier ?? 'random']
    })

    if (isError) {
        if (error.message === 'Not Found') {
            return (
                <div className="container">
                    <Navbar />

                    <p>Could not find '{identifier}'</p>
                </div>
            )
        }

        return (
            <div>An unexpected error occurred: {error.message}</div>
        )
    }

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
        <div className='container'>
            <div className="content">
                <Navbar />
                <PokemonInfoBox pokemon={data} />
            </div>
        </div>
        </>
    )
}

export default PokemonDisplay