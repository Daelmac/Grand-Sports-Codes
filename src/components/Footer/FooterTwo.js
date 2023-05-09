import Link from "next/link";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoIosArrowRoundUp } from "react-icons/io";
import { animateScroll } from "react-scroll";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import {setCurrentUser } from "../../redux/actions/userActions";
import { useToasts } from "react-toast-notifications";
import Router from "next/router";

const FooterTwo = ({ footerBgClass, userDetails ,setCurrentUser }) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);
  const [showLogoutModel, setShowLogoutModel] = useState(false);
  const { addToast } = useToasts();

  const handleClose = () => setShowLogoutModel(false);
  const handleShow = () => {
    setShowLogoutModel(true);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    setCurrentUser({}, addToast);
    Router.push("/login-register");
  };

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  return (
    <footer
      className={`space-pt--100 space-pb--50 ${
        footerBgClass ? footerBgClass : "bg-color--grey"
      }`}
    >
      <Container className="wide">
        <Row>
          <Col className="footer-single-widget space-mb--50">
            {/* logo */}
            <div className="logo space-mb--35">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/images/grand_sports_logo.png"
                }
                className="img-fluid"
                alt="logo"
              />
            </div>

            {/*=======  copyright text  =======*/}
            <div className="footer-single-widget__copyright">
              &copy; {new Date().getFullYear() + " "}
              <a href="https://www.daelmac.com" target="_blank">
                Daelmac Software Solutions
              </a>
              <span>All Rights Reserved</span>
            </div>
          </Col>
          <Col className="footer-single-widget space-mb--50">
            <h5 className="footer-single-widget__title">QUICK LINKS</h5>
            <nav className="footer-single-widget__nav">
              <ul>
                <li>
                  <Link
                    href="/PrivacyPolicy"
                    as={process.env.PUBLIC_URL + "/PrivacyPolicy"}
                  >
                    <a>Privacy Policy</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/TermsandConditions"
                    as={process.env.PUBLIC_URL + "/TermsandConditions"}
                  >
                    <a>Terms and Conditions</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/CancellationandRefund"
                    as={process.env.PUBLIC_URL + "/CancellationandRefund"}
                  >
                    <a>Cancellation and Refund</a>
                  </Link>
                </li>
                 <li>
                  <Link
                    href="/ShippingandDelivery"
                    as={process.env.PUBLIC_URL + "/ShippingandDelivery"}
                  >
                    <a>Shipping and Delivery</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    as={process.env.PUBLIC_URL + "/contact"}
                  >
                    <a>Contact Us</a>
                  </Link>
                </li>
                 <li>
                  <Link
                    href="/Pricing"
                    as={process.env.PUBLIC_URL + "/Pricing"}
                  >
                    <a>Pricing</a>
                  </Link>
                </li>
              </ul>
            </nav>
            <Modal show={showLogoutModel} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Logout</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to Logout,
                <b>{userDetails?.user_name}</b> ?
              </Modal.Body>
              <Modal.Footer>
                <button className="cancel-btn-small" onClick={handleClose}>
                  Cancel
                </button>
                <button
                  className="lezada-button lezada-button--small"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Modal.Footer>
            </Modal>
          </Col>
          <Col className="footer-single-widget space-mb--50">
            <h5 className="footer-single-widget__title">ABOUT</h5>
            <nav className="footer-single-widget__nav">
              <ul>
                <li>
                  <Link
                    href="/about"
                    as={process.env.PUBLIC_URL + "/about"}
                  >
                    <a>About Us</a>
                  </Link>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/place/Grand+Sports/@12.9883723,80.2209383,16.75z/data=!4m5!3m4!1s0x3a525d879217de87:0xc56f845932bde8e7!8m2!3d12.9884378!4d80.2227111"
                  >
                    Store Location
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    as={process.env.PUBLIC_URL + "/contact"}
                  >
                    <a>Contact Us</a>
                  </Link>
                </li>
                {/* <li>
                  <a href="#">My Orders</a>
                </li> */}
              </ul>
            </nav>
          </Col>

       

          <Col className="footer-single-widget space-mb--50">
            <h5 className="footer-single-widget__title">FOLLOW US ON</h5>
            <nav className="footer-single-widget__nav footer-single-widget__nav--social">
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/grandsportschennai/"
                    target="_blank"
                  >
                    <FaFacebookF /> Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/grandsports_/"
                    target="_blank"
                  >
                    <FaInstagram /> Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCkns1WvN-bBtE3vKU1hZfRA"
                    target="_blank"
                  >
                    <FaYoutube /> Youtube
                  </a>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      </Container>
      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <IoIosArrowRoundUp />
      </button>
    </footer>
  );
};
const mapStateToProps = (state) => {
  return {
    userDetails: state.currentUserData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user, addToast) => {
      dispatch(setCurrentUser(user, addToast));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FooterTwo);
