import { useEffect, useState } from "react"

export const useData = (promise, dependencyList) => {
    const [data, setData] = useState()
    const [paginate, setPaginate] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, dependencyList)

    const fetchData = () => {
        setLoading(true)
        promise()
            .then(res => {
                if (res.data) {
                    setData(res.data)
                }

                if (res.paginate) {
                    setPaginate(res.paginate)
                }

                setLoading(false)
            })
    }

    return {
        data, paginate, loading, fetchData
    }
}