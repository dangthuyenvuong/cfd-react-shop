import api from '../constants/api'

const productSerivce = {
    getProduct(query = ''){
        return api.get(`/product${query}`)
    }
}

export default productSerivce