import { useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  addToWishlist,
  deleteFromWishlist,
  deleteAllFromWishlist
} from "../redux/actions/wishlistActions";
import { addToCart } from "../redux/actions/cartActions";
import { getDiscountPrice } from "../lib/product";
import { LayoutTwo } from "../components/Layout";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { IoIosClose, IoIosHeartEmpty } from "react-icons/io";

const Wishlist = ({
  wishlistItems,
  cartItems,
  addToCart,
  deleteFromWishlist,
  deleteAllFromWishlist
}) => {
  const { addToast } = useToasts();

  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  return (
    <LayoutTwo aboutOverlay={false}>
      {/* breadcrumb */}
      {/* <BreadcrumbOne
        pageTitle="Wishlist"
        // backgroundImage="/assets/images/backgrounds/breadcrumb-bg-2.jpg"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>
          

          <li>Wishlist</li>
        </ul>
      </BreadcrumbOne> */}
      
          <Container>
            <Row>
              <Col>
                <h1 className="breadcrumb__title">{wishlistItems && wishlistItems.length >= 1 ?"Whishlist":""}</h1>
                </Col>
              </Row>
       </Container>
      
      {/* <h2 class="section-title space-mb--20">Wihlist</h2> */}
      {/* wishlist content */}
      <div className="wishlist-content mt-2 space-mb--r130">
        <Container>
          {wishlistItems && wishlistItems.length >= 1 ? (
            <Row>
              <Col lg={12}>
                {/* cart table */}
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th className="product-name" colSpan="2">
                        Product
                      </th>
                      <th className="product-price">Price</th>
                      <th className="product-subtotal">&nbsp;</th>
                      <th className="product-remove">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistItems.map((product, i) => {
                      const discountedPrice = getDiscountPrice(
                        product?.product_price,
                        product?.product_discount
                      )

                      const cartItem = cartItems.filter(
                        (item) => item.product_id === product.product_id
                      )[0];

                      return (
                        <tr key={i}>
                          <td className="product-thumbnail">
                            <Link
                              href={`/shop/product/[id]?id=${product.product_id}`}
                              as={`${process.env.PUBLIC_URL}/shop/product/${product.product_id}`}
                            >
                              <a>
                                <img
                                  src={process.env.API_URL+product.product_image}
                                  className="img-fluid"
                                  alt=""
                                />
                              </a>
                            </Link>
                          </td>
                          <td className="product-name">
                            <Link
                              href={`/shop/product/[id]?id=${product.product_id}`}
                              as={`${process.env.PUBLIC_URL}/shop/product/${product.product_id}`}
                            >
                              <a>{product.product_name}</a>
                            </Link>
                          </td>

                          <td className="product-price">
                            <span className="price">&#8377;{discountedPrice}</span>
                          </td>

                          <td>
                            {product.product_is_available ? (
                              <button
                                onClick={() => addToCart(product, addToast)}
                                className={` lezada-button lezada-button--medium ${
                                  cartItem !== undefined &&
                                  cartItem.quantity > 0
                                    ? "active"
                                    : ""
                                } `}
                                disabled={
                                  cartItem !== undefined &&
                                  cartItem.quantity > 0
                                }
                                title={
                                  product !== undefined
                                    ? "Added to cart"
                                    : "Add to cart"
                                }
                              >
                                {cartItem !== undefined && cartItem.quantity > 0
                                  ? "Added"
                                  : "Add to cart"}
                              </button>
                            ) : (
                              <button
                                disabled
                                className="active lezada-button lezada-button--medium"
                              >
                                Out of stock
                              </button>
                            )}
                          </td>

                          <td className="product-remove">
                            <button
                              onClick={() =>
                                deleteFromWishlist(product, addToast)
                              }
                            >
                              <IoIosClose />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Col>
              <Col lg={12} className="space-mb--r100">
                <div className="cart-coupon-area space-pt--30 space-pb--30">
                  <Row className="align-items-center">
                    <Col lg={5} className="text-left text-lg-right ml-auto">
                      <button
                        className="lezada-button lezada-button--medium"
                        onClick={() => deleteAllFromWishlist(addToast)}
                      >
                        clear wishlist
                      </button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon space-mb--30">
                    <IoIosHeartEmpty />
                  </div>
                  <div className="item-empty-area__text">
                    <p className="space-mb--30">No items found in wishlist</p>
                    <Link
                      href="/shop/all-products"
                      as={process.env.PUBLIC_URL + "/shop/all-products"}
                    >
                      <a className="lezada-button lezada-button--medium">
                        Shop Now
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </LayoutTwo>
  );
};

const mapStateToProps = (state) => {
  return {
    wishlistItems: state.wishlistData,
    cartItems: state.cartData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    deleteFromWishlist: (item, addToast) => {
      dispatch(deleteFromWishlist(item, addToast));
    },
    deleteAllFromWishlist: (addToast) => {
      dispatch(deleteAllFromWishlist(addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
