import api from '../constants/api'

const userService = {
    getInfo(){
        return api.get('/user/get-info')
    }
}

export default userService