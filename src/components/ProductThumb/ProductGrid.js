import { Fragment, useState } from "react";
import { Col } from "react-bootstrap";
import Link from "next/link";
import { IoIosHeartEmpty, IoIosShuffle, IoIosSearch } from "react-icons/io";
import { Tooltip } from "react-tippy";
import ProductModal from "./ProductModal";

const ProductGrid = ({
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
  cartItems,
  column
}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Fragment>
      <Col
        lg={column && column === 4 ? 3 : 4}
        md={6}
        className={bottomSpace ? bottomSpace : "" + "card-space"}
      >
        <div className="product-grid">
          {/*=======  single product image  =======*/}
          <div className="product-grid__image">
            <Link
              href={`shop/product/[id]`}
              as={
                process.env.PUBLIC_URL + "/shop/product/" + product.product_id
              }
            >
              <div className="image-wrap" style={{cursor: 'pointer',textAlign: 'center'}}>
                <img
                  src={process.env.API_URL+product.product_image}
                  className="img-fluid"
                  alt={product.product_name}
                  style={{height:"170px",width:"170px",objectFit: "contain"}}
                />
              </div>
            </Link>
            <div className="product-grid__floating-badges">
              {product.product_discount && product.product_discount > 0 ? (
                <span className="onsale">-{product.product_discount}%</span>
              ) : (
                ""
              )}
              {product.product_is_new ? <span className="hot">New</span> : ""}
              {product.product_is_available === false ? (
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
              href={`shop/product/[id]`}
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

export default ProductGrid;
