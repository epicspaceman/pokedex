import { useEffect, useState } from "react"
import { QueryResult } from "../lib/defintions"

export function useHandleQuery<t>({ queryFunction }: { queryFunction: () => Promise<t | Response> }): QueryResult<t> {
    const [queryResult, setQueryResult] = useState<QueryResult<t>>({
        isLoading: true,
        isError: false,
        isSuccess: false,
        error: null,
        data: undefined,
    })

    function handleError(e: Error | string | any) {
        let error = new Error("Unexpected Error")

        if (typeof e === 'string') {
            error = Error(e)
        } else if (e instanceof Error) {
            error = e
        }

        setQueryResult({
            isLoading: false,
            isError: true,
            isSuccess: false,
            error,
            data: undefined,
        })
    }

    useEffect(() => {
        queryFunction().then((res: t | Response) => {
            if (res instanceof Response) {
                handleResponseObject(res).then((json) => {
                    setQueryResult({
                        isLoading: false,
                        isError: false,
                        isSuccess: true,
                        error: null,
                        data: json,
                    })
                }).catch((e) => {
                    handleError(e)
                })
            } else if (res !== undefined) {
                setQueryResult({
                    isLoading: false,
                    isError: false,
                    isSuccess: true,
                    error: null,
                    data: res,
                })
            } else {
                throw new Error("Data Undefined")
            }
        }).catch((e) => {
            handleError(e)
        })
    }, [queryFunction])

    return queryResult
}

async function handleResponseObject(response: Response) {
    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }

    const json = await response.json()
    return json
}