import { Fragment,useState, useEffect} from "react";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import {
  getIndividualCategories,
  setActiveSort,
  getProducts,
  getDiscountPrice
} from "../../lib/product";


const ShopSidebar = ({ products, getSortParams,getSearchParam }) => {
  const categories = getIndividualCategories(products);
  const popularProducts = getProducts(products, "", "best_sellers", 5);

  return (
    <div className="shop-sidebar">
      <div className="single-sidebar-widget space-mb--40">
        {/* search widget */}
        <div className="search-widget">
          <form>
            <input type="search" placeholder="Search products ..."  onChange={(e)=>getSearchParam(e.target.value)}/>
            <button type="button">
              <IoIosSearch />
            </button>
          </form>
        </div>
      </div>

      {/* category list */}
      <div className="single-sidebar-widget space-mb--40">
        <h2 className="single-sidebar-widget__title space-mb--30">
          Categories
        </h2>
        {categories.length > 0 ? (
          <ul className="single-sidebar-widget__list single-sidebar-widget__list--category">
            <li>
              <button
                onClick={(e) => {
                  getSortParams("category", "");
                  setActiveSort(e);
                }}
                className="active"
              >
                All categories
              </button>
            </li>
            {categories.map((category, i) => {
              return (
                <li key={i}>
                  <button
                    onClick={(e) => {
                      getSortParams("category", category);
                      setActiveSort(e);
                    }}
                  >
                    {category}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>

      {/* popular products */}
      <div className="single-sidebar-widget space-mb--40">
        <h2 className="single-sidebar-widget__title space-mb--30">
          Popular products
        </h2>
        {popularProducts.length > 0 ? (
          <div className="widget-product-wrapper">
            {popularProducts.map((product, i) => {
              const discountedPrice = getDiscountPrice(
                product?.product_price,
                product?.product_discount
              )
              const productPrice = parseInt(product?.product_price).toFixed(2)
              return (
                <div className="single-widget-product-wrapper" key={i}>
                  <div className="single-widget-product">
                    <div className="single-widget-product__image">
                      <Link
                        href={`/shop/product/[id]`}
                        as={
                          process.env.PUBLIC_URL + "/shop/product/" + product.product_id
                        }
                      >
                        <a className="image-wrap">
                          <img
                             src={process.env.API_URL+product.product_image}
                              className="img-fluid"
                              alt={product.product_name}
                              style={{height:"100px",width:"auto"}}
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="single-widget-product__content">
                      <div className="single-widget-product__content__top">
                        <h3 className="product-title space-mb--10">
                          <Link
                            href={`/shop/product/[id]`}
                            as={
                              process.env.PUBLIC_URL + "/shop/product/" + product.product_id
                            }
                          >
                            <a>{product.product_name}</a>
                          </Link>
                        </h3>
                        <div className="price space-mb--10">
                          {product.product_discount && product.product_discount > 0 > 0 ? (
                            <Fragment>
                              <span className="main-price discounted">
                              &#8377; {productPrice}
                              </span>
                              <span className="discounted-price">
                              &#8377;{discountedPrice}
                              </span>
                            </Fragment>
                          ) : (
                            <span className="main-price">&#8377;{productPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          "No products found"
        )}
      </div>
    </div>
  );
};

export default ShopSidebar;
