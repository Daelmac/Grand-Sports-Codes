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
                  title="Pricing"
                  subtitle="COME HAVE A LOOK"
                />
              </Col>
            </Row>
            <Row className="space-mb-mobile-only--m50">
              <p style={{textAlign:"center"}}>

              We price our products based on the M.R.P but on some occasions we do give discounts.
.<br/><br/>
</p>
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
