import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { LayoutTwo } from "../../../components/Layout";
import { getDiscountPrice } from "../../../lib/product";
import { BreadcrumbOne } from "../../../components/Breadcrumb";
import {
  ImageGalleryBottomThumb,
  ProductDescription,
  ProductDescriptionTab,
} from "../../../components/ProductDetails";
import { addToCart } from "../../../redux/actions/cartActions";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../../redux/actions/wishlistActions";
import { useRouter } from "next/router";
// import {
//   addToCompare,
//   deleteFromCompare
// } from "../../../redux/actions/compareActions";
import { getProductByID } from "../../../api/productApi";

const ProductBasic = ({
  cartItems,
  wishlistItems,
  // compareItems,
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  // addToCompare,
  // deleteFromCompare
}) => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState({});
  const { addToast } = useToasts();

  useEffect(async () => {
    const data = await getProductByID(id);
    if(data){
      if (data.status === "success") {
        setProduct(data);
      } 
    }else{
      addToast("Some problem occurred,please try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    document.querySelector("body").classList.remove("overflow-hidden");
  }, []);
  
  const discountedPrice = getDiscountPrice(
    product?.product_price,
    product?.product_discount
  );

  const productPrice = parseInt(product?.product_price).toFixed(2);
  const cartItem = cartItems.filter(
    (cartItem) => cartItem.product_id === product?.product_id
  )[0];
  const wishlistItem = wishlistItems.filter(
    (wishlistItem) => wishlistItem.product_id === product?.product_id
  )[0];
  // const compareItem = compareItems.filter(
  //   (compareItem) => compareItem.id === product.product_id
  // )[0];

  return (
    <LayoutTwo aboutOverlay={false}>
      {/* breadcrumb */}
      {/* <BreadcrumbOne
        pageTitle={product.name}
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
      >
      </BreadcrumbOne> */}

      {/* product details */}
      {console.log(Object.keys(product).length === 0)}
      <div className="product-details space-mt--r130 space-mb--r100">
      {(Object.keys(product).length != 0)?
      <Container>
        <Row>
          <Col lg={6} className="space-mb-mobile-only--50">
            {/* image gallery bottom thumb */}
            <ImageGalleryBottomThumb
              product={product}
              wishlistItem={wishlistItem}
              addToast={addToast}
              addToWishlist={addToWishlist}
              deleteFromWishlist={deleteFromWishlist}
            />
          </Col>

          <Col lg={6}>
            {/* product description */}
            <ProductDescription
              product={product}
              productPrice={productPrice}
              discountedPrice={discountedPrice}
              cartItems={cartItems}
              cartItem={cartItem}
              wishlistItem={wishlistItem}
              // compareItem={compareItem}
              addToast={addToast}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              deleteFromWishlist={deleteFromWishlist}
              // addToCompare={addToCompare}
              // deleteFromCompare={deleteFromCompare}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {/* product description tab */}
            <ProductDescriptionTab product={product} />
          </Col>
        </Row>
      </Container>
    :
    <span className="d-flex align-items-center justify-content-center">Product not found</span>
    }
    </div>
    </LayoutTwo>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    // compareItems: state.compareData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    deleteFromWishlist: (item, addToast) => {
      dispatch(deleteFromWishlist(item, addToast));
    },
    // addToCompare: (item, addToast) => {
    //   dispatch(addToCompare(item, addToast));
    // },
    // deleteFromCompare: (item, addToast) => {
    //   dispatch(deleteFromCompare(item, addToast));
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductBasic);
