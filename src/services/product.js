import api from '../constants/api'

const productSerivce = {
    getProduct(query = ''){
        return api.get(`/product${query}`)
    },
    getCategories(){
        return api.get('/categories')
    }
}

export default productSerivce