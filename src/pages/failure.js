import { Fragment } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { HeaderTwo } from "../components/Header";

const Failure = () => {
  return (
    <Fragment>
      <HeaderTwo />
      <div
        className="nothing-found-area bg-404"
      >
        <Container>
          <Row>
            <Col lg={12}>
              <div className="nothing-found-content">
              <img  src={
                          process.env.PUBLIC_URL +
                          "/assets/images/cancel-icon.svg"
                        }
                        height={70}
                        width={70}/>
                <h1>Failed ! </h1>
                <h1 className="space-mb--50 text-center">Opps,Payment Failed</h1>
                <p className="direction-page mt-3">
                  CONTINUE SHOPING{" "} 
                  <Link href="/shop/all-products" 
                  as={process.env.PUBLIC_URL + "/shop/all-products"}
                  >
                    productpage
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        
      </div>
    </Fragment>
  );
};

export default Failure;
