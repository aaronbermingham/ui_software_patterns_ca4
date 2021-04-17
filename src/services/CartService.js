import axios from 'axios'
import authHeader from './AuthHeader';
const CART_API_BASE_URL = "http://localhost:8080/api/auth/cart/"

class CartService {
    // Methods for booking items
    getOrders(){
        return axios.get(CART_API_BASE_URL + "all",{ headers: authHeader() });
    }

    addItemToCart(itemId, userId){
        return axios.post(CART_API_BASE_URL + "addItem/" + itemId + "/" + userId, { headers: authHeader() });
    }

    getCartByUserId(userId){
        console.log("API call ",CART_API_BASE_URL + "cartByUserId/" + userId)
        return axios.get(CART_API_BASE_URL + "cartByUserId/" + userId,{ headers: authHeader() });
    }




  
}

export default new CartService()