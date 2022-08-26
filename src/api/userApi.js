
import axios from "axios";
import { API_BASE_URL } from "../core/utils";
import Router from "next/router";

const getHeaerConfig = (token) => {
  return {
    headers: {
      "x-access-token": token,
    },
  };
};

const Adminlogin = async (user) => {
  try {
    var params = new FormData();
    params.append("email", user.email);
    params.append("password", user.password);
    const result = await axios.post(`${API_BASE_URL}/admin_login`, params);
    return result.data;
  } catch (e) {
    console.log(e.response);
  }
};
const AdminPasswordReset = async (email) => {
  try {
    let params = new FormData();
    params.append("email", email);

    const result = await axios.post(
      `${API_BASE_URL}/admin_reset_password`,
      params
    );
    return result.data;
  } catch (e) {
    return null;
  }
};
const AdminUpdatePassword = async (token, user) => {
  try {
    let params = new FormData();
    params.append("reset_token", token);
    params.append("reset_pin", user.reset_pin);
    params.append("password", user.password);
    params.append("confirmPassword", user.cpassword);

    const result = await axios.post(
      `${API_BASE_URL}/admin_update_password`,
      params
    );
    return result.data;
  } catch (e) {
    return null;
  }
};
const CustomerLogin = async (user) => {
  try {
    var params = new FormData();
    params.append("email", user.email);
    params.append("password", user.password);
    const result = await axios.post(`${API_BASE_URL}/customer_login`, params);
    return result.data;
  } catch (e) {
    console.log(e.response);
  }
};
const CreateCustomer = async (user) => {
  try {
    var params = new FormData();
    params.append("email", user.email);
    params.append("password", user.password);
    params.append("username", `${user.firstName} ${user.lastName}`);
    console.log("wdw", params);
    const result = await axios.post(`${API_BASE_URL}/create_customer`, params);
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
const CustomerPasswordReset = async (email) => {
  try {
    let params = new FormData();
    params.append("email", email);

    const result = await axios.post(
      `${API_BASE_URL}/customer_reset_password`,
      params
    );
    return result.data;
  } catch (e) {
    return null;
  }
};
const CustomerUpdatePassword = async (token, user) => {
  try {
    let params = new FormData();
    params.append("reset_token", token);
    params.append("reset_pin", user.reset_pin);
    params.append("password", user.password);
    params.append("confirmPassword", user.cpassword);

    const result = await axios.post(
      `${API_BASE_URL}/customer_update_password`,
      params
    );
    return result.data;
  } catch (e) {
    return null;
  }
};
const CreateAdmin = (admin, adminData) => async (dispatch) => {
  try {
    var params = new FormData();
    params.append("email", adminData.email);
    params.append("password", adminData.password);
    params.append("username", `${adminData.firstName} ${adminData.lastName}`);
    const result = await axios.post(
      `${API_BASE_URL}/create_admin`,
      params,
      getHeaerConfig(admin.token)
    );
    return result.data;
  } catch (e) {
    if (e.response.status == 401) {
      dispatch({
        type: "SET_CURRENT_USER",
        payload: {},
      });
      Router.push("/admin/login");
    }
    return null;
  }
};
// const getCustomers = async(admin,filter) => {
//     try {
//       let params = new FormData();
//       params.append('admin_id',admin?.admin_id)
//       params.append('filter',filter)
//       const result = await axios.post(
//         `${API_BASE_URL}/all_customers`,params,getHeaerConfig(admin.token)
//         );
//         return result.data['customers']
//       } catch (e) {
//         console.log("Fefew", e);
//         if (e.response.status == 401){
//           handle401()
//           // Router.push("/admin/login");
//         }
//       }
//   };

const getCustomers = (admin, filter) => async (dispatch) => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("filter", filter);
    const result = await axios.post(
      `${API_BASE_URL}/all_customers`,
      params,
      getHeaerConfig(admin.token)
    );
    return result.data.customers;
  } catch (e) {
    console.log("Fefew", e);
    if (e.response.status == 401) {
      dispatch({
        type: "SET_CURRENT_USER",
        payload: {},
      });
    }
    return null;
  }
};

const getAdmins = (admin) => async (dispatch) => {
  try {
    const result = await axios.get(
      `${API_BASE_URL}/all_admins`,
      getHeaerConfig(admin.token)
    );
    return result.data.admins;
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
const updateCustomerAddress = (customer, address) => async (dispatch) => {
  try {
    let params = new FormData();
    params.append("customer_id", customer?.customer_id);
    params.append("address", address);
    console.log(customer);
    const result = await axios.post(
      `${API_BASE_URL}/set_default_billing_address`,
      params,
      getHeaerConfig(customer.token)
    );
    return result.data;
  } catch (e) {
    console.log("Fefew", e);
    if (e.response.status == 401) {
      dispatch({
        type: "SET_CURRENT_USER",
        payload: {},
      });
    }
    return null;
  }
};
const enableCustomer = (admin, customer_id) => async (dispatch) => {
  try {
    let params = new FormData();
    params.append("customer_id", customer_id);
    params.append("admin_id", admin.admin_id);

    const result = await axios.post(
      `${API_BASE_URL}/admin_enable_customer`,
      params,
      getHeaerConfig(admin.token)
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
const disableCustomer = (admin, customer_id) => async (dispatch) => {
  try {
    let params = new FormData();
    params.append("customer_id", customer_id);
    params.append("admin_id", admin.admin_id);

    const result = await axios.post(
      `${API_BASE_URL}/admin_disable_customer`,
      params,
      getHeaerConfig(admin.token)
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

const updateCartData = (customer,cartData) => async(dispatch) => {
  try {
    let params = new FormData();
    params.append("customer_id", customer.customer_id);
    params.append("cart_data", cartData);

    const result = await axios.post(
      `${API_BASE_URL}/update_cart_data`,
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

export {
  Adminlogin,
  CreateCustomer,
  CreateAdmin,
  CustomerLogin,
  getCustomers,
  getAdmins,
  updateCustomerAddress,
  enableCustomer,
  disableCustomer,
  AdminPasswordReset,
  AdminUpdatePassword,
  CustomerPasswordReset,
  CustomerUpdatePassword,
  updateCartData,
};
