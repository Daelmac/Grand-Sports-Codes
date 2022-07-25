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
const getNewArrivalProducts = async () => {
  try {
    const result = await axios.get(
      `${API_BASE_URL}/new_products`
    );
    return result.data['new_products'];
  } catch (e) {
    console.log(e.response);
  } 
};
const getBestSellerProducts = async () => {
  try {
    const result = await axios.get(
      `${API_BASE_URL}/best_seller_products`
    );
    return result.data['best_seller_products'];
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
const getAllProducts =async()=>{
  try {
    const result = await axios.get(
      `${API_BASE_URL}/all_products`,
    );
    return result.data['product_data'];
  } catch (e) { 
    console.log(e.response);
  } 
}
export {getFeaturedProducts, getProductByID,getNewArrivalProducts,getBestSellerProducts,getAllProducts}