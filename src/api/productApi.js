import axios from "axios";
import {API_BASE_URL} from "../core/utils"
const getFeaturedProducts = async () => {
  try {
    const result = await axios.get(
      `${API_BASE_URL}/featured_products`
    );
    return result.data['featured_products'];
  } catch (e) {
    console.log(e.response);
  } 
};
const getProductByID = async (id) => {
  try {
    var params = new FormData();
    params.append('product_id',id)
    const result = await axios.post(
      `${API_BASE_URL}/single_product`,params
    );
    return result.data;
  } catch (e) {
    console.log(e.response);
  } 
};
export {getFeaturedProducts, getProductByID}