import api from '../constants/api'


const authService = {
    refreshToken(data) {
        return api.post('/refresh-token', data)
    },
    login(data){
        return  api.post('/login', data)
    },
    register(data) {
        return api.post('/register', data)
    }
}

export default authService