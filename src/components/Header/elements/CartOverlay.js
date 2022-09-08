import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import CustomScroll from "react-custom-scroll";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../../lib/product";
import { deleteFromCart } from "../../../redux/actions/cartActions";
import { useEffect,useState,useRef  } from "react";
import {updateCartData} from "../../../api/userApi"

const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

const CartOverlay = ({
  activeStatus,
  getActiveStatus,
  cartItems,
  userDetails,
  deleteFromCart
}) => {
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  const isMount = useIsMount();
  useEffect(
    async()=>{
      if(userDetails && userDetails.role === "customer"){
        if (!isMount) {
          await updateCartData(userDetails,JSON.stringify(cartItems));
        }
      }
    },[cartItems])
  return (
    <div className={`cart-overlay ${activeStatus ? "active" : ""}`}>
      <div
        className="cart-overlay__close"
        onClick={() => {
          getActiveStatus(false);
          document.querySelector("body").classList.remove("overflow-hidden");
        }}
      />
      <div className="cart-overlay__content">
        {/*=======  close icon  =======*/}
        <button
          className="cart-overlay__close-icon"
          onClick={() => {
            getActiveStatus(false);
            document.querySelector("body").classList.remove("overflow-hidden");
          }}
        >
          <IoIosClose />
        </button>
        {/*=======  offcanvas cart content container  =======*/}
        <div className="cart-overlay__content-container">
          <h3 className="cart-title">Cart</h3>
          {cartItems.length >= 1 ? (
            <div className="cart-product-wrapper">
              <div className="cart-product-container">
                <CustomScroll allowOuterScroll={true}>
                  {cartItems.map((product, i) => {
                    const discountedPrice = getDiscountPrice(
                      product?.product_price,
                      product?.product_discount
                    )

                    cartTotalPrice += discountedPrice * product.quantity;

                    return (
                      <div className="single-cart-product" key={i}>
                        <span className="cart-close-icon">
                          <button
                            onClick={() => deleteFromCart(product, addToast)}
                          >
                            <IoIosClose />
                          </button>
                        </span>
                        <div className="image">
                          <Link
                            href={`/shop/product/[id]?id=${product.product_id}`}
                            as={`${process.env.PUBLIC_URL}/shop/product/${product.product_id}`}
                          >
                            <a>
                              <img
                                src={
                                  process.env.API_URL+product.product_image
                                }
                                className="img-fluid"
                                alt=""
                              />
                            </a>
                          </Link>
                        </div>
                        <div className="content">
                          <h5>
                            <Link
                              href={`/shop/product/[id]?id=${product.product_id}`}
                              as={`${process.env.PUBLIC_URL}/shop/product/${product.product_id}`}
                            >
                              <a>{product.product_name}</a>
                            </Link>
                          </h5>
                          <p>
                            <span className="cart-count">
                              {product.quantity} x{" "}
                            </span>{" "}
                            <span className="discounted-price">
                            &#8377;{discountedPrice}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CustomScroll>
              </div>
              {/*=======  subtotal calculation  =======*/}
              <p className="cart-subtotal">
                <span className="subtotal-title">Subtotal:</span>
                <span className="subtotal-amount">
                &#8377;{cartTotalPrice.toFixed(2)}
                </span>
              </p>
              {/*=======  cart buttons  =======*/}
              <div className="cart-buttons">
                <Link
                  href="/cart"
                  as={process.env.PUBLIC_URL + "/cart"}
                >
                  view cart
                </Link>
                <Link
                  href="/checkout"
                  as={process.env.PUBLIC_URL + "/checkout"}
                >
                  checkout
                </Link>
              </div>
              {/*=======  free shipping text  =======*/}
              {/* <p className="free-shipping-text">
                Free Shipping on All Orders Over &#8377;999!
              </p> */}
            </div>
          ) : (
            "No items found in cart"
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    userDetails: state.currentUserData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
