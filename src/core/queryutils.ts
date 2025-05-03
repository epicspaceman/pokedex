import { useEffect, useState } from "react"

export function useHandleQuery<t>({ queryFunction }: { queryFunction: () => Promise<t> }): [boolean, boolean, Error | undefined, t | undefined] {
    const [error, setError] = useState<Error>()
        const [isError, setIsError] = useState<boolean>(false)
        const [isLoading, setIsLoading] = useState<boolean>(true)
        const [data, setData] = useState<t>()
    
        useEffect(() => {
            try {
                queryFunction().then((resData: t) => {
                    if (resData !== undefined) {
                        setData(resData)
                        setIsLoading(false)
                        setIsError(false)
                    } else {
                        throw new Error("Data undefined")
                    }
                })
            } catch (e) {
                setIsLoading(false)

                if (typeof e === 'string') {
                    setError(Error(e))
                    setIsError(true)
                } else if (e instanceof Error) {
                    setError(e)
                    setIsError(true)
                }
            }
        }, [queryFunction])
    
        return [isLoading, isError, error, data]
}