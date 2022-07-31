import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategoriesType } from "../stores/product"

export const useCategories = () => {
    const { categories, loadingCategory, isFetchCategories } = useSelector(store => store.product)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!isFetchCategories) {
            dispatch(fetchCategoriesType())
        }
    }, [])

    return {
        categories,
        loadingCategory
    }
}