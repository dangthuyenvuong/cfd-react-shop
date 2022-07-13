import userService from "../services/user"
import { clearToken, clearUser, getUser, setUser } from "../utils/token"

const initialvalue = {
    user: getUser()
}


export const logoutAction = () => {
    clearToken()
    clearUser()
    return {
        type: 'user/logout'
    }
}

export const getUserInfo = () => {
    return async (dispatch) => {
        try {
            const res = await userService.getInfo()
            if(res.data) {
                setUser(res.data)
                dispatch({type: 'user/setUser', payload: res.data})
            }
        } catch (err) { }
    }
}

export default function userReducer(state = initialvalue, action) {
    switch (action.type) {
        case 'user/setUser':
            return {
                ...state,
                user: action.payload
            }
        case 'user/logout':
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}