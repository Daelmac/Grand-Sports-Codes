import { Fragment } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { HeaderOne } from "../../components/Header";

const NotFound = () => {
  return (
    <Fragment>
      <HeaderOne />
      {/* <div
        className="nothing-found-area bg-404"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/assets/images/not-found.jpg"
          })`
        }}
      > */}
        <Container>
          <Row>
            <Col lg={6}>
              <div className="nothing-found-content">
                <h1>Oops!</h1>
                <h1 className="space-mb--50">Page not found!</h1>
                <p className="direction-page">
                  PLEASE GO BACK TO{" "}
                  <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                    homepage
                  </Link>
                </p>
              </div>
            </Col>
            <Col lg={6}>
          <img
          src={"/assets/images/not-found.gif"}>
          </img>
        </Col>
          </Row>
        </Container>
        
      {/* </div> */}
    </Fragment>
  );
};

export default NotFound;
