import Link from "next/link";
import { Container, Row, Col, Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { LayoutTwo } from "../components/Layout";
import { BreadcrumbOne } from "../components/Breadcrumb";

const Faq = () => {
  return (
    <LayoutTwo aboutOverlay={false}>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="F.A.Q"
        backgroundImage="/assets/images/banners/banner-frequently-asked-question.jpg"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" 
            as={process.env.PUBLIC_URL + "/"}
            >

              <a>Home</a>
            </Link>
          </li>

          <li>F.A.Q</li>
        </ul>
      </BreadcrumbOne>
      <div className="element-wrapper space-mt--r130 space-mb--r130">
        <Container>
          <Row>
            <Col lg={12} data-aos="fade-left">
              <div className="faq-wrapper">
                <div className="single-faq space-mb--r50">
                  <h2 className="faq-title space-mb--20">
                    Shipping information
                  </h2>
                  <Accordion defaultActiveKey="0">
                    {/* <Card className="single-my-account space-mb--10">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            What Shipping Methods are Available?
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <p>
                            Depending on the item(s) you purchase here and the
                            location to which the item(s) will be delivered,
                            different shipping methods will be available. At
                            checkout, you will be prompted to choose a variety
                            of shipping methods. We dispatch it via courier
                            merchants including DTDC, Speed Post, Professional
                            Couriers. Please refer to the section below for
                            delivery time.
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card> */}

                    <Card className="single-my-account space-mb--10">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            Do You Ship Internationally?
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <p>Yes we ship Internationally</p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card className="single-my-account space-mb--10">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            How to Track My Order?
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <p>
                            Once your order has been shipped, You can check delivery partner information and tracking ID in my order section.you can track your order through that tracking ID.
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card className="single-my-account space-mb--10">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="3">
                          <h3 className="panel-title">
                            How Long Will It Take To Get My Package?
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="3">
                        <Card.Body>
                          <Table  bordered >
                            <thead>
                              <tr>
                                <th>REGION</th>
                                <th>TIME</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>South India</td>
                                <td>3-7 days*</td>
                              </tr>
                              <tr>
                                <td>North India</td>
                                <td>7-10 days*</td>
                              </tr>
                              <tr>
                                <td>North East</td>
                                <td>10-15 days*</td>
                              </tr>
                              <tr>
                                <td>Outside India</td>
                                <td>15-20 days*</td>
                              </tr>
                            </tbody>
                          </Table>
                          <p>Note*: These times are considered after product is shipped. The processing time is usually 1-2 days.</p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
                <div className="single-faq">
                  <h2 className="faq-title space-mb--20">Orders</h2>
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account space-mb--10">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            How do I place an Order?
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <p>
                            Click on a Product Photo or Product Name to see more
                            detailed information. To place your order, choose
                            the specification you want and enter the quantity,
                            and click ‘Buy Now’.Please enter the required
                            information such as Delivery Address, Quantity Type
                            etc. Before clicking “Place Order”, please check
                            your Order Details carefully.If you want to edit a default current Delivery Address, 
                            then you can change it from my account page. After confirming your Order,
                            you will be automatically taken to the Payment page
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card className="single-my-account space-mb--10">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            How Can I Cancel Or Change My Order?
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <p>
                            Go to Your Orders. Click Cancel Order. Note: SCancellation of an order is only possible before the order items are shipped
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card className="single-my-account space-mb--10">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            Who Should I Contact If I Have Any Queries?
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <p>
                          You can contact our customer support team by provided email or mobile phone. In case, it’s not convenient to talk, you can come to our store to make your request.
                          Please click the Contact us menu to have our contact details.
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutTwo>
  );
};

export default Faq;
