import { useState, Fragment,useEffect } from "react";
import { IoIosHeartEmpty, IoIosShuffle } from "react-icons/io";
// import { ProductRating } from "../Product";
import { getProductCartQuantity } from "../../lib/product";

const ProductDescription = ({
  product,
  productPrice,
  discountedPrice,
  cartItems,
  wishlistItem,
  // compareItem,
  addToast,
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  // addToCompare,
  // deleteFromCompare
}) => {
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
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  return (
    
    <div className="product-content">
      <h2 className="product-content__title space-mb--20">{product.product_name}</h2>
      <div className="product-content__price space-mb--20">
        {product.product_discount > 0 ? (
          <Fragment>
            <span className="main-price discounted"> &#8377;{productPrice}</span>
            <span className="main-price"> &#8377;{discountedPrice}</span>
          </Fragment>
        ) : (
          <span className="main-price">&#8377;{productPrice} </span>
        )}
      </div>
      {/* <div className="product-content__description space-mb--30">
        <p>{product.product_description}</p>
      </div> */}

      
        <Fragment>
          <div className="product-content__quantity space-mb--40">
            <div className="product-content__quantity__title">Quantity</div>
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

          <div className="product-content__button-wrapper d-flex align-items-center">
            {product.product_is_available > 0 ? (
              <button
                onClick={() =>
                  addToCart(
                    product,
                    addToast,
                    quantityCount,
                    selectedProductColor,
                    selectedProductSize
                  )
                }
                className="lezada-button lezada-button--medium product-content__cart space-mr--10"
              >
                Add To Cart
              </button>
            ) : (
              <button
                className="lezada-button lezada-button--medium product-content__ofs space-mr--10"
                disabled
              >
                Out of Stock
              </button>
            )}

            <button
              className={`product-content__wishlist space-mr--10 ${
                wishlistItem !== undefined ? "active" : ""
              }`}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={
                wishlistItem !== undefined
                  ? () => deleteFromWishlist(product, addToast)
                  : () => addToWishlist(product, addToast)
              }
            >
              <IoIosHeartEmpty />
            </button>

            {/* <button
              className={`product-content__compare space-mr--10 ${
                compareItem !== undefined ? "active" : ""
              }`}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={
                compareItem !== undefined
                  ? () => deleteFromCompare(product, addToast)
                  : () => addToCompare(product, addToast)
              }
            >
              <IoIosShuffle />
            </button> */}
          </div>
        </Fragment>
      
    </div>
  );
};

export default ProductDescription;
