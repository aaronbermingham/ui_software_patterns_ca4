import axios from 'axios'
import authHeader from './AuthHeader';
const ADDRESS_API_BASE_URL = "http://localhost:8080/api/auth/address/"

class AddressService {
    addAddress(address, id){
        return axios.post(ADDRESS_API_BASE_URL + "addAddress/" + id, address,{ headers: authHeader() });
    }




  
}

export default new AddressService()