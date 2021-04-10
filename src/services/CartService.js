import axios from 'axios'
import authHeader from './AuthHeader';
const CART_API_BASE_URL = "http://localhost:8080/api/auth/cart/"

class CartService {
    // Methods for booking items
    getOrders(){
        return axios.get(CART_API_BASE_URL + "all",{ headers: authHeader() });
    }

    addItemToCart(itemId){
        return axios.post(CART_API_BASE_URL + "addItem/" + itemId, { headers: authHeader() });
    }

    // getBookingsById(bookingId){
    //     return axios.get(CART_API_BASE_URL + "bookingById/" + bookingId,{ headers: authHeader() });
    // }

    // clearBookings(){
    //     return axios.post( "http://localhost:8080/api/user/clearRes", { headers: authHeader() });
    // }

    // getBookingsByUserId(userId){
    //     return axios.get(CART_API_BASE_URL + "userBookings/" + userId,{ headers: authHeader() });
    // }

    // deleteBooking(bookingId){
    //     return axios.delete(CART_API_BASE_URL + "deleteBooking/" + bookingId,{ headers: authHeader() });
    // }


  
}

export default new CartService()