import { Fragment } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Container, Row, Col } from "react-bootstrap";
import { IoIosShuffle, IoIosTrash } from "react-icons/io";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { deleteFromCompare } from "../../redux/actions/compareActions";
import { addToCart } from "../../redux/actions/cartActions";
import { getDiscountPrice } from "../../lib/product";

const Compare = ({ cartItems, compareItems, addToCart, deleteFromCompare }) => {
  const { addToast } = useToasts();

  return (
    <LayoutTwo aboutOverlay={false}>
      {/* breadcrumb */}
      {/* <BreadcrumbOne
        pageTitle="Compare"
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Compare</li>
        </ul>
      </BreadcrumbOne> */}
      {/* <Container>
      <Row>
        <Col>
          <h1 className="breadcrumb__title">Compare</h1>
           </Col>
         </Row>
       </Container> */}
      {/* cart content */}
      <div className="cart-content mt-2 space-mb--r130">
        <Container>
          <Row>
            <Col>
              {compareItems && compareItems.length >= 1 ? (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="compare-page-content">
                      <div className="compare-table table-responsive">
                        <table className="table table-bordered mb-0">
                          <tbody>
                            <tr>
                              <th className="title-column">Product Info</th>
                              {compareItems.map((product, i) => {
                                const cartItem = cartItems.filter(
                                  (item) => item.product_id === product.product_id
                                )[0];
                                return (
                                  <td className="product-image-title" key={i}>
                                    <div className="compare-remove">
                                      <button
                                        onClick={() =>
                                          deleteFromCompare(product, addToast)
                                        }
                                      >
                                        <IoIosTrash />
                                      </button>
                                    </div>
                                    <Link
                                      href={`/shop/product/[id]?id=${product.product_id}`}
                                      as={`${process.env.PUBLIC_URL}/shop/product/${product.product_id}`}
                                    >
                                      <a className="image">
                                        <img
                                          className="img-fluid"
                                          src={process.env.API_URL+product.product_image}
                                          alt=""
                                          style={{height:"170px",width:"170px",objectFit: "contain"}}
                                        />
                                      </a>
                                    </Link>
                                    <div className="product-title">
                                    <Link
                                      href={`/shop/product/[id]?id=${product.product_id}`}
                                      as={`${process.env.PUBLIC_URL}/shop/product/${product.product_id}`}>
                                    
                                        <a>{product.product_name}</a>
                                      </Link>
                                    </div>
                                    <div className="compare-btn">
                                      {product.product_is_available ? (
                                        <button
                                          onClick={() =>
                                            addToCart(product, addToast)
                                          }
                                          className={`lezada-button lezada-button--primary
                                            ${
                                              cartItem !== undefined &&
                                              cartItem.quantity > 0
                                                ? "active"
                                                : ""
                                            }
                                          `}
                                          disabled={
                                            cartItem !== undefined &&
                                            cartItem.quantity > 0
                                          }
                                        >
                                          {cartItem !== undefined &&
                                          cartItem.quantity > 0
                                            ? "Added"
                                            : "Add to cart"}
                                        </button>
                                      ) : (
                                        <button
                                          disabled
                                          className="active lezada-button lezada-button--primary"
                                        >
                                          Out of Stock
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                            <tr>
                              <th className="title-column">Price</th>
                              {compareItems.map((product, key) => {
                                const discountedPrice = getDiscountPrice(
                                  product?.product_price,
                                  product?.product_discount
                                )

                                const productPrice = parseInt(product?.product_price).toFixed(2)
                                return (
                                  <td className="product-price" key={key}>
                                    {product.product_discount > 0 ? (
                                      <Fragment>
                                        <span className="main-price discounted">
                                        &#8377;{productPrice}
                                        </span>
                                        <span className="main-price">
                                        &#8377;{discountedPrice}
                                        </span>
                                      </Fragment>
                                    ) : (
                                      <span className="main-price">
                                        &#8377;{productPrice}
                                      </span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>

                            <tr>
                              <th className="title-column">Description</th>
                              {compareItems.map((product, i) => {
                                return (
                                  <td className="product-desc" key={i}>
                                    <p>
                                      {product.product_description
                                        ? product.product_description
                                        : "N/A"}
                                    </p>
                                  </td>
                                );
                              })}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Row>
                  <Col>
                    <div className="item-empty-area text-center">
                      <div className="item-empty-area__icon space-mb--30">
                        <IoIosShuffle />
                      </div>
                      <div className="item-empty-area__text">
                        <p className="space-mb--30">No items to compare</p>
                        <Link
                          href="/shop/all-products"
                          as={process.env.PUBLIC_URL + "/shop/all-products"}
                        >
                          <a className="lezada-button lezada-button--medium">
                            Add Items
                          </a>
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutTwo>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    compareItems: state.compareData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },

    deleteFromCompare: (item, addToast) => {
      dispatch(deleteFromCompare(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
