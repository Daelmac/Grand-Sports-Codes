import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AdminLayout } from "../../../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { LightgalleryProvider } from "react-lightgallery";
import { MdEdit } from "react-icons/md";
import { PRODUCT_CATEGORIES } from "../../../core/utils";
import { connect } from "react-redux";
import {
  addProduct,
  getProductByID,
  editProduct,
} from "../../../api/productApi";
import { useToasts } from "react-toast-notifications";
import Router from "next/router";
import { NumericRegX } from "../../../core/utils";

const Product = ({ userDetails }) => {
  const router = useRouter();
  const { addToast } = useToasts();
  const { id } = router.query;

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    discount: "",
    image: "",
    description: "",
    isAvailable: null,
  });
  const [productErrors, setproductErrors] = useState({
    nameErrMsg: "",
    categoryErrMsg: "",
    priceErrMsg: "",
    discountErrMsg: "",
    imageErrMsg: "",
    descriptionErrMsg: "",
    serverErrMsg: "",
  });

  //get single product data id it's in edit mode
  useEffect(async () => {
    if (id != "add") {
      const single_product = await getProductByID(id);
      if (single_product) {
        setProductData(single_product);
      } else {
        addToast("Some problem occurred,please try again.", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  }, []);

  //set product data
  const setProductData = (single_product) => {
    let productData = {
      name: single_product.product_name,
      category: single_product.product_category,
      price: single_product.product_price,
      discount: single_product.product_discount,
      image: single_product.product_image,
      description: single_product.product_description,
      isAvailable: single_product.product_is_available,
    };
    setProduct(productData);
  };

  //initalize black object of product
  const initProduct = () => {
    let productBlank = {
      name: "",
      category: "",
      price: "",
      discount: "",
      image: "",
      description: "",
    };
    setProduct(productBlank);
    initProductValidation();
  };

  //handle form data change
  const handleProductDataChange = async (event) => {
    initProductValidation();
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  //on product image change
  const onImageChange = (event) => {
    initProductValidation();
    let image = event.target.files[0];
    setProduct({ ...product, ["image"]: image });
  };

  //on product data submit button click
  const onProductSubmit = async (event) => {
    event.preventDefault();
    if (ProductValidation()) {
      if (id == "add") {
        const response = await addProduct(userDetails, product);
        if (response) {
          if (response.status === "success") {
            addToast("Product Added Successfully", {
              appearance: "success",
              autoDismiss: true,
            });
            Router.push("/admin/products/all");
          } else {
            setproductErrors({
              ...productErrors,
              serverErrMsg: response.status_message,
            });
          }
        } else {
          addToast("Some problem occurred,please try again.", {
            appearance: "error",
            autoDismiss: true,
          });
          initProduct();
        }
      } else {
        const response = await editProduct(userDetails, product, id);
        if (response) {
          if (response.status === "success") {
            addToast("Product edited Successfully", {
              appearance: "success",
              autoDismiss: true,
            });
            Router.push("/admin/products/all");
          } else {
            setproductErrors({
              ...productErrors,
              serverErrMsg: response.status_message,
            });
          }
        } else {
          addToast("Some problem occurred,please try again.", {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    }
  };

  //on cancel button redirect to product page.
  const onCancel = (event) => {
    event.preventDefault();
    if (id == "add") initProduct();
    else console.log("Cancelled");
  };

  //initialize error message
  const initProductValidation = () => {
    const errors = {
      nameErrMsg: "",
      categoryErrMsg: "",
      priceErrMsg: "",
      discountErrMsg: "",
      imageErrMsg: "",
      descriptionErrMsg: "",
      serverErrMsg: "",
    };
    setproductErrors(errors);
  };

  //manage product data validation
  const ProductValidation = () => {
    let errors = {};
    let isValid = true;
    if (!product["name"]) {
      isValid = false;
      errors["nameErrMsg"] = "Please enter product name.";
    }
    if (!product["category"]) {
      isValid = false;
      errors["categoryErrMsg"] = "Please enter product category.";
    }
    if (typeof product["price"] !== "undefined") {
      if (!NumericRegX.test(product["price"])) {
        isValid = false;
        errors["priceErrMsg"] = "Please enter valid price.";
      }
    }
    if (!product["price"]) {
      isValid = false;
      errors["priceErrMsg"] = "Please enter product price(INR).";
    }
    if (typeof product["discount"] !== "undefined") {
      alert("regr");
      if (
        !NumericRegX.test(product["discount"]) ||
        parseInt(product["discount"]) > 100
      ) {
        isValid = false;
        errors["discountErrMsg"] = "Please enter valid discount(%).";
      }
    }
    if (!product["image"]) {
      isValid = false;
      errors["imageErrMsg"] = "Please choose product image.";
    }
    if (!product["description"] || product["description"].length < 12) {
      isValid = false;
      errors["descriptionErrMsg"] =
        "Product description must be at least 12 characters.";
    }
    setproductErrors(errors);
    return isValid;
  };
  return (
    <AdminLayout title={id == "add" ? "Add Product" : "Edit Product"}>
      <Container>
        <Row>
          <Col lg={6} className="space-mb-mobile-only--50 mt-5">
            {/* image gallery bottom thumb */}
            <div>
              {product.image ? (
                <LightgalleryProvider>
                  <div className="image-box">
                    <div
                      className="single-image"
                      style={{ textAlign: "center" }}
                    >
                      <img
                        src={
                          typeof product["image"] == "object"
                            ? URL.createObjectURL(product.image)
                            : process.env.API_URL + product.image
                        }
                        className="img-fluid"
                        alt=""
                        style={{ maxHeight: "300px", width: "auto" }}
                      />
                    </div>
                  </div>
                </LightgalleryProvider>
              ) : (
                <div className="no-image-box">
                  <span>No product image</span>
                </div>
              )}
            </div>
            <div className="edit-image-button-box">
              <MdEdit />
              <input
                type="file"
                name="image"
                accept="image/x-png,image/jpeg"
                onChange={onImageChange}
              />
            </div>
            <span className="error-text">{productErrors.imageErrMsg}</span>
          </Col>

          <Col lg={6}>
            <div className="lezada-form login-form--register">
              <form>
                <Row>
                  <Col lg={12} className="space-mb--30">
                    <label htmlFor="ProductName">
                      Product Name <span className="required">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      id="ProductName"
                      name="name"
                      value={product.name}
                      onChange={handleProductDataChange}
                    />
                    <span className="error-text">
                      {productErrors.nameErrMsg}
                    </span>
                  </Col>
                  <Col lg={12} className="space-mb--50">
                    <label htmlFor="productCategory">
                      Category <span className="required">*</span>{" "}
                    </label>
                    <select
                      class="custom-select"
                      id="productCategory"
                      name="category"
                      value={product.category}
                      onChange={handleProductDataChange}
                    >
                      <option value="">Choose Product Category</option>
                      {PRODUCT_CATEGORIES.map((category) => (
                        <option value={category}>{category}</option>
                      ))}
                    </select>
                    <span className="error-text">
                      {productErrors.categoryErrMsg}
                    </span>
                  </Col>
                  <Col lg={6} className="space-mb--30">
                    <label htmlFor="productPrice">
                      Price(INR) <span className="required">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      pattern="^\d+(?:\.\d{0,2})$"
                      id="productPrice"
                      name="price"
                      value={product.price}
                      onChange={handleProductDataChange}
                    />
                    <span className="error-text">
                      {productErrors.priceErrMsg}
                    </span>
                  </Col>
                  <Col lg={6} className="space-mb--30">
                    <label htmlFor="productDiscount">Discount(%)</label>
                    <input
                      type="text"
                      id="productDiscount"
                      name="discount"
                      value={product.discount}
                      onChange={handleProductDataChange}
                    />
                    <span className="error-text">
                      {productErrors.discountErrMsg}
                    </span>
                  </Col>
                  <Col lg={12} className="space-mb--50">
                    <label htmlFor="productAvailable">
                      Available <span className="required">*</span>{" "}
                    </label>
                    <select
                      class="custom-select"
                      id="productAvailable"
                      name="isAvailable"
                      value={product.isAvailable}
                      onChange={handleProductDataChange}
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </Col>
                  <Col md={12} className="space-mb--40">
                    <label htmlFor="productDescription">
                      Description <span className="required">*</span>{" "}
                    </label>
                    <textarea
                      cols={30}
                      rows={5}
                      name="description"
                      value={product.description}
                      id="productDescription"
                      onChange={handleProductDataChange}
                    />
                    <span className="error-text">
                      {productErrors.descriptionErrMsg}
                    </span>
                  </Col>
                  <span className="error-text ml-3 mb-3">
                    {productErrors.serverErrMsg}
                  </span>
                  <Col lg={12} className="text-center">
                    <button className="cancel-btn mr-2" onClick={onCancel}>
                      Reset
                    </button>
                    <button
                      className="lezada-button lezada-button--medium"
                      onClick={onProductSubmit}
                    >
                      {id == "add" ? "Add Product" : "Edit Product"}
                    </button>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};
const mapStateToProps = (state) => {
  return {
    userDetails: state.currentUserData,
  };
};
export default connect(mapStateToProps, null)(Product);
