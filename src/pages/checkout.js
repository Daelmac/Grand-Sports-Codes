import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getDiscountPrice } from "../lib/product";
import { IoMdCash } from "react-icons/io";
import { LayoutTwo } from "../components/Layout";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { addPurchases } from "../api/orderApi";
import { useToasts } from "react-toast-notifications";
import Router from "next/router";
import { COUNTRY_LIST } from "../core/utils";
import { deleteAllFromCart } from "../redux/actions/cartActions.js";
import { PhoneRegX, PincodRegX } from "../core/utils";
import axios from "axios";
import { razorpayOrder, razorpayCallback } from "../api/paymentApi";

const Checkout = ({ cartItems, userDetails, deleteAllFromCart }) => {
  if (!(userDetails && userDetails.role === "customer"))
    Router.push("/login-register");
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  let address = null;
  if (userDetails?.address) address = JSON.parse(userDetails?.address);
  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });
  const [checkout, setCheckout] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: address?.name || "",
    phone: address?.phone || "",
    address_line_1: address?.address_line_1 || "",
    address_line_2: address?.address_line_2 || "",
    country: address?.country || "",
    city: address?.city || "",
    state: address?.state || "",
    pincode: address?.pincode || "",
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
  const onOrderDetailsSubmit = async (paymentData) => {
    if (OrderDetailsValidation()) {
      let total_receipt_amount = 0;
      const purchaseData = cartItems.map((product, i) => {
        const discountedPrice = getDiscountPrice(
          product?.product_price,
          product?.product_discount
        );
        total_receipt_amount += discountedPrice * product.quantity;
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
        total_receipt_amount: total_receipt_amount,
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_payment_signature: paymentData.razorpay_signature,
        purchases: purchaseData,
      };
      console.log(params);
      const response = await addPurchases(params);
      if (response) {
        if (response.status === "success") {
          addToast("Order Placed Successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          deleteAllFromCart();
          Router.push("/shop/all-products");
        } else {
          setOrderDetailsError({
            ...OrderDetailsError,
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

  // function loadRazorpayScript(src) {
  //   return new Promise((resolve) => {
  //       const script = document.createElement("script");
  //       script.src = src;
  //       script.onload = () => {
  //           resolve(true);
  //       };
  //       script.onerror = () => {
  //           resolve(false);
  //       };
  //       document.body.appendChild(script);
  //   });
  // }

  //function will get called when clicked on the pay button.
  async function displayRazorpayPaymentSdk(e) {
    e.preventDefault();
    //   console.log("in")
    //   const res = await loadRazorpayScript(
    //       "https://checkout.razorpay.com/v1/checkout.js"
    //   );
    //  console.log(res)
    //   if (!res) {
    //       alert("Razorpay SDK failed to load. please check are you online?");
    //       return;
    //   }
    //   console.log("in2")
    // creating a new order and sending order ID to backend
    var params = new FormData();
    params.append("name", userDetails?.username);
    params.append("amount", cartTotalPrice.toFixed(2));
    const result = await razorpayOrder(
      userDetails?.username,
      cartTotalPrice.toFixed(2)
    );

    if (!result || result?.status !== "success") {
      addToast("Server error. please check are you online?", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    // Getting the order details back
    const {
      merchantId = null,
      amount = null,
      currency = null,
      orderId = null,
    } = result.response;

    const options = {
      key: merchantId,
      amount: amount.toString(),
      currency: currency,
      name: "Grand Sports",
      // description: "Test Transaction",
      image: "/assets/images/grand_sports_logo.png",
      order_id: orderId,
      handler: async function (response) {
        console.log(response);
        const result = await razorpayCallback(response);
        console.log("ressss====>", result);
        if (result.status === "success" && result.is_verified) {
          onOrderDetailsSubmit(response);
        }
      },
      prefill: {
        name: userDetails?.username,
        email: userDetails?.email,
      },
      notes: {
        address: "None",
      },
      theme: {
        color: "#fc0027",
      },
    };
    console.log(options);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
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
            <h1 className="breadcrumb__title">
              {cartItems && cartItems.length >= 1 ? "Checkout" : ""}
            </h1>
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
                                <option value="">
                                  Please select a country
                                </option>
                                {COUNTRY_LIST.map((country) => (
                                  <option value={country} key={country}>
                                    {country}
                                  </option>
                                ))}
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
                            <button
                              className="lezada-button lezada-button--medium space-mt--20"
                              // onClick={onOrderDetailsSubmit}
                              onClick={displayRazorpayPaymentSdk}
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
                      as={process.env.PUBLIC_URL + "/shop/all-products"}
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
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
