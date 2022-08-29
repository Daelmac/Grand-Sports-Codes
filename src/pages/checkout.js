import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getDiscountPrice } from "../lib/product";
import { IoMdCash } from "react-icons/io";
import { LayoutTwo } from "../components/Layout";
import { BreadcrumbOne } from "../components/Breadcrumb";
import {addPurchases} from "../api/orderApi"
import { useToasts } from "react-toast-notifications";
import Router from "next/router";
import {
  deleteAllFromCart,
} from "../redux/actions/cartActions.js";

const Checkout = ({ cartItems, userDetails,deleteAllFromCart }) => {
  if (!(userDetails && userDetails.role === "customer"))
    Router.push("/login-register");
  let cartTotalPrice = 0;
  const PhoneRegX = /^([+]\d{2})?\d{10}$/;
  const PincodRegX = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
  const { addToast } = useToasts();
  let address=null
  if (userDetails?.address) address = JSON.parse(userDetails?.address);
  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });
  const [orderDetails, setOrderDetails] = useState({
    name: address?.name || "",
    phone:address?.phone || "",
    address_line_1:address?.address_line_1 || "",
    address_line_2:address?.address_line_2 ||"",
    country: address?.country || "",
    city:address?.city || "",
    state:address?.state || "",
    pincode:address?.pincode || "",
  });
  const [OrderDetailsError, setOrderDetailsError] = useState({
    nameErrMsg: "",
    phoneErrMsg: "",
    address_line_1ErrMsg: "",
    address_line_2ErrMsg: "",
    countryErrMsg: "",
    cityErrMsg: "",
    stateErrMsg: "",
    pincodeErrMsg: "",
    serverErrMsg: "",
  });

  const handleOrdertDataChange = async (event) => {
    initOrderDetailsValidation();
    const { name, value } = event.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };
  const onOrderDetailsSubmit = async (event) => {
    event.preventDefault();
    if (OrderDetailsValidation()) {
      let total_receipt_amount=0
      const purchaseData = cartItems.map((product, i) => {
        const discountedPrice = getDiscountPrice(
          product?.product_price,
          product?.product_discount
        );
        total_receipt_amount+= discountedPrice * product.quantity;
        cartTotalPrice = discountedPrice * product.quantity;
        return {
          owner_id: product.product_owner,
          product_id: product.product_id,
          product_quantity: product.quantity,
          total_amount: cartTotalPrice,
        };
      });
      let address = {
        address_line_1: orderDetails.address_line_1,
        address_line_2: orderDetails.address_line_2,
        city: orderDetails.city,
        state: orderDetails.state,
        country: orderDetails.country,
        pincode: orderDetails.pincode,
      };
      let params = {
        customer_id: userDetails.customer_id,
        contact_no: orderDetails.phone,
        name: orderDetails.name,
        address: JSON.stringify(address),
        total_receipt_amount:total_receipt_amount,
        purchases:purchaseData
      };
      console.log(params);
      const response = await addPurchases(params);
        if(response){
        if (response.status === "success") {
          // authenticateAdmin()
          addToast("Order Placed Successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          deleteAllFromCart()
          Router.push("/shop/all-products");
        } else {
          setOrderDetailsError({
            ...OrderDetailsError,
            serverErrMsg: response.status_message,
          });
        }
      }else{
        addToast("Some problem occurred,please try again.", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };
  const initOrderDetailsValidation = () => {
    const errors = {
      nameErrMsg: "",
      phoneErrMsg: "",
      address_line_1ErrMsg: "",
      address_line_2ErrMsg: "",
      countryErrMsg: "",
      cityErrMsg: "",
      stateErrMsg: "",
      pincodeErrMsg: "",
      serverErrMsg: "",
    };
    setOrderDetailsError(errors);
  };
  const OrderDetailsValidation = () => {
    let errors = {};
    let isValid = true;
    if (!orderDetails["name"]) {
      isValid = false;
      errors["nameErrMsg"] = "Please enter name.";
    }
    if (typeof orderDetails["phone"] !== "undefined") {
      if (!PhoneRegX.test(orderDetails["phone"])) {
        isValid = false;
        errors["phoneErrMsg"] = "Please enter valid phone number.";
      }
    }
    if (!orderDetails["phone"]) {
      isValid = false;
      errors["phoneErrMsg"] = "Please enter phone number.";
    }
    if (!orderDetails["address_line_1"]) {
      isValid = false;
      errors["address_line_1ErrMsg"] = "Please enter address line 1.";
    }
    if (!orderDetails["address_line_2"]) {
      isValid = false;
      errors["address_line_2ErrMsg"] = "Please enter address line 2.";
    }
    if (!orderDetails["country"]) {
      isValid = false;
      errors["countryErrMsg"] = "Please choose country.";
    }
    if (!orderDetails["city"]) {
      isValid = false;
      errors["cityErrMsg"] = "Please enter city.";
    }
    if (!orderDetails["state"]) {
      isValid = false;
      errors["stateErrMsg"] = "Please enter state.";
    }
    if (typeof orderDetails["pincode"] !== "undefined") {
      if (!PincodRegX.test(orderDetails["pincode"])) {
        isValid = false;
        errors["pincodeErrMsg"] = "Please enter valid pincode.";
      }
    }
    if (!orderDetails["pincode"]) {
      isValid = false;
      errors["pincodeErrMsg"] = "Please enter pincode.";
    }
    setOrderDetailsError(errors);
    return isValid;
  };
  return (
    <LayoutTwo aboutOverlay={false}>
      {/* breadcrumb */}
      {/* <BreadcrumbOne
        pageTitle="Checkout"
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Checkout</li>
        </ul>
      </BreadcrumbOne> */}
      <Container>
        <Row>
          <Col>
            <h1 className="breadcrumb__title">Checkout</h1>
          </Col>
        </Row>
      </Container>
      <div className="checkout-area mt-2 space-mb--r130">
        <Container>
          {cartItems && cartItems.length >= 1 ? (
            <Row>
              <Col>
                <div className="lezada-form">
                  <form className="checkout-form">
                    <div className="row row-40">
                      <div className="col-lg-7 space-mb--20">
                        {/* Billing Address */}
                        <div id="billing-form" className="space-mb--40">
                          <h4 className="checkout-title">Billing Address</h4>
                          <div className="row">
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Name*</label>
                              <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={orderDetails.name}
                                onChange={handleOrdertDataChange}
                              />
                              <span className="error-text">
                                {OrderDetailsError.nameErrMsg}
                              </span>
                            </div>
                            {/* <div className="col-md-6 col-12 space-mb--20">
                              <label>Last Name*</label>
                              <input type="text" placeholder="Last Name" />
                            </div> */}
                            {/* <div className="col-md-6 col-12 space-mb--20">
                              <label>Email Address*</label>
                              <input type="email" placeholder="Email Address" />
                            </div> */}
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Phone no*</label>
                              <input
                                type="text"
                                placeholder="Phone number"
                                name="phone"
                                value={orderDetails.phone}
                                onChange={handleOrdertDataChange}
                              />
                              <span className="error-text">
                                {OrderDetailsError.phoneErrMsg}
                              </span>
                            </div>
                            {/* <div className="col-12 space-mb--20">
                              <label>Company Name</label>
                              <input type="text" placeholder="Company Name" />
                            </div> */}
                            <div className="col-12 space-mb--20">
                              <label>Address*</label>
                              <input
                                type="text"
                                placeholder="Address line 1"
                                name="address_line_1"
                                value={orderDetails.address_line_1}
                                onChange={handleOrdertDataChange}
                              />
                              <span className="error-text">
                                {OrderDetailsError.address_line_1ErrMsg}
                              </span>
                              <input
                                type="text"
                                placeholder="Address line 2"
                                name="address_line_2"
                                value={orderDetails.address_line_2}
                                onChange={handleOrdertDataChange}
                              />
                              <span className="error-text">
                                {OrderDetailsError.address_line_2ErrMsg}
                              </span>
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Country*</label>
                              <select
                                name="country"
                                value={orderDetails.country}
                                onChange={handleOrdertDataChange}
                              >
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="China">China</option>
                                <option value="Australia">Australia</option>
                                <option value="India">India</option>
                                <option value="Japan">Japan</option>
                              </select>
                              <span className="error-text">
                                {OrderDetailsError.countryErrMsg}
                              </span>
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Town/City*</label>
                              <input
                                type="text"
                                placeholder="Town/City"
                                name="city"
                                value={orderDetails.city}
                                onChange={handleOrdertDataChange}
                              />
                              <span className="error-text">
                                {OrderDetailsError.cityErrMsg}
                              </span>
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>State*</label>
                              <input
                                type="text"
                                placeholder="State"
                                name="state"
                                value={orderDetails.state}
                                onChange={handleOrdertDataChange}
                              />
                              <span className="error-text">
                                {OrderDetailsError.stateErrMsg}
                              </span>
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Zip Code*</label>
                              <input
                                type="text"
                                placeholder="Zip Code"
                                name="pincode"
                                value={orderDetails.pincode}
                                onChange={handleOrdertDataChange}
                              />
                              <span className="error-text">
                                {OrderDetailsError.pincodeErrMsg}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="row">
                          {/* Cart Total */}
                          <div className="col-12 space-mb--50">
                            <h4 className="checkout-title">Cart Total</h4>
                            <div className="checkout-cart-total">
                              <h4>
                                Product <span>Total</span>
                              </h4>
                              <ul>
                                {cartItems.map((product, i) => {
                                  const discountedPrice = getDiscountPrice(
                                    product?.product_price,
                                    product?.product_discount
                                  );

                                  cartTotalPrice +=
                                    discountedPrice * product.quantity;
                                  return (
                                    <li key={i}>
                                      {product.product_name} X{" "}
                                      {product.quantity}{" "}
                                      <span>
                                        &#8377;
                                        {(
                                          discountedPrice * product.quantity
                                        ).toFixed(2)}
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                              <p>
                                Sub Total{" "}
                                <span>&#8377;{cartTotalPrice.toFixed(2)}</span>
                              </p>
                              <p>
                                Shipping Fee <span>&#8377;00.00</span>
                              </p>
                              <h4>
                                Grand Total{" "}
                                <span>&#8377;{cartTotalPrice.toFixed(2)}</span>
                              </h4>
                            </div>
                          </div>
                          {/* Payment Method */}
                          <div className="col-12">
                            {/* <h4 className="checkout-title">Payment Method</h4>
                            <div className="checkout-payment-method">
                              <div className="single-method">
                                <input
                                  type="radio"
                                  id="payment_check"
                                  name="payment-method"
                                  defaultValue="check"
                                />
                                <label htmlFor="payment_check">
                                  Check Payment
                                </label>
                              </div>
                              <div className="single-method">
                                <input
                                  type="radio"
                                  id="payment_bank"
                                  name="payment-method"
                                  defaultValue="bank"
                                />
                                <label htmlFor="payment_bank">
                                  Direct Bank Transfer
                                </label>
                              </div>
                              <div className="single-method">
                                <input
                                  type="radio"
                                  id="payment_cash"
                                  name="payment-method"
                                  defaultValue="cash"
                                />
                                <label htmlFor="payment_cash">
                                  Cash on Delivery
                                </label>
                              </div>
                              <div className="single-method">
                                <input
                                  type="radio"
                                  id="payment_paypal"
                                  name="payment-method"
                                  defaultValue="paypal"
                                />
                                <label htmlFor="payment_paypal">Paypal</label>
                              </div>
                              <div className="single-method">
                                <input
                                  type="radio"
                                  id="payment_payoneer"
                                  name="payment-method"
                                  defaultValue="payoneer"
                                />
                                <label htmlFor="payment_payoneer">
                                  Payoneer
                                </label>
                              </div>
                              <div className="single-method">
                                <input type="checkbox" id="accept_terms" />
                                <label htmlFor="accept_terms">
                                  I’ve read and accept the terms &amp;
                                  conditions
                                </label>
                              </div>
                            </div> */}
                            <button
                              className="lezada-button lezada-button--medium space-mt--20"
                              onClick={onOrderDetailsSubmit}
                            >
                              Place order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon space-mb--30">
                    <IoMdCash />
                  </div>
                  <div className="item-empty-area__text">
                    <p className="space-mb--30">
                      No items found in cart to checkout
                    </p>
                    <Link
                      href="/shop/all-products"
                      // as={process.env.PUBLIC_URL + "/shop/all-products"}
                    >
                      <a className="lezada-button lezada-button--medium">
                        Shop Now
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </LayoutTwo>
  ); 
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    userDetails: state.currentUserData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    }
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
