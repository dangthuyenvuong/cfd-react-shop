import { data } from "jquery"
import authService from "../services/auth"
import userService from "../services/user"
import { setToken, setUser } from "../utils/token"
import { getUserInfo } from "./user"
import { createSlice, createAsyncThunk, isAnyOf, createAction } from '@reduxjs/toolkit'
import { call, put } from "redux-saga/effects"

// export const fetchLogin = (payload) => {
//     return async (dispatch) => {
//         try {
//     const token = await authService.login(payload.data)
//     if(token.data) {
//         setToken(token.data)

//         dispatch(getUserInfo())

//         payload?.success(user.data)
//     } else if(token.message) {
//         payload?.error(token)
//     }
// }catch(error) {

// }
//     }
// }

// export const fetchRegister = (payload) => {
//     return async (dispatch) => {
//         try {
//             const register = await authService.register(payload.data)
//             if (register.error) {
//                 payload?.error(register)
//             } else {
//                 payload?.success(payload.data)
//             }
//         } catch (error) {

//         }
//     }
// }


// export const authReducer = (state = {}, action) => {
//     return state
// }




// ----------------------------



export const { name, reducer: authReducer } = createSlice({
    name: 'auth',
    initialState: {
        loadingLogin: false,
        loadingRegister: false
    },
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(fetchLogin.pending, (state, action) => {
        //     state.loadingLogin = true
        // })

        // builder.addMatcher( isAnyOf(fetchLogin.rejected, fetchLogin.fulfilled), (state, action) => {
        //     state.loadingLogin = false
        // })
    }
})



export const fetchLoginThunk = createAsyncThunk(`${name}/fetchLogin`, async (payload, thunkApi) => {

    try {
        const token = await authService.login(payload.data)
        if (token.data) {
            setToken(token.data)
            thunkApi.dispatch(getUserInfo())

            payload?.success(user.data)
        } else if (token.message) {
            payload?.error(token)
        }
    } catch (error) {

    } finally {
        payload?.finally()
    }
})


export const fetchLoginType = createAction(`${name}/fetchLogin`)

export function* fetchLogin({ payload }) {
    try {
        const token = yield call(authService.login, payload.data)
        if (token.data) {
            setToken(token.data)
            // thunkApi.dispatch(getUserInfo())
            yield put(getUserInfo())

            // payload?.success()
        } else if (token.message) {
            // payload?.error(token)
        }
    } catch (err) {
        payload?.error(err)
        console.error(err)
    } finally {
        payload?.finally()
    }

}


export const fetchRegister = createAsyncThunk(`${name}/fetchRegister`, async (payload, thunkApi) => {
    try {
        const register = await authService.register(payload.data)
        if (register.error) {
            payload?.error(register)
        } else {
            payload?.success(payload.data)

            thunkApi.dispatch(fetchLogin({
                username: payload.data.username,
                password: payload.data.password
            }))
        }
    } catch (error) {

    } finally {
        payload?.finally()
    }
})

