import axios from "../pages/axiosConfig";
import {getAuthConfig} from "../core/utils"

const razorpayOrder = async (name,amount) => {
  try {
    var params = new FormData();
    params.append("name",name);
    params.append("amount",amount);
    const result = await axios.post(`/razorpay_order`, params,getAuthConfig());
    return result ? result.data: null;
  } catch (e) {
    return null;
  }
};
const razorpayCallback = async (data) => {
    try {
      const result = await axios.post(`/razorpay_callback`, data,getAuthConfig());
      return result ? result.data: null;
    } catch (e) {
      return null;
    }
  };
export {razorpayOrder,razorpayCallback}