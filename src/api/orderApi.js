import axioss from "../pages/axiosConfig";
import {getAuthConfig} from "../core/utils"
// const getAuthConfig=()=>{
//  return { 
// headers: {
//   "x-access-token":window.__NEXT_REDUX_STORE__.getState()?.currentUserData.token || ""
// }}
// }
const addPurchases = async (params) => {
  try {
    const result = await axioss.post(`/add_customer_purchases`, params,getAuthConfig());
    return result ? result.data : null;
  } catch (e) {
    return null;
  }
};
const get_all_purchases = async (filter = null) => {
  try {
    let params = new FormData();
    if (filter) params.append("filter_type", filter);
    const result = await axioss.post(`/show_all_customer_purchases`, params,getAuthConfig());
    return result ? result.data.purchases : null;
  } catch (e) {
    return null;
  }
};
const getOrderDetailsByID = async (id) => {
  try {
    var params = new FormData();
    params.append("order_id", id);
    const result = await axioss.post("/get_order_details", params,getAuthConfig());
    return result ? result.data.purchaseDetails[0] : null;
  } catch (e) {
    return null;
  }
};
const editOrderDetails = async (id, orderData) => {
  try {
    var params = new FormData();
    params.append("order_id", id);
    if (orderData?.order_status)
      params.append("order_status", orderData?.order_status);
    if (orderData?.order_tracking_id)
      params.append("order_tracking_id", orderData?.order_tracking_id);
    if (orderData?.order_delivery_partner)
      params.append(
        "order_delivery_partner",
        orderData?.order_delivery_partner
      );
    const result = await axioss.post(`/edit_order_details`, params,getAuthConfig());
    return result ? result.data : null;
  } catch (e) {
    return null;
  }
};
const get_all_receipts = async () => {
  try {
    const result = await axioss.get(`/show_all_receipts`,getAuthConfig());
    return result ? result.data.receipts : null;
  } catch (e) {
    return null;
  }
};
const showCustomerPurchases = async (customer) => {
  try {
    let token = window.__NEXT_REDUX_STORE__.getState()?.currentUserData.token || ""
    console.log(token)
    var params = new FormData();
    params.append("customer_id", customer.customer_id);
    const result = await axioss.post(`/show_customer_purchases`, params, getAuthConfig());
    return result ? result.data.purchases : null;
  } catch (e) {
    console.log(e)
    return null;
  }
};
const cancelCustomerOrder = async (order_id) => {
  try {
    var params = new FormData();
    params.append("order_id", order_id);
    const result = await axioss.post(`/cancel_order`, params,getAuthConfig());
    return result ? result.data : null;
  } catch (e) {
    return null;
  }
};
export {
  addPurchases,
  get_all_purchases,
  getOrderDetailsByID,
  editOrderDetails,
  get_all_receipts,
  showCustomerPurchases,
  cancelCustomerOrder,
};
