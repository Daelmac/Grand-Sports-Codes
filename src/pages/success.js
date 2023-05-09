import { Fragment, useEffect } from "react";
import Link from "next/link";
import { deleteAllFromCart } from "../redux/actions/cartActions.js";
import { Container, Row, Col } from "react-bootstrap";
import { HeaderTwo } from "../components/Header";
import { useRouter } from 'next/router';
import { connect } from "react-redux";

const Success = ({deleteAllFromCart}) => {
    const router = useRouter();
    const { receipt_id=null,payment_id=null } = router.query;

  useEffect(()=>{
    if(receipt_id && payment_id)
        deleteAllFromCart()
  },[payment_id,receipt_id])  
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
                          "/assets/images/success-green-check-mark-icon.svg"
                        }
                        height={70}
                        width={70}/>
                <h1>Sucesss ! </h1>
                <h1 className="space-mb--50 text-center">Order Placed Sucessfully</h1>
                {
                    receipt_id && payment_id && 
                <div>
                    <p><b>Receipt Id</b> : <span>{receipt_id}</span></p>
                    <p><b>Payment Id</b> : <span>{payment_id}</span></p>
                </div>
                }
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
const mapDispatchToProps = (dispatch) => {
    return {
      deleteAllFromCart: (addToast) => {
        dispatch(deleteAllFromCart(addToast));
      },
    };
}
export default connect(null,mapDispatchToProps)(Success)
