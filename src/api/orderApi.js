import axios from "axios";
import { API_BASE_URL } from "../core/utils";

const getHeaerConfig = (token) => {
  return {
    headers: {
      "x-access-token": token,
    },
  };
};

const addPurchases = (customer, params) => async (dispatch) => {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/add_customer_purchases`,
      params,
      getHeaerConfig(customer.token)
    );
    return result.data;
  } catch (e) {
    if (e.response.status == 401) {
      dispatch({
        type: "SET_CURRENT_USER",
        payload: {},
      });
    }
    return null;
  }
};
const get_all_purchases =(admin, filter = null) =>async (dispatch) => {
    try {
      let params = new FormData();
      if (filter) params.append("filter_type", filter);
      const result = await axios.post(
        `${API_BASE_URL}/show_all_customer_purchases`,
        params,
        getHeaerConfig(admin.token)
      );
      return result.data.purchases;
    } catch (e) {
      if (e.response.status == 401) {
        dispatch({
          type: "SET_CURRENT_USER",
          payload: {},
        });
      }
      return null;
    }
  };
  const getOrderDetailsByID = (admin,id) =>async (dispatch) => {
    try {
      var params = new FormData();
      params.append("order_id", id);
      const result = await axios.post(`${API_BASE_URL}/get_order_details`,params,
      getHeaerConfig(admin.token));
      return result.data.purchaseDetails[0];
    } catch (e) {
      if (e?.response?.status == 401) {
        dispatch({
          type: "SET_CURRENT_USER",
          payload: {},
        });
      }
      return null
    }
  };
  const editOrderDetails = (admin,id,orderData) =>async (dispatch) => {
    try {
      var params = new FormData();
      params.append("order_id",id);
      if (orderData?.order_status) params.append("order_status",orderData?.order_status);
      if (orderData?.order_tracking_id) params.append("order_tracking_id",orderData?.order_tracking_id);
      if (orderData?.order_delivery_partner) params.append("order_delivery_partner",orderData?.order_delivery_partner);
      const result = await axios.post(`${API_BASE_URL}/edit_order_details`,params,
      getHeaerConfig(admin.token));
      return result.data;
    } catch (e) {
      if (e?.response?.status == 401) {
        dispatch({ 
          type: "SET_CURRENT_USER",
          payload: {},
        });
      }
      return null
    }
  };
  const get_all_receipts =(admin) =>async (dispatch) => {
    try {
      const result = await axios.get(
        `${API_BASE_URL}/show_all_receipts`,
        getHeaerConfig(admin.token)
      );
      return result.data.receipts;
    } catch (e) {
      if (e.response.status == 401) {
        dispatch({
          type: "SET_CURRENT_USER",
          payload: {},
        });
      }
      return null;
    }
  };
  const showCustomerPurchases = (customer) =>async (dispatch) => {
    try {
      var params = new FormData();
      params.append("customer_id",customer.customer_id);
      const result = await axios.post(`${API_BASE_URL}/show_customer_purchases`,params,
      getHeaerConfig(customer.token));
      return result.data.purchases;
    } catch (e) {
      if (e?.response?.status == 401) {
        dispatch({ 
          type: "SET_CURRENT_USER",
          payload: {},
        });
      }
      return null
    }
  };
export { addPurchases, get_all_purchases ,getOrderDetailsByID,editOrderDetails,get_all_receipts,showCustomerPurchases};
