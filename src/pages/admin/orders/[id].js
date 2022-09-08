import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AdminLayout } from "../../../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { LightgalleryProvider } from "react-lightgallery";
import { connect } from "react-redux";
import { getOrderDetailsByID,editOrderDetails } from "../../../api/orderApi";
import { useToasts } from "react-toast-notifications";
import Router from "next/router";

const Order = () => {
  const router = useRouter();
  const { addToast } = useToasts();
  const NumericRegX = /[0-9]*[.]?[0-9]+/;
  const { id } = router.query;

  useEffect(async () => {
    const orderData = await getOrderDetailsByID(id);
    if (orderData) {
      setOrderData(orderData);
    } else {
      addToast("Some problem occurred,please try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, []);
  const setOrderData = (orderData) => {
    console.log(orderData);
    let Order_Data = {
      order_status: orderData.order_status,
      order_tracking_id: orderData.order_tracking_id,
      order_delivery_partner: orderData.order_delivery_partner,
      address:JSON.parse(orderData?.address || '{}')
    };
    setOrderDetails(Order_Data);
    setAllOrderDetails(orderData);
  };
  const [orderDetails, setOrderDetails] = useState({
    order_status: "",
    order_tracking_id: "",
    order_delivery_partner: "",
    address:""
  });
  const [all_orderDetails, setAllOrderDetails] = useState(null);
  const [orderDetailsErrors, setOrderDetailsErrors] = useState({
    order_statusErrMsg: "",
    order_tracking_idErrMsg: "",
    order_delivery_partnerErrMsg: "",
    serverErrMsg: "",
  });
  const handleOrderDataChange = async (event) => {
    initOrderDetailsValidation();
    const { name, value } = event.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };
  const onOrderDataSubmit = async (event) => {
    event.preventDefault();
    if (OrderDetailsValidation()) {
        const response = await editOrderDetails(id,orderDetails);
        if(response){
        if (response.status === "success") {
          addToast("Order Details updated Successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          Router.push("/admin/orders/all");
        } else {
          setOrderDetailsErrors({
            ...orderDetailsErrors,
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
  const onCancel = (event) => {
    event.preventDefault();
    Router.push("/admin/orders/all");
  };
  const initOrderDetailsValidation = () => {
    const errors = {
      order_statusErrMsg: "",
      order_tracking_idErrMsg: "",
      order_delivery_partnerErrMsg: "",
      serverErrMsg: "",
    };
    setOrderDetailsErrors(errors);
  };
  const OrderDetailsValidation = () => {
    let errors = {};
    let isValid = true;
    if (!orderDetails["order_status"]) {
      isValid = false;
      errors["order_statusErrMsg"] = "Please select order status.";
    }
    if (
      (orderDetails["order_status"] == "Shipped" ||
        orderDetails["order_status"] == "Delivered") &&
      !orderDetails["order_tracking_id"]
    ) {
      isValid = false;
      errors["order_tracking_idErrMsg"] =
        "Please enter Order tracking tracking ID.";
    }
    if (
      (orderDetails["order_status"] == "Shipped" ||
        orderDetails["order_status"] == "Delivered") &&
      !orderDetails["order_delivery_partner"]
    ) {
      isValid = false;
      errors["order_delivery_partnerErrMsg"] =
        "Please enter Order tracking tracking ID.";
    }
    setOrderDetailsErrors(errors);
    return isValid;
  };
  return (
    <AdminLayout title="Order Details">
      <Container>
        <Row>
          <Col lg={12}>
            <div className="order_id">
              <div className="order_id_details">
                <h4>Order ID:</h4>
                <p>{all_orderDetails?.id}</p>
              </div>
              <div className="order_id_details">
                <h4>Date:</h4>
                <p>
                  {new Date(all_orderDetails?.date).toLocaleString("en-GB")}
                </p>
              </div>
            </div>
          </Col>
          <Col lg={6} className="space-mb-mobile-only--50 mt-5">
            {/* image gallery bottom thumb */}
            <div>
              <LightgalleryProvider>
                <div className="image-box">
                  <div className="single-image" style={{ textAlign: "center" }}>
                    <img
                      src={process.env.API_URL + all_orderDetails?.product?.product_image}
                      className="img-fluid"
                      alt=""
                      style={{ maxHeight: "300px", width: "auto" }}
                    />
                  </div>
                </div>
                <div className="product-details mt-3">
                  <ul>
                    <li>
                      <strong>Product ID:</strong>
                      <p>{all_orderDetails?.product?.id}</p>
                    </li>
                    <li>
                      <strong>Product Name:</strong>
                      <p>{all_orderDetails?.product?.name}</p>
                    </li>
                    <li>
                      <strong>Quantity:</strong>
                      <p>{all_orderDetails?.quantity}</p>
                    </li>
                  </ul>
                </div>
              </LightgalleryProvider>
            </div>
          </Col>

          <Col lg={6}>

            <div className="lezada-form login-form--register pt-4">
              <div className="product-details">
                <ul>
                  <li>
                    <strong>Receipt ID:</strong>
                    <p>{all_orderDetails?.receipt_id}</p>
                  </li>
                  <li>
                    <strong>Customer ID:</strong>
                    <p>{all_orderDetails?.customer_id}</p>
                  </li>
                  <li>
                    <strong>Order Name:</strong>
                    <p>{all_orderDetails?.name}</p>
                  </li>
                  <li>
                    <strong>Address:</strong>
                    <p>
                      <address>
                      <p>
                        {orderDetails?.address?.address_line_1},{" "}
                        {orderDetails?.address?.address_line_2} <br />
                        {orderDetails?.address?.city}, {orderDetails?.address?.state}-
                        {orderDetails?.address?.pincode}
                      </p>
                      </address>
                    </p>
                  </li>
                  <li>
                    <strong>Mobile:</strong>
                    <p>{all_orderDetails?.phone}</p>
                  </li>
                  <li>
                      <strong>Total Amount:</strong>
                      <p>&#8377;{all_orderDetails?.total_amount}</p>
                  </li>
                </ul>
              </div>
              <form>
                <Row>
                  <Col lg={12} className="space-mt--50">
                    <label htmlFor="orderStatus">
                      Order Status <span className="required">*</span>{" "}
                    </label>
                    <select
                      class="custom-select"
                      id="orderStatus"
                      name="order_status"
                      value={orderDetails.order_status}
                      onChange={handleOrderDataChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                    <span className="error-text">
                      {orderDetailsErrors.order_statusErrMsg}
                    </span>
                  </Col>
                  {orderDetails.order_status == "Shipped" ||
                  orderDetails.order_status == "Delivered" ? (
                    <>
                      <Col lg={12} className="space-mb--30">
                        <label htmlFor="orderPartner">
                          Order Delivery Partner{" "}
                          <span className="required">*</span>{" "}
                        </label>
                        <input
                          type="text"
                          id="orderPartner"
                          name="order_delivery_partner"
                          value={orderDetails.order_delivery_partner}
                          onChange={handleOrderDataChange}
                        />
                        <span className="error-text">
                          {orderDetailsErrors.order_delivery_partnerErrMsg}
                        </span>
                      </Col>
                      <Col lg={12} className="space-mb--30">
                        <label htmlFor="ordertrackingID">
                          Order Tracking ID<span className="required">*</span>{" "}
                        </label>
                        <input
                          type="text"
                          id="ordertrackingID"
                          name="order_tracking_id"
                          value={orderDetails.order_tracking_id}
                          onChange={handleOrderDataChange}
                        />
                        <span className="error-text">
                          {orderDetailsErrors.order_tracking_idErrMsg}
                        </span>
                      </Col>
                    </>
                  ) : null}

                  <span className="error-text ml-3 mb-3">
                    {orderDetailsErrors.serverErrMsg}
                  </span>
                  <Col lg={12} className="text-center">
                    <button className="cancel-btn mr-2" onClick={onCancel}>
                      cancel
                    </button>
                    <button
                      className="lezada-button lezada-button--medium"
                      onClick={onOrderDataSubmit}
                    >
                      Save
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
export default Order;
