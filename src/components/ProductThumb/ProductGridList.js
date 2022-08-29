import { Fragment, useState } from "react";
import { Col } from "react-bootstrap";
import Link from "next/link";
import { IoIosHeartEmpty, IoIosShuffle, IoIosSearch } from "react-icons/io";
import { Tooltip } from "react-tippy";
import ProductModal from "./ProductModal";

const ProductGridList = ({
  product,
  discountedPrice,
  productPrice,
  cartItem,
  wishlistItem,
  // compareItem,
  bottomSpace,
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  // addToCompare,
  // deleteFromCompare,
  addToast,
  cartItems
}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Fragment>
      <Col lg={3} md={6} className={bottomSpace ? bottomSpace : ""}>
        <div className="product-grid">
          {/*=======  single product image  =======*/}
          <div className="product-grid__image">
          <Link
              href={`/shop/product/[id]`}
              as={
                process.env.PUBLIC_URL + "/shop/product/" + product.product_id
              }
            >
              <a className="image-wrap"  style={{textAlign: 'center'}}>
                <img
                  src={process.env.API_URL+product.product_image}
                  className="img-fluid"
                  alt={product.product_name}
                  style={{height:"170px",width:"auto"}}
                />
              </a>
            </Link>
            <div className="product-grid__floating-badges">
              {product.product_discount && product.product_discount > 0 ? (
                <span className="onsale">-{product.product_discount}%</span>
              ) : (
                ""
              )}
              {product.product_is_new ? <span className="hot">New</span> : ""}
              {!product.product_is_available ? (
                <span className="out-of-stock">out</span>
              ) : (
                ""
              )}
            </div>
            <div className="product-grid__floating-icons">
              {/* add to wishlist */}
              <Tooltip
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                position="left"
                trigger="mouseenter"
                animation="shift"
                arrow={true}
                duration={200}
              >
                <button
                  onClick={
                    wishlistItem !== undefined
                      ? () => deleteFromWishlist(product, addToast)
                      : () => addToWishlist(product, addToast)
                  }
                  className={wishlistItem !== undefined ? "active" : ""}
                >
                  <IoIosHeartEmpty />
                </button>
              </Tooltip>

              {/* add to compare */}
              {/* <Tooltip
                title={
                  compareItem !== undefined
                    ? "Added to compare"
                    : "Add to compare"
                }
                position="left"
                trigger="mouseenter"
                animation="shift"
                arrow={true}
                duration={200}
              >
                <button
                  onClick={
                    compareItem !== undefined
                      ? () => deleteFromCompare(product, addToast)
                      : () => addToCompare(product, addToast)
                  }
                  className={compareItem !== undefined ? "active" : ""}
                >
                  <IoIosShuffle />
                </button>
              </Tooltip> */}

              {/* quick view */}
              <Tooltip
                title="Quick view"
                position="left"
                trigger="mouseenter"
                animation="shift"
                arrow={true}
                duration={200}
              >
                <button
                  onClick={() => setModalShow(true)}
                  className="d-none d-lg-block"
                >
                  <IoIosSearch />
                </button>
              </Tooltip>
            </div>
          </div>

          {/*=======  single product content  =======*/}
          <div className="product-grid__content">
            <div className="title">
              <h3>
              <Link
              href={`/shop/product/[id]`}
              as={
                process.env.PUBLIC_URL + "/shop/product/" + product.product_id
              }
            >
                  <a>{product.product_name}</a>
                </Link>
              </h3>
              {/* add to cart */}
              {product.product_is_available ? (
                <button
                  onClick={() => addToCart(product, addToast)}
                  disabled={
                    cartItem !== undefined 
                  }
                >
                  {cartItem !== undefined ? "Added to cart" : "Add to cart"}
                </button>
              ) : (
                <button disabled>Out of Stock</button>
              )}
            </div>
            <div className="price">
              {product.product_discount > 0 ? (
                <Fragment>
                  <span className="main-price discounted">&#8377; {productPrice}</span>
                  <span className="discounted-price">&#8377; {discountedPrice}</span>
                </Fragment>
              ) : (
                <span className="main-price">&#8377; {productPrice}</span>
              )}
            </div>
          </div>
        </div>

        <div className="product-list">
          {/*=======  single product image  =======*/}
          <div className="product-list__image">
          <Link
              href={`/shop/product/[id]`}
              as={
                process.env.PUBLIC_URL + "/shop/product/" + product.product_id
              }
            >
              <a className="image-wrap" style={{textAlign: 'center'}}>
                <img
                  src={process.env.API_URL+product.product_image}
                  className="img-fluid"
                  alt={product.product_name}
                  style={{height:"auto",width:"200px"}}
                />
              </a>
            </Link>
            <div className="product-list__floating-badges">
              {product.product_discount && product.product_discount > 0 ? (
                <span className="onsale">-{product.product_discount}%</span>
              ) : (
                ""
              )}
              {product.product_is_new ? <span className="hot">New</span> : ""}
              {!product.product_is_available? (
                <span className="out-of-stock">out</span>
              ) : (
                ""
              )}
            </div>
            <div className="product-list__floating-icons">
              {/* add to wishlist */}
              <Tooltip
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                position="left"
                trigger="mouseenter"
                animation="shift"
                arrow={true}
                duration={200}
              >
                <button
                  onClick={
                    wishlistItem !== undefined
                      ? () => deleteFromWishlist(product, addToast)
                      : () => addToWishlist(product, addToast)
                  }
                  className={wishlistItem !== undefined ? "active" : ""}
                >
                  <IoIosHeartEmpty />
                </button>
              </Tooltip>

              {/* add to compare */}
              {/* <Tooltip
                title={
                  compareItem !== undefined
                    ? "Added to compare"
                    : "Add to compare"
                }
                position="left"
                trigger="mouseenter"
                animation="shift"
                arrow={true}
                duration={200}
              >
                <button
                  onClick={
                    compareItem !== undefined
                      ? () => deleteFromCompare(product, addToast)
                      : () => addToCompare(product, addToast)
                  }
                  className={compareItem !== undefined ? "active" : ""}
                >
                  <IoIosShuffle />
                </button>
              </Tooltip> */}

              {/* quick view */}
              <Tooltip
                title="Quick view"
                position="left"
                trigger="mouseenter"
                animation="shift"
                arrow={true}
                duration={200}
              >
                <button
                  onClick={() => setModalShow(true)}
                  className="d-none d-lg-block"
                >
                  <IoIosSearch />
                </button>
              </Tooltip>
            </div>
          </div>

          {/*=======  single product content  =======*/}
          <div className="product-list__content">
            <div className="title">
              <h3>
              <Link
              href={`/shop/product/[id]`}
              as={
                process.env.PUBLIC_URL + "/shop/product/" + product.product_id
              }
            >
                  <a>{product.product_name}</a>
                </Link>
              </h3>
            </div>
            <div className="price">
              {product.product_discount > 0 ? (
                <Fragment>
                  <span className="main-price discounted">&#8377; {productPrice}</span>
                  <span className="discounted-price">&#8377; {discountedPrice}</span>
                </Fragment>
              ) : (
                <span className="main-price">&#8377; {productPrice}</span>
              )}
            </div>

            {/* <div className="short-description">{product.product_description}</div> */}
            <div className="add-to-cart">
              {/* add to cart */}
              {product.product_is_available ? (
                <button
                  onClick={() => addToCart(product, addToast)}
                  disabled={
                    cartItem !== undefined
                  }
                  className="lezada-button lezada-button--medium"
                >
                  {cartItem !== undefined ? "Added to cart" : "Add to cart"}
                </button>
              ) : (
                <button
                  disabled
                  className="lezada-button lezada-button--medium"
                >
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>
      </Col>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        discountedprice={discountedPrice}
        productprice={productPrice}
        cartitems={cartItems}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        // compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        deletefromwishlist={deleteFromWishlist}
        // addtocompare={addToCompare}
        // deletefromcompare={deleteFromCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

export default ProductGridList;
