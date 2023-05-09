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
                  title="Privacy Policy"
                  subtitle="COME HAVE A LOOK"
                />
              </Col>
            </Row>
            <Row className="space-mb-mobile-only--m50">
              <p style={{textAlign:"center"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We do not share any specifically recognizing data freely or with outsiders, aside from when expected to by regulation.<br/><br/>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We just hold gathered data however long important to furnish you with your mentioned administration. What information we store, we will safeguard inside industrially satisfactory means to forestall misfortune and robbery, as well as unapproved access, revelation, duplicating, use or alteration.
<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Our application might connection to outside destinations that are not worked by us. If it's not too much trouble, know that we have zero command over the substance and practices of these locales, and can't acknowledge liability or obligation for their separate protection approaches.<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You are allowed to reject our solicitation for your own data, with the comprehension that we might not be able to give you a portion of your ideal administrations.<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your proceeded with utilization of our application will be viewed as acknowledgment of our practices around protection and individual data. If you have any inquiries regarding how we handle client information and individual data, go ahead and reach us.</p>
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
