import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import CustomScroll from "react-custom-scroll";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../../lib/product";
import { deleteFromWishlist } from "../../../redux/actions/wishlistActions";
import {updateWishlistData} from "../../../api/userApi"
import { useEffect,useState,useRef  } from "react";

const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

const WishlistOverlay = ({
  activeStatus,
  getActiveStatus,
  wishlistItems,
  deleteFromWishlist,
  userDetails 
}) => {
  const { addToast } = useToasts();
  const isMount = useIsMount();
  
  useEffect(
    async()=>{
      if(userDetails && userDetails.role === "customer"){
        if (!isMount) {
          await updateWishlistData(userDetails,JSON.stringify(wishlistItems));
        }
      }
    },[wishlistItems])
  return (
    <div className={`wishlist-overlay ${activeStatus ? "active" : ""}`}>
      <div
        className="wishlist-overlay__close"
        onClick={() => {
          getActiveStatus(false);
          document.querySelector("body").classList.remove("overflow-hidden");
        }}
      />
      <div className="wishlist-overlay__content">
        {/*=======  close icon  =======*/}
        <button
          className="wishlist-overlay__close-icon"
          onClick={() => {
            getActiveStatus(false);
            document.querySelector("body").classList.remove("overflow-hidden");
          }}
        >
          <IoIosClose />
        </button>
        {/*=======  offcanvas wishlist content container  =======*/}
        <div className="wishlist-overlay__content-container">
          <h3 className="wishlist-title">Wishlist</h3>
          {wishlistItems.length >= 1 ? (
            <div className="wishlist-product-wrapper">
              <div className="wishlist-product-container">
                <CustomScroll allowOuterScroll={true}>
                  {wishlistItems.map((product, i) => {
                    const discountedPrice = getDiscountPrice(
                      product?.product_price,
                      product?.product_discount
                    )
                    return (
                      <div className="single-wishlist-product" key={i}>
                        <span className="wishlist-close-icon">
                          <button
                            onClick={() =>
                              deleteFromWishlist(product, addToast)
                            }
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
                                src={process.env.API_URL+product.product_image}
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
              {/*=======  wishlist buttons  =======*/}
              <div className="wishlist-buttons">
                <Link
                  href="/wishlist"
                  as={process.env.PUBLIC_URL + "/wishlist"}
                >
                  <a>view wishlist</a>
                </Link>
              </div>
            </div>
          ) : (
            "No items found in wishlist"
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    wishlistItems: state.wishlistData,
    userDetails: state.currentUserData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromWishlist: (item, addToast) => {
      dispatch(deleteFromWishlist(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistOverlay);
