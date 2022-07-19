import { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdExpand,
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
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade",
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <IoIosArrowBack />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <IoIosArrowForward />
      </button>
    )
  };
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
              className=""
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
          {/* <Swiper {...gallerySwiperParams}> */}
                  <div>
                    {/* <LightgalleryItem
                      group="any"
                      src={"http://"+product.product_image}
                    >
                      <Tooltip
                        title="Click to enlarge"
                        position="left"
                        trigger="mouseenter"
                        animation="shift"
                        arrow={true}
                        duration={200}
                      >
                        <button className="enlarge-icon">
                          <IoMdExpand />
                        </button>
                      </Tooltip>
                    </LightgalleryItem> */}
                    <div className="single-image">
                      <img
                       src={"http://"+product.product_image}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
               
          {/* </Swiper> */}
        </LightgalleryProvider>
      </div>
      {/* <div className="product-small-image-wrapper">
        <Swiper {...thumbnailSwiperParams}>
                <div >
                  <div className="single-image">
                    <img
                      src={"http://"+product.product_image}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
        </Swiper>
      </div> */}
    </Fragment>
  );
};

export default ImageGalleryBottomThumb;
