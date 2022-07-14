import userService from "../services/user"
import { clearToken, clearUser, getUser, setUser } from "../utils/token"
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'

const initialvalue = {
    user: getUser(),
}


// export const logoutAction = () => {
//     clearToken()
//     clearUser()
//     return {
//         type: 'user/logout'
//     }
// }

// export const getUserInfo = () => {
//     return async (dispatch) => {
// try {
//     const res = await userService.getInfo()
//     if (res.data) {
//         setUser(res.data)
//         dispatch({ type: 'user/setUser', payload: res.data })
//     }
// } catch (err) { }
//     }
// }

// export default function userReducer(state = initialvalue, action) {
//     switch (action.type) {
//         case 'user/setUser':
//             return {
//                 ...state,
//                 user: action.payload
//             }
//         case 'user/logout':
//             return {
//                 ...state,
//                 user: null
//             }
//         default:
//             return state
//     }
// }


// -----------------------



export const logoutAction = createAction('user/logout')

export const { name, reducer: userReducer, actions: userAction } = createSlice({
    initialState: initialvalue,
    name: 'user',
    reducers: {
        setUser(state, action) {
            // state.user = action.payload
            return {
                ...state,
                user: action.payload
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(logoutAction, (state) => {
            clearToken()
            clearUser()
            state.user = null
        })
    }
})


export const getUserInfo = createAsyncThunk(`${name}/getUserInfo`, async (_, thunkApi) => {
    try {
        const res = await userService.getInfo()
        if (res.data) {
            setUser(res.data)

            thunkApi.dispatch(userAction.setUser(res.data))
        }
    } catch (err) { }
})