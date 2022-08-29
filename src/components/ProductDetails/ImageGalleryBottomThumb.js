import { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider } from "react-lightgallery";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosHeartEmpty
} from "react-icons/io";
import { Tooltip } from "react-tippy";

const ImageGalleryBottomThumb = ({
  product,
  wishlistItem,
  addToast,
  addToWishlist,
  deleteFromWishlist
}) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings


  return (
    <Fragment>
      <div className="product-large-image-wrapper space-mb--30">
        {/* floating badges */}
        <div className="product-large-image-wrapper__floating-badges">
          {product.product_discount && product.product_discount > 0 ? (
            <span className="onsale">-{product.product_discount}%</span>
          ) : (
            ""
          )}
          {product.new ? <span className="hot">New</span> : ""}
          {!product.product_is_available? <span className="out-of-stock">out</span> : ""}
        </div>

        {/* wishlist button */}
        <div className="product-details-button-wrapper">
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
              className={`wishlist-icon ${
                wishlistItem !== undefined ? "active" : ""
              }`}
            >
              <IoIosHeartEmpty />
            </button>
          </Tooltip>
        </div>
        <LightgalleryProvider>
                  <div>
                    <div className="single-image" style={{textAlign: 'center'}}>
                      <img
                       src={process.env.API_URL+product.product_image}
                        className="img-fluid"
                        alt=""
                        style={{maxHeight:"400px",width:"auto"}}
                      />
                    </div>
                  </div>
        </LightgalleryProvider>
      </div>
    </Fragment>
  );
};

export default ImageGalleryBottomThumb;
