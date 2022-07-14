import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { IoIosPin, IoIosCall, IoIosMail, IoIosClock } from "react-icons/io";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import {
  SectionTitleOne,
  SectionTitleTwo
} from "../../components/SectionTitle";

const Contact = () => {
  return (
    <LayoutTwo aboutOverlay={false}>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Contact"
        backgroundImage="/assets/images/breadcrumb_banner_final.jpg"
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
              <Col md={4} className="space-mb-mobile-only--50">
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
              <Col md={4} className="space-mb-mobile-only--50">
                <div className="icon-box">
                  <div className="icon-box__icon">
                    <IoIosCall />
                  </div>
                  <div className="icon-box__content">
                    <h3 className="title">CONTACT</h3>
                    <p className="content">
                    Mobile: 09842457070{" "}
                    </p>
                  </div>
                </div>
                <div className="icon-box">
                  <div className="icon-box__icon">
                    <IoIosMail />
                  </div>
                  <div className="icon-box__content">
                    <p className="content"> Mail: grandsportschennai@gmail.com </p>
                  </div>
                </div>
              </Col>
              <Col md={4} className="space-mb-mobile-only--50">
                <div className="icon-box">
                  <div className="icon-box__icon">
                    <IoIosClock />
                  </div>
                  <div className="icon-box__content">
                    <h3 className="title">HOUR OF OPERATION</h3>
                    <p className="content">
                      Monday – Saturday : 10 AM to 9 PM
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
        <div className="contact-page-form">
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
                          placeholder="First Name *"
                          name="customerName"
                          id="customerName"
                          required
                        />
                      </Col>
                      <Col md={6} className="space-mb--40">
                        <input
                          type="email"
                          placeholder="Email *"
                          name="customerEmail"
                          id="customerEmail"
                          required
                        />
                      </Col>
                      <Col md={12} className="space-mb--40">
                        <input
                          type="text"
                          placeholder="Subject"
                          name="contactSubject"
                          id="contactSubject"
                        />
                      </Col>
                      <Col md={12} className="space-mb--40">
                        <textarea
                          cols={30}
                          rows={10}
                          placeholder="Message"
                          name="contactMessage"
                          id="contactMessage"
                          defaultValue={""}
                        />
                      </Col>
                      <Col md={12} className="text-center">
                        <button
                          type="submit"
                          value="submit"
                          id="submit"
                          className="lezada-button lezada-button--medium"
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

export default Contact;
