import { useState, Fragment } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { IoIosHeartEmpty, IoIosShuffle } from "react-icons/io";
import Swiper from "react-id-swiper";
import CustomScroll from "react-custom-scroll";
import { getProductCartQuantity } from "../../lib/product";

const ProductModal = (props) => {
  const {
    product,
    discountedprice,
    productprice,
    cartitems,
    wishlistitem,
    // compareitem,
    addtocart,
    addtowishlist,
    deletefromwishlist,
    // addtocompare,
    // deletefromcompare,
    addtoast
  } = props;

  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartitems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  const gallerySwiperParams = {
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      className="product-quickview"
      centered
    >
      <Modal.Body>
        <Modal.Header closeButton></Modal.Header>
        <div className="product-quickview__image-wrapper">
             <div>
                <div className="single-image">
                  <img
                    src={process.env.API_URL+product.product_image}
                    className="img-fluid"
                    alt=""
                    style={{minWidth: "450px"}}
                  />
                </div>
              </div>
        </div>
        <Row>
          <Col md={7} sm={12} className="ml-auto">
            <CustomScroll allowOuterScroll={true}>
              <div className="product-quickview__content">
                <h2 className="product-quickview__title space-mb--20">
                  {product.product_name}
                </h2>
                <div className="product-quickview__price space-mb--20">
                  {product.product_discount > 0 ? (
                    <Fragment>
                      <span className="main-price discounted">
                      &#8377;{productprice}
                      </span>
                      <span className="main-price">&#8377;{discountedprice}</span>
                    </Fragment>
                  ) : (
                    <span className="main-price">&#8377;{productprice} </span>
                  )}
                </div>
                <div className="product-quickview__description space-mb--30">
                  <p>{product.product_description}</p>
                </div>
                  <Fragment>
                    <div className="product-quickview__quantity space-mb--20">
                      <div className="product-quickview__quantity__title">
                        Quantity
                      </div>
                      <div className="cart-plus-minus">
                        <button
                          onClick={() =>
                            setQuantityCount(
                              quantityCount > 1 ? quantityCount - 1 : 1
                            )
                          }
                          className="qtybutton"
                        >
                          -
                        </button>
                        <input
                          className="cart-plus-minus-box"
                          type="text"
                          value={quantityCount}
                          readOnly
                        />
                        <button
                          onClick={() =>
                            setQuantityCount(
                               quantityCount + 1  
                            )
                          }
                          className="qtybutton"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="product-quickview__button-wrapper d-flex align-items-center">
                      {product.product_is_available ? (
                        <button
                          onClick={() =>
                            addtocart(
                              product,
                              addtoast,
                              quantityCount,
                              selectedProductColor,
                              selectedProductSize
                            )
                          }
                          disabled={productCartQty >= productStock}
                          className="lezada-button lezada-button--medium product-quickview__cart space-mr--10"
                        >
                          Add To Cart
                        </button>
                      ) : (
                        <button
                          className="lezada-button lezada-button--medium product-quickview__ofs space-mr--10"
                          disabled
                        >
                          Out of Stock
                        </button>
                      )}

                      <button
                        className={`product-quickview__wishlist space-mr--10 ${
                          wishlistitem !== undefined ? "active" : ""
                        }`}
                        title={
                          wishlistitem !== undefined
                            ? "Added to wishlist"
                            : "Add to wishlist"
                        }
                        onClick={
                          wishlistitem !== undefined
                            ? () => deletefromwishlist(product, addtoast)
                            : () => addtowishlist(product, addtoast)
                        }
                      >
                        <IoIosHeartEmpty />
                      </button>

                      {/* <button
                        className={`product-quickview__compare space-mr--10 ${
                          compareitem !== undefined ? "active" : ""
                        }`}
                        title={
                          compareitem !== undefined
                            ? "Added to compare"
                            : "Add to compare"
                        }
                        onClick={
                          compareitem !== undefined
                            ? () => deletefromcompare(product, addtoast)
                            : () => addtocompare(product, addtoast)
                        }
                      >
                        <IoIosShuffle />
                      </button> */}
                    </div>
                  </Fragment>
                
              </div>
            </CustomScroll>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
