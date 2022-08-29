import { Container, Row, Col } from "react-bootstrap";
const BreadcrumbOne = ({ children, backgroundImage, pageTitle, className }) => {
  return (
    <img
      className={`breadcrumb-area ${
        className ? className : "" 
      }`}
      style={{width:"100%",height:"auto"}}
      src={process.env.PUBLIC_URL + backgroundImage} />
    //   style={{
    //     backgroundImage: `url("${process.env.PUBLIC_URL + backgroundImage}")`,
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "contain",
    //     backgroundPosition: "center"
    //   }}
    // />
    //   <Container>
    //     <Row>
    //       <Col>
    //         <h1 className="breadcrumb__title"></h1>
    //         {/* {children} */}
    //       </Col>
    //     </Row>
    //   </Container>
    // </div>
  );
};

export default BreadcrumbOne;
