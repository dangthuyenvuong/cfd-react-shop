import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productSerivce from "../services/product";

const initialState = {
    categories: [],
    loadingCategory: true
}



export const { name, actions: productAction, reducer: productReducer } = createSlice({
    initialState,
    name: 'product',
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loadingCategory = true
        })

        builder.addCase(fetchCategories.fulfilled, (state) => {
            state.loadingCategory = false
        })
    }
})


export const fetchCategories = createAsyncThunk(`${name}/fetchCategories`, async (_, thunkApi) => {
    try {
        const res = await productSerivce.getCategories()
        thunkApi.dispatch(productAction.setCategories(res))

    } catch (err) { }
})
