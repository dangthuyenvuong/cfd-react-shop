import { data } from "jquery"
import authService from "../services/auth"
import userService from "../services/user"
import { setToken, setUser } from "../utils/token"
import { getUserInfo } from "./user"

export const fetchLogin = (payload) => {
    return async (dispatch) => {
        try {
            const token = await authService.login(payload.data)
            if(token.data) {
                setToken(token.data)

                dispatch(getUserInfo())

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

