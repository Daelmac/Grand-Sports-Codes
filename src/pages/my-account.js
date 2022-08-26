import Link from "next/link";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Container, Row, Col } from "react-bootstrap";
import { FaCloudDownloadAlt, FaRegEdit } from "react-icons/fa";
import { LayoutTwo } from "../components/Layout";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { connect } from "react-redux";
import { updateCustomerAddress } from "../api/userApi";
import {showCustomerPurchases} from "../api/orderApi"
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import Router from "next/router";
import { useEffect,useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { update_address, setCurrentUser } from "../redux/actions/userActions";

const MyAccount = ({ userDetails, update_address, setCurrentUser }) => {
  const PhoneRegX = /^([+]\d{2})?\d{10}$/;
  const PincodRegX = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  if (!(userDetails && userDetails.role === "customer"))
    Router.push("/login-register");
  else
  console.log("cartData",JSON.parse(userDetails.cart_data))
  let address=null
  if (userDetails?.address) address = JSON.parse(userDetails?.address);


  const [addressEditMode, setAddressEditMode] = useState(false);
  const [addressDetails, setAddressDetails] = useState(
    address || {
      name: "",
      phone: "",
      address_line_1: "",
      address_line_2: "",
      country: "",
      city: "",
      state: "",
      pincode: "",
    }
  );
  const [AddressDetailsError, setAddressDetailsError] = useState({
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
  const [purchaseDetails, setPurchaseDetails] = useState(null)
  useEffect(async () => {
    console.log("localStorage.getItem('persist:primary')",JSON.parse(JSON.parse(localStorage.getItem('persist:primary')).currentUserData).token)
    const purchaseData = await dispatch(showCustomerPurchases(userDetails));
    if (purchaseData) {
      setPurchaseDetails(purchaseData);
    } else {
      addToast("Some problem occurred,please try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, []);
  const handleAddressDataChange = async (event) => {
    initAddressDetailsValidation();
    const { name, value } = event.target;
    setAddressDetails({ ...addressDetails, [name]: value });
  };
  const onAddressDetailsSubmit = async (event) => {
    event.preventDefault();
    if (AddressDetailsValidation()) {
      let address = JSON.stringify(addressDetails);
      const response = await dispatch(
        updateCustomerAddress(userDetails, address)
      );
      if (response) {
        if (response.status === "success") {
          // authenticateAdmin()
          // addToast("Address updated Successfully", {
          //   appearance: "success",
          //   autoDismiss: true,
          // });
          update_address(address, addToast);
          setAddressEditMode(false);
        } else {
          setAddressDetailsError({
            ...AddressDetailsError,
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
  const initAddressDetailsValidation = () => {
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
    setAddressDetailsError(errors);
  };
  const AddressDetailsValidation = () => {
    let errors = {};
    let isValid = true;
    if (!addressDetails["name"]) {
      isValid = false;
      errors["nameErrMsg"] = "Please enter name.";
    }
    if (typeof addressDetails["phone"] !== "undefined") {
      if (!PhoneRegX.test(addressDetails["phone"])) {
        isValid = false;
        errors["phoneErrMsg"] = "Please enter valid phone number.";
      }
    }
    if (!addressDetails["phone"]) {
      isValid = false;
      errors["phoneErrMsg"] = "Please enter phone number.";
    }
    if (!addressDetails["address_line_1"]) {
      isValid = false;
      errors["address_line_1ErrMsg"] = "Please enter address line 1.";
    }
    if (!addressDetails["address_line_2"]) {
      isValid = false;
      errors["address_line_2ErrMsg"] = "Please enter address line 2.";
    }
    if (!addressDetails["country"]) {
      isValid = false;
      errors["countryErrMsg"] = "Please choose country.";
    }
    if (!addressDetails["city"]) {
      isValid = false;
      errors["cityErrMsg"] = "Please enter city.";
    }
    if (!addressDetails["state"]) {
      isValid = false;
      errors["stateErrMsg"] = "Please enter state.";
    }
    if (typeof addressDetails["pincode"] !== "undefined") {
      if (!PincodRegX.test(addressDetails["pincode"])) {
        isValid = false;
        errors["pincodeErrMsg"] = "Please enter valid pincode.";
      }
    }
    if (!addressDetails["pincode"]) {
      isValid = false;
      errors["pincodeErrMsg"] = "Please enter pincode.";
    }
    setAddressDetailsError(errors);
    return isValid;
  };
  const handleLogout = (e) => {
    e.preventDefault();
    setCurrentUser({}, addToast);
    Router.push("/login-register");
  };
  return (
    <LayoutTwo aboutOverlay={false}>
      {/* breadcrumb */}
      {/* <BreadcrumbOne
        pageTitle="My Account"
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-2.jpg"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>My Account</li>
        </ul>
      </BreadcrumbOne> */}
      <div className="my-account-area mt-5 space-mb--r130">
        <Container>
          <Tab.Container defaultActiveKey="dashboard">
            <Nav
              variant="pills"
              className="my-account-area__navigation space-mb--r60"
            >
              <Nav.Item>
                <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orders">Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="address">Address</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="accountDetails">Account Details</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="dashboard">
                <div className="my-account-area__content">
                  <h3>Dashboard</h3>
                  <div className="welcome">
                    <p>
                      Hello, <strong>{userDetails.user_name}</strong>
                    </p>
                  </div>
                  <p>
                    From your account dashboard. you can easily check &amp; view
                    your recent orders, manage your shipping and billing
                    addresses and edit your password and see account details.
                  </p>
                </div>
                <button
                  className="lezada-button lezada-button--small mt-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Tab.Pane>
              <Tab.Pane eventKey="orders">
              <div className="my-account-area__content">
                  <h3>My Orders</h3>
                {
                  purchaseDetails?.map(purchase=>(
                    <div className="my-cart-wrp mt-2">
                  <div className="heading">
                    <span>
                      Recipes ID: <em>{purchase?.receipt_id}</em>
                    </span>
                    <span>
                      Total Amount: <em>&#8377;{purchase?.receipt_total}</em>
                    </span>
                    <span>
                      Order Date: <em>{new Date(purchase?.date).toLocaleDateString("en-IN", {timeZone: 'Asia/Kolkata'})}</em>
                    </span>
                  </div>
                  {purchase.orders?.map(order=>(
                    <div>
                    <Accordion>
                      <Card>
                        <Card.Header className="p-2s">
                          <div className="order-list-wrp">
                            <span>
                              Order ID: <em>{order.id}</em>
                            </span>
                            <div className="order-list-item-desc">
                              <div className="pro-img">
                                  <span>
                                    <img src={process.env.API_URL+order.product.product_image} />
                                  </span>
                                  <div className="pro-name">
                                  {/* <h5>Product Name</h5> */}
                                  <p>{order.product.name}</p>
                                </div>
                              </div>
                              <div className="d-flex">
                              <div className="pro-qut">
                                <h5>Quantity</h5>
                                <p className="font-weight-bold">{order.quantity}</p>
                              </div>
                              <div className="pro-status">
                                <h5>Status</h5>
                                {order.order_status == "Pending"?<p className="pending-text">{order.order_status}</p>:null}
                                {order.order_status == "Confirmed"?<p className="confirm-text">{order.order_status}</p>:null}
                                {order.order_status == "Shipped"?<p className="shipped-text">{order.order_status}</p>:null}
                                {order.order_status == "Delivered"?<p className="delivered-text">{order.order_status}</p>:null}
                                {order.order_status == "Cancelled"?<p className="cancelled-text">{order.order_status}</p>:null}
                                {/* <p>{order.order_status}</p> */}
                              </div>
                              <div className="pro-total">
                                <h5>Order Amount</h5>
                                <p className="font-weight-bold">&#8377;{order.total_amount}</p>
                              </div>
                              <Accordion.Toggle
                                as={Button}
                                variant="link"
                                eventKey="0"
                              >
                                More info
                              </Accordion.Toggle>
                            </div>
                            </div>
                          </div>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <div className="order-list-item-desc more_details_order">
                              <div className="pro-total">
                                {/* <h5>Address</h5> */}
                                <address>
                                  <p>
                                    <strong>{order?.name}</strong>
                                  </p>
                                  <p>
                                    {JSON.parse(order.address)?.address_line_1},{" "}
                                    {JSON.parse(order.address)?.address_line_2} <br />
                                    {JSON.parse(order.address)?.city}, {JSON.parse(order.address)?.state},{JSON.parse(order.address)?.country}-
                                    {JSON.parse(order.address)?.pincode}
                                  </p>
                                  <p>Mobile: {order?.phone}</p>
                             </address>
                              </div>
                              {
                                (order.order_status == "Shipped" || order.order_status == "Delivered")?
                                <div className="delevary_patner">
                                <div className="pro-total mb-2">
                                  <h5>Delivery Partner</h5>
                                  <p className="font-weight-bold">{order?.order_delivery_partner}</p>
                                </div>
                                <div className="pro-total">
                                  <h5>Tracking ID</h5>
                                  <p className="font-weight-bold">{order?.order_tracking_id}</p>
                                </div>
                              </div>:<div></div>
                              }
                              <button className="lezada-button lezada-button--small">
                                Cancel Order
                              </button>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                  ))}
                  
                </div>
                  ))
                }
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="address">
                <div className="my-account-area__content">
                  <h3>Billing Address</h3>
                  {addressEditMode ? (
                    <div className="lezada-form">
                      <form className="checkout-form">
                        <div className="row row-40">
                          <div className="col-lg-7 space-mb--20">
                            {/* Billing Address */}
                            <div id="billing-form" className="space-mb--40">
                              <div className="row">
                                <div className="col-md-6 col-12 space-mb--20">
                                  <label>Name*</label>
                                  <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={addressDetails.name}
                                    onChange={handleAddressDataChange}
                                  />
                                  <span className="error-text">
                                    {AddressDetailsError.nameErrMsg}
                                  </span>
                                </div>

                                <div className="col-md-6 col-12 space-mb--20">
                                  <label>Phone no*</label>
                                  <input
                                    type="text"
                                    placeholder="Phone number"
                                    name="phone"
                                    value={addressDetails.phone}
                                    onChange={handleAddressDataChange}
                                  />
                                  <span className="error-text">
                                    {AddressDetailsError.phoneErrMsg}
                                  </span>
                                </div>
                                <div className="col-12 space-mb--20">
                                  <label>Address*</label>
                                  <input
                                    type="text"
                                    placeholder="Address line 1"
                                    name="address_line_1"
                                    value={addressDetails.address_line_1}
                                    onChange={handleAddressDataChange}
                                  />
                                  <span className="error-text">
                                    {AddressDetailsError.address_line_1ErrMsg}
                                  </span>
                                  <input
                                    type="text"
                                    placeholder="Address line 2"
                                    name="address_line_2"
                                    value={addressDetails.address_line_2}
                                    onChange={handleAddressDataChange}
                                  />
                                  <span className="error-text">
                                    {AddressDetailsError.address_line_2ErrMsg}
                                  </span>
                                </div>
                                <div className="col-md-6 col-12 space-mb--20">
                                  <label>Country*</label>
                                  <select
                                    name="country"
                                    value={addressDetails.country}
                                    onChange={handleAddressDataChange}
                                  >
                                    <option value="Bangladesh">
                                      Bangladesh
                                    </option>
                                    <option value="China">China</option>
                                    <option value="Australia">Australia</option>
                                    <option value="India">India</option>
                                    <option value="Japan">Japan</option>
                                  </select>
                                  <span className="error-text">
                                    {AddressDetailsError.countryErrMsg}
                                  </span>
                                </div>
                                <div className="col-md-6 col-12 space-mb--20">
                                  <label>Town/City*</label>
                                  <input
                                    type="text"
                                    placeholder="Town/City"
                                    name="city"
                                    value={addressDetails.city}
                                    onChange={handleAddressDataChange}
                                  />
                                  <span className="error-text">
                                    {AddressDetailsError.cityErrMsg}
                                  </span>
                                </div>
                                <div className="col-md-6 col-12 space-mb--20">
                                  <label>State*</label>
                                  <input
                                    type="text"
                                    placeholder="State"
                                    name="state"
                                    value={addressDetails.state}
                                    onChange={handleAddressDataChange}
                                  />
                                  <span className="error-text">
                                    {AddressDetailsError.stateErrMsg}
                                  </span>
                                </div>
                                <div className="col-md-6 col-12 space-mb--20">
                                  <label>Zip Code*</label>
                                  <input
                                    type="text"
                                    placeholder="Zip Code"
                                    name="pincode"
                                    value={addressDetails.pincode}
                                    onChange={handleAddressDataChange}
                                  />
                                  <span className="error-text">
                                    {AddressDetailsError.pincodeErrMsg}
                                  </span>
                                </div>
                                <span className="error-text">
                                  {AddressDetailsError.serverErrMsg}
                                </span>
                                <button
                                  className="cancel-btn mr-2"
                                  onClick={() => setAddressEditMode(false)}
                                >
                                  cancel
                                </button>
                                <button
                                  className="lezada-button lezada-button--medium"
                                  onClick={onAddressDetailsSubmit}
                                >
                                  {address ? "Edit" : "Add"} Address
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <>
                      {address ? (
                        <address>
                          <p>
                            <strong>{addressDetails?.name}</strong>
                          </p>
                          <p>
                            {addressDetails?.address_line_1},{" "}
                            {addressDetails?.address_line_2} <br />
                            {addressDetails?.city}, {addressDetails?.state},{addressDetails?.country}-
                            {addressDetails?.pincode}
                          </p>
                          <p>Mobile: {addressDetails?.phone}</p>
                        </address>
                      ) : null}
                      <a
                        href="#"
                        className="check-btn sqr-btn "
                        onClick={() => setAddressEditMode(true)}
                      >
                        <FaRegEdit />
                        {address ? "Edit" : "Add"} Address
                      </a>
                    </>
                  )}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="accountDetails">
                <div className="my-account-area__content">
                  <h3>Account Details</h3>
                  <div className="account-details-form">
                    <form>
                      <Row>
                        <Col lg={6}>
                          <div className="single-input-item">
                            <label htmlFor="first-name" className="required">
                              First Name
                            </label>
                            <input type="text" id="first-name" />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="single-input-item">
                            <label htmlFor="last-name" className="required">
                              Last Name
                            </label>
                            <input type="text" id="last-name" />
                          </div>
                        </Col>
                      </Row>
                      <div className="single-input-item">
                        <label htmlFor="display-name" className="required">
                          Display Name
                        </label>
                        <input type="text" id="display-name" />
                      </div>
                      <div className="single-input-item">
                        <label htmlFor="email" className="required">
                          Email Address
                        </label>
                        <input type="email" id="email" />
                      </div>
                      <fieldset>
                        <legend>Password change</legend>
                        <div className="single-input-item">
                          <label htmlFor="current-pwd" className="required">
                            Current Password
                          </label>
                          <input type="password" id="current-pwd" />
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="single-input-item">
                              <label htmlFor="new-pwd" className="required">
                                New Password
                              </label>
                              <input type="password" id="new-pwd" />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="single-input-item">
                              <label htmlFor="confirm-pwd" className="required">
                                Confirm Password
                              </label>
                              <input type="password" id="confirm-pwd" />
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <div className="single-input-item">
                        <button>Save Changes</button>
                      </div>
                    </form>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </div>
    </LayoutTwo>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.currentUserData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    update_address: (address, addToast) => {
      dispatch(update_address(address, addToast));
    },
    setCurrentUser: (user, addToast) => {
      dispatch(setCurrentUser(user, addToast));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
