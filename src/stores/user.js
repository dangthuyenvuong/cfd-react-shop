import { clearToken, clearUser, getUser } from "../utils/token"

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