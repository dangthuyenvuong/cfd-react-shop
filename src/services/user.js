import api from '../constants/api'

const userService = {
    getInfo(){
        return api.get('/user/get-info')
    },
    updateInfo(data){
        return api.post('/user/update', data)
    },
    changePassword(data) {
        return api.post('/user/change-password', data)
    }
}

export default userService