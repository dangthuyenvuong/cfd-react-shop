import api from '../constants/api'


const profileService = {
    getWishlist(query = ''){
        return api.get(`/ecommerce/v1/profile/wishlist${query}`)
    },
    addWishlist(id){
        return api.post(`/ecommerce/v1/profile/wishlist/${id}`)
    },
    removeWishlist(id){
        return api.delete(`/ecommerce/v1/profile/wishlist/${id}`)
    }
}

export default profileService