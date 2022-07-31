import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { call, delay, put } from "redux-saga/effects";
import productSerivce from "../services/product";

const initialState = {
    categories: [],
    loadingCategory: true,
    isFetchCategories: false
}



export const { name, actions: productAction, reducer: productReducer } = createSlice({
    initialState,
    name: 'product',
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload
        },
        setLoadingCategories(state, action) {
            state.loadingCategory = action.payload
        }
    },
    extraReducers: builder => {
        // builder.addCase(fetchCategories.pending, (state) => {
        //     state.loadingCategory = true
        //     state.isFetchCategories = true
        // })

        // builder.addCase(fetchCategories.fulfilled, (state) => {
        //     state.loadingCategory = false
        // })
    }
})


// export const fetchCategories = createAsyncThunk(`${name}/fetchCategories`, async (_, thunkApi) => {
//     try {
//         const res = await productSerivce.getCategories()
//         thunkApi.dispatch(productAction.setCategories(res))

//     } catch (err) { }
// })


export const fetchCategoriesType = createAction(`${name}/fetchCategories`)

export function* fetchCategories() {
    try {

        yield delay()
        console.log('fetchCategories')

        yield put(productAction.setLoadingCategories(true))
        const res = yield call(productSerivce.getCategories)
        // thunkApi.dispatch(productAction.setCategories(res))
        yield put(productAction.setCategories(res))
        yield put(productAction.setLoadingCategories(false))

    } catch (err) { }
}