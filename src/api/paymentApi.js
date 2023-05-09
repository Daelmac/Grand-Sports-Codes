import axios from "../pages/axiosConfig";
import {getAuthConfig} from "../core/utils"

// const razorpayOrder = async (name,amount) => {
//   try {
//     var params = new FormData();
//     params.append("name",name);
//     params.append("amount",amount);
//     const result = await axios.post(`/razorpay_order`, params,getAuthConfig());
//     return result ? result.data: null;
//   } catch (e) {
//     return null;
//   }
// };
const instamojoOrder = async (buyer_name,email,phone,purpose,amount,redirect_url) => {
  try {
    var params = new FormData();
    params.append("buyer_name",buyer_name);
    params.append("email",email);
    params.append("phone",phone);
    params.append("purpose",purpose);
    params.append("redirect_url",redirect_url);
    params.append("amount",amount);
    const result = await axios.post(`/instamojo_order`, params,getAuthConfig());
    return result ? result.data: null;
  } catch (e) {
    return null;
  }
};
// const razorpayCallback = async (data) => {
//     try {
//       const result = await axios.post(`/razorpay_callback`, data,getAuthConfig());
//       return result ? result.data: null;
//     } catch (e) {
//       return null;
//     }
//   };
export {instamojoOrder}