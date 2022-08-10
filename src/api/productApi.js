import axios from "axios";
import { API_BASE_URL } from "../core/utils";

const getHeaerConfig = (token) => {
  return {
    headers: {
      "x-access-token": token,
    },
  };
};

const getFeaturedProducts = async () => {
  try {
    const result = await axios.get(`${API_BASE_URL}/featured_products`);
    return result.data["featured_products"];
  } catch (e) {
    console.log(e.response);
  }
};
const getNewArrivalProducts = async () => {
  try {
    const result = await axios.get(`${API_BASE_URL}/new_products`);
    return result.data["new_products"];
  } catch (e) {
    console.log(e.response);
  }
};
const getBestSellerProducts = async () => {
  try {
    const result = await axios.get(`${API_BASE_URL}/best_seller_products`);
    return result.data["best_seller_products"];
  } catch (e) {
    console.log(e.response);
  }
};
const getProductByID = async (id) => {
  try {
    var params = new FormData();
    params.append("product_id", id);
    const result = await axios.post(`${API_BASE_URL}/single_product`, params);
    return result.data;
  } catch (e) {
    console.log(e.response);
    return null
  }
};
const getAllProducts = async () => {
  try {
    const result = await axios.get(`${API_BASE_URL}/all_products`);
    return result.data["product_data"];
  } catch (e) {
    console.log(e.response);
  }
};

const MakeFeaturedProduct = (admin, product_id) => async (dispatch) => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("product_id", product_id);
    const result = await axios.post(
      `${API_BASE_URL}/admin_make_featured_product`,
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
const RemoveFeaturedProduct = (admin, product_id) => async (dispatch) => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("product_id", product_id);
    const result = await axios.post(
      `${API_BASE_URL}/admin_remove_featured_product`,
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
const MakeNewProduct = (admin, product_id) => async (dispatch) => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("product_id", product_id);
    const result = await axios.post(
      `${API_BASE_URL}/admin_make_new_product`,
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
const RemoveNewProduct = (admin, product_id) => async (dispatch) => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("product_id", product_id);
    const result = await axios.post(
      `${API_BASE_URL}/admin_remove_new_product`,
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
const MakeBestSellerProduct = (admin, product_id) => async (dispatch) => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("product_id", product_id);
    const result = await axios.post(
      `${API_BASE_URL}/admin_make_bestseller_product`,
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
const RemoveBestSellerProduct = (admin, product_id) => async (dispatch) => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("product_id", product_id);
    const result = await axios.post(
      `${API_BASE_URL}/admin_remove_bestseller_product`,
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

const addProduct = (admin, productData) => async (dispatch) => {
  try {
    let params = new FormData();
    params.append("owner_id", admin?.admin_id);
    params.append("product_name", productData.name);
    params.append("product_category", productData.category);
    params.append("product_description", productData.description);
    params.append("product_price", productData.price);
    params.append("product_image", productData.image);
    params.append("product_discount", productData.discount);
    const result = await axios.post(
      `${API_BASE_URL}/add_product`,
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
const editProduct = (admin, productData,product_id) => async (dispatch) => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("product_id", product_id);
    params.append("product_name", productData.name);
    params.append("product_category", productData.category);
    params.append("product_description", productData.description);
    params.append("product_price", productData.price);
    if(typeof productData.image == 'object') params.append("product_image", productData.image);
    params.append("product_discount", productData.discount);
    params.append("product_is_available", productData.isAvailable ? true : false);
    const result = await axios.post(
      `${API_BASE_URL}/admin_edit_product`,
      params,
      getHeaerConfig(admin.token)
    );
    return result.data;
  } catch (e) {
    if (e?.response?.status == 401) {
      dispatch({
        type: "SET_CURRENT_USER",
        payload: {},
      });
    }
    return null;
  }
};
const removeProduct = (admin,product_id) => async (dispatch) => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("product_id", product_id);
    const result = await axios.post(
      `${API_BASE_URL}/admin_remove_product`,
      params,
      getHeaerConfig(admin.token)
    );
    return result.data;
  } catch (e) {
    if (e?.response?.status == 401) {
      dispatch({
        type: "SET_CURRENT_USER",
        payload: {},
      });
    }
    return null;
  }
};
export {
  getFeaturedProducts,
  getProductByID,
  getNewArrivalProducts,
  getBestSellerProducts,
  getAllProducts,
  MakeFeaturedProduct,
  RemoveFeaturedProduct,
  MakeNewProduct,
  RemoveBestSellerProduct,
  MakeBestSellerProduct,
  RemoveNewProduct,
  addProduct,
  editProduct,
  removeProduct
};
