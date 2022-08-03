import Link from "next/link";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoIosArrowRoundUp } from "react-icons/io";
import { animateScroll } from "react-scroll";
import { SubscribeEmailTwo } from "../Newsletter";

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
                  process.env.PUBLIC_URL + "/assets/images/grand_sports_logo.png"
                }
                className="img-fluid"
                alt="logo"
              />
            </div>

            {/*=======  copyright text  =======*/}
            <div className="footer-single-widget__copyright">
              &copy; {new Date().getFullYear() + " "}
              <a href="www.daelmac.com" target="_blank">
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
                <Link href="/other/about" as={process.env.PUBLIC_URL + "/other/about"}><a>About Us</a></Link>
                </li>
                <li>
                  <a href="#">Store Location</a>
                </li>
                <li>
                <Link href="/other/contact" as={process.env.PUBLIC_URL + "/other/contact"}><a>Contact Us</a></Link>
                </li>
                <li>
                  <a href="#">My Orders</a>
                </li>
              </ul>
            </nav>
          </Col>

          <Col className="footer-single-widget space-mb--50">
            <h5 className="footer-single-widget__title">USEFUL LINKS</h5>
            <nav className="footer-single-widget__nav">
              <ul>
                {/* <li>
                  <a href="#">Returns</a>
                </li>
                <li>
                  <a href="#">Support Policy</a>
                </li>
                <li>
                  <a href="#">Size guide</a>
                </li> */}
                <li>
                   <Link href="/other/faq" as={process.env.PUBLIC_URL + "/other/faq"}><a>FAQs</a></Link>
                </li>
                <li>
                <Link href="/admin/login" as={process.env.PUBLIC_URL + "/admin/login"}><a>Admin Login</a></Link>
                </li>
              </ul>
            </nav>
          </Col>

          <Col className="footer-single-widget space-mb--50">
            <h5 className="footer-single-widget__title">FOLLOW US ON</h5>
            <nav className="footer-single-widget__nav footer-single-widget__nav--social">
              <ul>
                {/* <li>
                  <a href="https://www.twitter.com">
                    <FaTwitter /> Twitter
                  </a>
                </li> */}
                <li>
                  <a href="https://www.facebook.com/grandsportschennai/" target="_blank">
                    <FaFacebookF /> Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/grandsports_/" target="_blank">
                    <FaInstagram /> Instagram
                  </a>
                </li>
                {/* <li>
                  <a href="https://www.youtube.com">
                    <FaYoutube /> Youtube
                  </a>
                </li> */}
              </ul>
            </nav>
          </Col>

          <Col className="footer-single-widget space-mb--50">
            <div className="footer-subscribe-widget">
              <h2 className="footer-subscribe-widget__title">Subscribe.</h2>
              <p className="footer-subscribe-widget__subtitle">
                Subscribe to our newsletter to receive news on update.
              </p>
              {/* email subscription */}
              <SubscribeEmailTwo mailchimpUrl="https://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef" />
            </div>
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
