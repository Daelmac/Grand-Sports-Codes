import Link from "next/link";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoIosArrowRoundUp } from "react-icons/io";
import { animateScroll } from "react-scroll";

const FooterTwo = ({ footerBgClass }) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

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
            <h5 className="footer-single-widget__title">ABOUT</h5>
            <nav className="footer-single-widget__nav">
              <ul>
                <li>
                  <Link
                    href="/about"
                    // as={process.env.PUBLIC_URL + "/about"}
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
                    // as={process.env.PUBLIC_URL + "/contact"}
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
            <h5 className="footer-single-widget__title">USEFUL LINKS</h5>
            <nav className="footer-single-widget__nav">
              <ul>
                <li>
                  <Link
                    href="/faq"
                    // as={process.env.PUBLIC_URL + "/faq"}
                  >
                    <a>FAQs</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/login"
                    // as={process.env.PUBLIC_URL + "/admin/login"}
                  >
                    <a>Admin Login</a>
                  </Link>
                </li>
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

export default FooterTwo;
