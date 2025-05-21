import { useEffect, useState } from "react"
import { QueryResult } from "../lib/defintions"

export function useHandleQuery<t>({ queryFunction, queryKeys }: { queryFunction: () => Promise<t | Response>, queryKeys: string[] }): QueryResult<t> {
    const [queryResult, setQueryResult] = useState<QueryResult<t>>({
        isLoading: true,
        isError: false,
        isSuccess: false,
        error: null,
        data: undefined,
    })

    const queryKey = queryKeys.toString()

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

    async function storeData(data: t) {
        try {
            sessionStorage.setItem(queryKey, JSON.stringify(data))
        } catch {
            sessionStorage.clear()
            storeData(data)
        }
    }

    function handleQueryFunction() {
        queryFunction().then((res: t | Response) => {
            const storedData = sessionStorage.getItem(queryKey)

            if (storedData !== null) {
                setQueryResult({
                        isLoading: false,
                        isError: false,
                        isSuccess: true,
                        error: null,
                        data: JSON.parse(storedData),
                    })
            } else if (res instanceof Response) {
                handleResponseObject(res).then((json) => {
                    setQueryResult({
                        isLoading: false,
                        isError: false,
                        isSuccess: true,
                        error: null,
                        data: json,
                    })

                    storeData(json)
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

                storeData(res)
            } else {
                throw new Error("Data Undefined")
            }
        }).catch((e) => {
            handleError(e)
        })
    }

    useEffect(() => {
        handleQueryFunction()
        
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