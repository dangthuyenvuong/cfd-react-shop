import { data } from "jquery"
import authService from "../services/auth"
import userService from "../services/user"
import { setToken, setUser } from "../utils/token"

export const fetchLogin = (payload) => {
    return async (dispatch) => {
        try {
            const token = await authService.login(payload.data)
            if(token.data) {
                setToken(token.data)

                const user = await userService.getInfo()

                setUser(user.data)

                dispatch({type: 'user/setUser', payload: user.data})

                payload?.success(user.data)
            } else if(token.message) {
                payload?.error(token)
            }
        }catch(error) {

        }
    }
}

export const fetchRegister = (payload) => {
    return async (dispatch) => {
        try{
            const register = await authService.register(payload.data)
            if(register.error) {
                payload?.error(register)
            }else{
                payload?.success(payload.data)
            }
        }catch(error) {

        }
    }
}


export const authReducer = (state = {}, action) => {
    return state
}

