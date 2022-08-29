import axioss from "../pages/axiosConfig";

const Adminlogin = async (user) => {
  try {
    var params = new FormData();
    params.append("email", user.email);
    params.append("password", user.password);
    const result = await axioss.post(`/admin_login`, params);
    return result ? result.data : null;
  } catch (e) {
    console.log(e.response);
    return null;
  }
};
const AdminPasswordReset = async (email) => {
  try {
    let params = new FormData();
    params.append("email", email);

    const result = await axioss.post(`/admin_reset_password`, params);
    return result ? result.data : null;
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

    const result = await axioss.post(`/admin_update_password`, params);
    return result ? result.data : null;
  } catch (e) {
    return null;
  }
};
const CustomerLogin = async (user) => {
  try {
    var params = new FormData();
    params.append("email", user.email);
    params.append("password", user.password);
    const result = await axioss.post(`/customer_login`, params);
    return result ? result.data : null;
  } catch (e) {
    console.log(e.response);
    return null;
  }
};
const CreateCustomer = async (user) => {
  try {
    var params = new FormData();
    params.append("email", user.email);
    params.append("password", user.password);
    params.append("username", `${user.firstName} ${user.lastName}`);
    console.log("wdw", params);
    const result = await axioss.post(`/create_customer`, params);
    return result ? result.data : null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
const CustomerPasswordReset = async (email) => {
  try {
    let params = new FormData();
    params.append("email", email);

    const result = await axioss.post(`/customer_reset_password`, params);
    return result ? result.data : null;
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

    const result = await axioss.post(`/customer_update_password`, params);
    return result ? result.data : null;
  } catch (e) {
    return null;
  }
};
const CreateAdmin = async(adminData)  => {
  try {
    var params = new FormData();
    params.append("email", adminData.email);
    params.append("password", adminData.password);
    params.append("username", `${adminData.firstName} ${adminData.lastName}`);
    const result = await axioss.post(`/create_admin`, params);
    return result ? result.data : null;
  } catch (e) {
    return null;
  }
};

const getCustomers = async(admin, filter) => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("filter", filter);
    const result = await axioss.post(`/all_customers`, params);
    return result ? result.data.customers : null;
  } catch (e) {
    return null;
  }
};

const getAdmins = async() => {
  try {
    const result = await axioss.get(`/all_admins`);
    return result ? result.data.admins : null;
  } catch (e) {
    return null;
  }
};
const updateCustomerAddress = async(customer, address) => {
  try {
    let params = new FormData();
    params.append("customer_id", customer?.customer_id);
    params.append("address", address);
    console.log(customer);
    const result = await axioss.post(`/set_default_billing_address`, params);
    return result ? result.data : null;
  } catch (e) {
    return null;
  }
};
const enableCustomer = async(admin, customer_id) => {
  try {
    let params = new FormData();
    params.append("customer_id", customer_id);
    params.append("admin_id", admin.admin_id);

    const result = await axioss.post(`/admin_enable_customer`, params);
    return result ? result.data : null;
  } catch (e) {
    return null;
  }
};
const disableCustomer = async(admin, customer_id) =>  {
  try {
    let params = new FormData();
    params.append("customer_id", customer_id);
    params.append("admin_id", admin.admin_id);

    const result = await axioss.post(`/admin_disable_customer`, params);
    return result ? result.data : null;
  } catch (e) {
    return null;
  }
};

const updateCartData = async(customer, cartData)  => {
  try {
    let params = new FormData();
    params.append("customer_id", customer.customer_id);
    params.append("cart_data", cartData);

    const result = await axioss.post(`/update_cart_data`, params);
    return result ? result.data : null;
  } catch (e) {
    return null;
  }
};
const updateWishlistData = async(customer, wishlistData) => {
  try {
    let params = new FormData();
    params.append("customer_id", customer.customer_id);
    params.append("wishlist_data", wishlistData);

    const result = await axioss.post(`/update_wishlist_data`, params);
    return result ? result.data : null;
  } catch (e) {
    return null;
  }
};

const changeCustomerPassword = async(customer,passwordData) => {
  try {
    let params = new FormData();
    params.append("customer_id", customer.customer_id);
    params.append("current_password", passwordData.currentPassword);
    params.append("new_password", passwordData.password);

    const result = await axioss.post(`/customer_change_password`, params);
    return result ? result.data : null;
  } catch (e) {
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
  updateWishlistData,
  changeCustomerPassword
};
