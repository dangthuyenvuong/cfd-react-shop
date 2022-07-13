import { useSearchValue } from "./useSearchValue"

export const usePage = (name = 'page') => {
    const search = useSearchValue()
    return parseInt(search.get(name) || '1')
}