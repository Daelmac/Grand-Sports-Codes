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
                  title="Terms and Conditions"
                  subtitle="COME HAVE A LOOK"
                />
              </Col>
            </Row>
            <Row className="space-mb-mobile-only--m50">
              <p style={{textAlign:"center"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kindly read these Terms of Administration cautiously prior to getting to or utilizing our site. By getting to or utilizing any piece of the site, you consent to be limited by these Terms of Administration. In the event that you don't consent to every one of the agreements of this understanding, then you may not get to the site or utilize any administrations. On the off chance that these Terms of Administration are viewed as a deal, acknowledgment is explicitly restricted to these Terms of Administration.
<br/><br/>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;By visiting our site or potentially buying something from us, you participate in our "Administration" and consent to be limited by the accompanying agreements ("Terms of Administration", "Terms"), including those extra agreements and strategies referred to in this and additionally accessible by hyperlink. These Terms of Administration apply to all clients of the site, including without limit clients who are programs, sellers, clients, shippers, as well as donors of content.
<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Grand Sports offers this site, including all data, devices and administrations accessible from this site to you, the client, molded upon your acknowledgment of all terms, conditions, strategies and notification expressed here.
<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You are allowed to reject our solicitation for your own data, with the comprehension that we might not be able to give you a portion of your ideal administrations.<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Any new highlights or instruments which are added to the ongoing store will likewise be dependent upon the Terms of Administration. You can audit the latest rendition of the Terms of Administration whenever on this page. We claim all authority to refresh, change or supplant any piece of these Terms of Administration by posting refreshes or potentially changes to our site. It is your obligation to check this page intermittently for changes. Your proceeded with utilization of or admittance to the site following the posting of any progressions is acknowledgment of those changes.</p>
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
