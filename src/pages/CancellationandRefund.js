import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { IoIosPin, IoIosCall, IoIosMail, IoIosClock } from "react-icons/io";
import { LayoutTwo } from "../components/Layout";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { sendMessage } from "../api/messagesApi";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import { SectionTitleOne, SectionTitleTwo } from "../components/SectionTitle";
import { useState } from "react";
import { EmailRegX } from "../core/utils";

const Contact = ({ userDetails }) => {
  const { addToast } = useToasts();

  const [msg, setMsg] = useState({
    customerName: userDetails?.user_name || "",
    customerEmail: userDetails?.email || "",
    contactSubject: "",
    contactMessage: "",
  });

  const [msgErrors, setMsgErrors] = useState({
    customerNameErrMsg: "",
    customerEmailErrMsg: "",
    contactSubjectErrMsg: "",
    contactMessageErrMsg: "",
    serverErrMsg: "",
  });

  const intNewMsg = () => {
    let msgBlank = {
      customerName: "",
      customerEmail: "",
      contactSubject: "",
      contactMessage: "",
    };
    setMsg(msgBlank);
  };

  const handleMsgChange = async (event) => {
    initMsgValidation();
    const { name, value } = event.target;
    setMsg({ ...msg, [name]: value });
  };
  const initMsgValidation = () => {
    const errors = {
      customerNameErrMsg: "",
      customerEmailErrMsg: "",
      contactSubjectErrMsg: "",
      contactMessageErrMsg: "",
      serverErrMsg: "",
    };
    setMsgErrors(errors);
  };
  
  const onSendMessage = async (event) => {
    event.preventDefault();
    if (msgValidation()) {
      console.log(msg);
      const response = await sendMessage(msg);
      if (response) {
        if (response.status === "success") {
          addToast(response.status_message, {
            appearance: "success",
            autoDismiss: true,
          });
          intNewMsg();
        } else {
          addToast(response.status_message, {
            appearance: "error",
            autoDismiss: true,
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

  const msgValidation = () => {
    let errors = {};
    let isValid = true;
    if (!msg["customerName"]) {
      isValid = false;
      errors["customerNameErrMsg"] = "Please enter your name.";
    }
    if (!msg["customerEmail"]) {
      isValid = false;
      errors["customerEmailErrMsg"] = "Please enter your email Address.";
    }
    if (typeof msg["customerEmail"] !== "undefined") {
      if (!EmailRegX.test(msg["customerEmail"])) {
        isValid = false;
        errors["customerEmailErrMsg"] = "Please enter valid email address.";
      }
    }
    if (!msg["contactSubject"]) {
      isValid = false;
      errors["contactSubjectErrMsg"] = "Please enter subject.";
    }
    if (!msg["contactMessage"]) {
      isValid = false;
      errors["contactMessageErrMsg"] = "Please enter message.";
    }
    setMsgErrors(errors);
    return isValid;
  };
  
  return (
    <LayoutTwo aboutOverlay={false}>
      {/* breadcrumb */}
   
      <div className="contact-page-content-wrapper">
        <div className="contact-page-top-info space-mb--r100">
          <Container>
            <Row>
              <Col lg={12}>
                <SectionTitleTwo
                  title="Cancellation and Refund"
                  subtitle="COME HAVE A LOOK"
                />
              </Col>
            </Row>
            <Row className="space-mb-mobile-only--m50">
              <p style={{textAlign:"center"}}><h4><u>Cancellation and Refund</u></h4><br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

Our Merchandise exchange offers you the choice to return things bought through our website in something like 3 days of the receipt of the item.We will reimburse You no later than 14 days from the day on which We receive the returned Goods. 
<br/><br/><h4><u>Conditions for return.</u></h4>
.<br/>
<h4><u>Cancellations</u></h4><br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;While there is no choice to drop the request as we process the orders in the span of 24 hours post request affirmation you can reach out to client care group for an undoing demand. We will drop the request on the off chance that the equivalent isn't sent from our distribution center. In such a case we will discount any installments previously made by you. Assuming we suspect any false exchange by any client or any exchange which challenges the terms and states of utilizing the site, we at our only watchfulness could drop such requests.

<br/>
<br/>
<h4><u>Items ought to be unused.</u></h4><br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Items ought to be returned in their unique bundling alongside unique sticker prices, marks, guidance sheets, and solicitations. (for example shoes should be pressed in the first shoe box too and returned), and ought not be broken or altered.

<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Client should self-transport the item to our store. We have no Opposite Get Office presently.
.<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Self Shipment cost ought to be brought about by the client.
<br/><br/>
<h4><u>Grand Sports.</u></h4><br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4, Anna Garden, Velachery Main Road 9842457070, Chennai, Tamil Nadu, Tamil Nadu 600042. 
<br/>
<br/>
<h4><u>Substitution/Trade Technique.</u></h4><br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kindly contact our client assistance for starting the substitution and send us the pictures/depictions of the harmed item. When our profits segment gets and confirms the item, we will set up for a substitution or a discount by and large.

Kindly note that we can't guarantee a trade for all items as it will rely upon the accessibility of the stock and substitution item. In such cases, we will offer just a discount.

<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Client should self-transport the item to our stockroom and self shipment cost to be brought about by the client. We give no Converse Get Office.
.<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Note:</b> Discount/substitution are acknowledged at the sole carefulness of thecricketstore.in. Assuming we find the objection certified, we will handle discount inside 25 working days.</p>
            </Row>
          </Container>
        </div>
        <br/>
        <br/>
        <div className="contact-page-map space-mb--r100">
        
        </div>
      
      </div>
    </LayoutTwo>
  );
};
const mapStateToProps = (state) => {
  return {
    userDetails: state.currentUserData,
  };
};
export default connect(mapStateToProps, null)(Contact);
