import axios from "axios";
import authHeader from "./AuthHeader";

const ITEM_API_BASE_URL = "http://localhost:8080/api/auth/item/";

class ItemService {
  // get all items/products
  getItems() {
    return axios.get(ITEM_API_BASE_URL + "all", { headers: authHeader() });
  }

  // add an item/product
  addItem(item) {
    return axios.post(ITEM_API_BASE_URL + "addItem", item, {
      headers: authHeader(),
    });
  }

  // get item/product by id
  getItemById(id) {
    return axios.get(ITEM_API_BASE_URL + "itemById/" + id, {
      headers: authHeader(),
    });
  }

  // update item/product
  updateItem(item, id) {
    return axios.put(ITEM_API_BASE_URL + "updateItem/" + id, item, {
      headers: authHeader(),
    });
  }

  // delete item/product
  deleteItem(id) {
    return axios.delete(ITEM_API_BASE_URL + "deleteItem/" + id, {
      headers: authHeader(),
    });
  }

  searchItem(searchText) {
    console.log(ITEM_API_BASE_URL + "search/" + searchText);
    return axios.get(ITEM_API_BASE_URL + "search/" + searchText, {
      headers: authHeader(),
    });
  }

  sortItemNameAscending() {
    return axios.get(ITEM_API_BASE_URL + "nameAscending", {
      headers: authHeader(),
    });
  }

  sortItemManufacturerAscending() {
    return axios.get(ITEM_API_BASE_URL + "manufacturerAscending", {
      headers: authHeader(),
    });
  }

  sortItemPriceAscending() {
    return axios.get(ITEM_API_BASE_URL + "priceAscending", {
      headers: authHeader(),
    });
  }

  sortItemTypeAscending() {
    return axios.get(ITEM_API_BASE_URL + "typeAscending", {
      headers: authHeader(),
    });
  }

  sortItemNameDescending() {
    return axios.get(ITEM_API_BASE_URL + "nameDescending", {
      headers: authHeader(),
    });
  }

  sortItemManufacturerDescending() {
    return axios.get(ITEM_API_BASE_URL + "manufacturerDescending", {
      headers: authHeader(),
    });
  }

  sortItemPriceDescending() {
    return axios.get(ITEM_API_BASE_URL + "priceDescending", {
      headers: authHeader(),
    });
  }

  sortItemTypeDescending() {
    return axios.get(ITEM_API_BASE_URL + "typeDescending", {
      headers: authHeader(),
    });
  }
}

export default new ItemService();
