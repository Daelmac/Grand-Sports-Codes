import { useState } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import ModalVideo from "react-modal-video";
import { LayoutTwo } from "../components/Layout";
import { BreadcrumbOne } from "../components/Breadcrumb";

const About = () => {
  const [modalStatus, isOpen] = useState(false);

  return (
    <LayoutTwo aboutOverlay={false}>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="About"
        backgroundImage="/assets/images/banners/banner-about-us.jpg"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" 
            as={process.env.PUBLIC_URL + "/"}
            >
              Home
            </Link>
          </li>

          <li>About</li>
        </ul>
      </BreadcrumbOne>
      {/* about content */}
      <div className="about-content space-mt--r130 space-mb--r130">
        <div className="section-title-container space-mb--40">
          <Container>
            <Row>
              <Col lg={8} className="ml-auto mr-auto" >
                {/* section title */}
                <div className="about-title-container text-center" data-aos="fade-up">
                  <p className="dark-title space-mb--35"  >
                    A report about your rapport
                  </p>
                  <h2 className="title space-mb--15">Our Story</h2>
                  <p className="title-text">
                    Grand Sports founded and run by Kumar Palanisamy is one of
                    the top selling cricket accessories relies out of Chennai,
                    India. We started as a Club Cricketer's desire for cricket
                    bats in 2017, moved from the trunk seat of a vehicle to a
                    Cricket Store on Velachery near Guru Nanak College and
                    Phoenix mall, Chennai.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* about video content */}
        <div className="about-video-content space-mb--r100">
          <Container>
            <Row>
              <Col lg={10} className="ml-auto mr-auto">
                {/*=======  about video area  =======*/}
                <div
                data-aos="fade-left"
                  className="about-video-bg space-mb--60"
                  style={{
                    backgroundImage: `url(${
                      process.env.PUBLIC_URL +
                      "/assets/images/about-us/grand_sports_video_background.jpg"
                    })`,
                  }}
                >
                  {/* <p className="video-text video-text-left">
                    <Link
                      href="/shop/all-products"
                      as={process.env.PUBLIC_URL + "/shop/all-products"}
                    >
                      <a>LEZADA STORE</a>
                    </Link>
                  </p> */}

                  <div className="about-video-content__text-icon d-flex flex-column h-100 justify-content-center" >
                    <div className="play-icon text-center space-mb--40" >
                      <ModalVideo
                        channel="youtube"
                        isOpen={modalStatus}
                        videoId="apohMpSoRkk"
                        onClose={() => isOpen(false)}
                      />
                      <button onClick={() => isOpen(true)}>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/icon/icon-play-100x100.png"
                          }
                          className="img-fluid"
                          alt=""
                        />
                      </button>
                    </div>
                    {/* <h1>OUR STORY</h1> */}
                  </div>
                  {/* <p className="video-text video-text-right">
                    <Link
                      href="/about"
                      as={process.env.PUBLIC_URL + "/about"}
                    >
                      <a>OUR STORY</a>
                    </Link>
                  </p> */}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={10} className="ml-auto mr-auto">
                <Row data-aos="fade-up">
                  <Col md={6}>
                    <div className="about-widget space-mb--35">
                      <h2 className="widget-title space-mb--25">ADDRESS</h2>
                      <p className="widget-content">
                        No 4, Velachery Main Road, Anna Garden, Velachery,
                        Chennai, Tamil Nadu 600042
                      </p>
                    </div>
                    <div className="about-widget space-mb--35">
                      <h2 className="widget-title space-mb--25">PHONE</h2>
                      <p className="widget-content">Mobile: 09842457070</p>
                    </div>
                    <div className="about-widget">
                      <h2 className="widget-title space-mb--25">EMAIL</h2>
                      <p className="widget-content">
                        grandsportschennai@gmail.com
                      </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="about-page-text">
                      <p className="space-mb--35">
                        Our Store houses top Indian and International Cricket
                        equipment brands like SS, SG, Tyka to name a few. From
                        English willow bats to economical bats, Grand Sports
                        stocks them all. Just click the "Visit Our online Store" button
                        below to grab top class products.
                      </p>
                      <Link
                        href="/shop/all-products"
                        as={process.env.PUBLIC_URL + "/shop/all-products"}
                      >
                        <a className="lezada-button lezada-button--medium lezada-button--icon--left">
                          <IoMdAdd /> Visit Our online Store
                        </a>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </LayoutTwo>
  );
};

export default About;
