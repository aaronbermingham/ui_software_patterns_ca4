import axios from "axios";
import authHeader from "./AuthHeader";
const CART_API_BASE_URL = "http://localhost:8080/api/auth/cart/";

class CartService {
  getOrders() {
    return axios.get(CART_API_BASE_URL + "all", { headers: authHeader() });
  }

  addItemToCart(itemId, userId) {
    return axios.post(CART_API_BASE_URL + "addItem/" + itemId + "/" + userId, {
      headers: authHeader(),
    });
  }

  getCartByUserId(userId) {
    console.log("API call ", CART_API_BASE_URL + "cartByUserId/" + userId);
    return axios.get(CART_API_BASE_URL + "cartByUserId/" + userId, {
      headers: authHeader(),
    });
  }

  getCartById(cartId) {
    console.log("API call ", CART_API_BASE_URL + "cartByUserId/" + cartId);
    return axios.get(CART_API_BASE_URL + "cartById/" + cartId, {
      headers: authHeader(),
    });
  }

  discountCart(cartId, discount) {
    return axios.get(
      CART_API_BASE_URL + "cartDiscount/" + cartId + "/" + discount,
      { headers: authHeader() }
    );
  }
}

export default new CartService();
