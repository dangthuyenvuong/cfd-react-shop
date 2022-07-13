import { useLocation } from "react-router-dom"

export const useSearchValue = () => {
    const { search } = useLocation()
    return new URLSearchParams(search)
}