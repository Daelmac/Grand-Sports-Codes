import axioss from "../pages/axiosConfig"
import {getAuthConfig} from "../core/utils"

const getFeaturedProducts = async () => {
  try {
    const result = await axioss.get(`/featured_products`);
    return result?result.data["featured_products"]:null;
  } catch (e) {
    return null;
  }
};
const getNewArrivalProducts = async () => {
  try {
    const result = await axioss.get(`/new_products`);
    return result?result.data["new_products"]:null;
  } catch (e) {
    console.log(e.response);
    return null
  }
};
const getBestSellerProducts = async () => {
  try {
    const result = await axioss.get(`/best_seller_products`);
    return result?result.data["best_seller_products"]:null;
  } catch (e) {
    console.log(e.response);
    return null
  }
};
const getProductByID = async (id) => {
  try {
    var params = new FormData();
    params.append("product_id", id);
    const result = await axioss.post(`/single_product`, params);
    return result?result.data:null;
  } catch (e) {
    console.log(e.response);
    return null
  }
};
const getAllProducts = async () => {
  try {
    const result = await axioss.get(`/all_products`);
    return result?result.data["product_data"]:null;
  } catch (e) {
    console.log(e.response);
    return null
  }
};

const MakeFeaturedProduct = async(admin, product_id)  => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("product_id", product_id);
    const result = await axioss.post(
      `/admin_make_featured_product`,
      params,
      getAuthConfig()
    );
    return result?result.data:null;
  } catch (e) {
    return null;
  }
};
const RemoveFeaturedProduct = async(admin, product_id)  => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("product_id", product_id);
    const result = await axioss.post(
      `/admin_remove_featured_product`,
      params,
      getAuthConfig()
    );
    return result?result.data:null;
  } catch (e) {
    return null;
  }
};
const MakeNewProduct = async(admin, product_id)  => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("product_id", product_id);
    const result = await axioss.post(
      `/admin_make_new_product`,
      params,
      getAuthConfig()
    );
    return result?result.data:null;
  } catch (e) {
    return null;
  }
};
const RemoveNewProduct = async(admin, product_id) => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("product_id", product_id);
    const result = await axioss.post(
      `/admin_remove_new_product`,
      params,
      getAuthConfig()
    );
    return result?result.data:null;
  } catch (e) {
    return null;
  }
};
const MakeBestSellerProduct = async(admin, product_id)  => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("product_id", product_id);
    const result = await axioss.post(
      `/admin_make_bestseller_product`,
      params,
      getAuthConfig()
    );
    return result?result.data:null;
  } catch (e) {
    return null;
  }
};
const RemoveBestSellerProduct = async(admin, product_id)  => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("product_id", product_id);
    const result = await axioss.post(
      `/admin_remove_bestseller_product`,
      params,
      getAuthConfig()
    );
    return result?result.data:null;
  } catch (e) {
    return null;
  }
};

const addProduct = async(admin, productData) =>  {
  try {
    let params = new FormData();
    params.append("owner_id", admin?.admin_id);
    params.append("product_name", productData.name);
    params.append("product_category", productData.category);
    params.append("product_description", productData.description);
    params.append("product_price", productData.price);
    params.append("product_image", productData.image);
    params.append("product_discount", productData.discount);
    const result = await axioss.post(
      `/add_product`,
      params,
      getAuthConfig()
    );
     return result?result.data:null;
  } catch (e) {
    return null;
  }
};
const editProduct = async(admin, productData,product_id) =>  {
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
    const result = await axioss.post(
      `/admin_edit_product`,
      params,
      getAuthConfig()
    );
    return result?result.data:null;
  } catch (e) {
    return null;
  }
};
const removeProduct = async(admin,product_id) => {
  try {
    let params = new FormData();
    params.append("admin_id", admin?.admin_id);
    params.append("product_id", product_id);
    const result = await axioss.post(
      `/admin_remove_product`,
      params,
      getAuthConfig()
    );
    return result?result.data:null;
  } catch (e) {
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
