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
      <BreadcrumbOne
        pageTitle="Contact"
        backgroundImage="/assets/images/banners/banner-contact-us.jpg"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              Home
            </Link>
          </li>

          <li>Contact</li>
        </ul>
      </BreadcrumbOne>
      <div className="contact-page-content-wrapper space-mt--r130 space-mb--r130">
        <div className="contact-page-top-info space-mb--r100">
          <Container>
            <Row>
              <Col lg={12}>
                <SectionTitleTwo
                  title="Contact detail"
                  subtitle="COME HAVE A LOOK"
                />
              </Col>
            </Row>
            <Row className="space-mb-mobile-only--m50">
              <Col md={4} className="space-mb-mobile-only--50" data-aos="fade-right">
                <div className="icon-box">
                  <div className="icon-box__icon">
                    <IoIosPin />
                  </div>
                  <div className="icon-box__content">
                    <h3 className="title">ADDRESS</h3>
                    <p className="content">
                      No 4, Velachery Main Road, Anna Garden, Velachery,
                      Chennai, Tamil Nadu 600042
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={4} className="space-mb-mobile-only--50" data-aos="fade-right">
                <div className="icon-box">
                  <div className="icon-box__icon">
                    <IoIosCall />
                  </div>
                  <div className="icon-box__content">
                    <h3 className="title">CONTACT</h3>
                    <p className="content">Mobile: 09842457070 </p>
                  </div>
                </div>
                <div className="icon-box">
                  <div className="icon-box__icon">
                    <IoIosMail />
                  </div>
                  <div className="icon-box__content">
                    <p className="content">
                      {" "}
                      Mail: grandsportschennai@gmail.com{" "}
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={4} className="space-mb-mobile-only--50" data-aos="fade-right">
                <div className="icon-box">
                  <div className="icon-box__icon">
                    <IoIosClock />
                  </div>
                  <div className="icon-box__content">
                    <h3 className="title">HOUR OF OPERATION</h3>
                    <p className="content">
                      Monday – Sunday: 10 AM to 9 PM
                      <span>Sunday : closed</span>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="contact-page-map space-mb--r100">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="google-map">
                  <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.7404913595633!2d80.22052241435388!3d12.988443018023855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d879217de87%3A0xc56f845932bde8e7!2sGrand%20Sports!5e0!3m2!1sen!2sin!4v1657775471598!5m2!1sen!2sin"
                    allowFullScreen
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="contact-page-form" data-aos="fade-down">
          <Container>
            <Row>
              <Col lg={12}>
                <SectionTitleOne title="Get in touch" />
              </Col>
            </Row>
            <Row>
              <Col lg={8} className="ml-auto mr-auto">
                <div className="lezada-form contact-form">
                  <form>
                    <Row>
                      <Col md={6} className="space-mb--40">
                        <input
                          type="text"
                          placeholder="Name *"
                          name="customerName"
                          id="customerName"
                          value={msg.customerName}
                          onChange={handleMsgChange}
                          required
                        />
                        <span className="error-text">
                          {msgErrors.customerNameErrMsg}
                        </span>
                      </Col>
                      <Col md={6} className="space-mb--40">
                        <input
                          type="email"
                          placeholder="Email *"
                          name="customerEmail"
                          id="customerEmail"
                          value={msg.customerEmail}
                          onChange={handleMsgChange}
                          required
                        />
                        <span className="error-text">
                          {msgErrors.customerEmailErrMsg}
                        </span>
                      </Col>
                      <Col md={12} className="space-mb--40">
                        <input
                          type="text"
                          placeholder="Subject"
                          name="contactSubject"
                          id="contactSubject"
                          value={msg.contactSubject}
                          onChange={handleMsgChange}
                        />
                        <span className="error-text">
                          {msgErrors.contactSubjectErrMsg}
                        </span>
                      </Col>
                      <Col md={12} className="space-mb--40">
                        <textarea
                          cols={30}
                          rows={10}
                          placeholder="Message"
                          name="contactMessage"
                          id="contactMessage"
                          value={msg.contactMessage}
                          onChange={handleMsgChange}
                        />
                        <span className="error-text">
                          {msgErrors.contactMessageErrMsg}
                        </span>
                      </Col>
                      <Col md={12} className="text-center">
                        <button
                          type="submit"
                          value="submit"
                          id="submit"
                          className="lezada-button lezada-button--medium"
                          onClick={onSendMessage}
                        >
                          submit
                        </button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
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
