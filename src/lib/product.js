// get products
export const getProducts = (products, category, type, limit) => {
  const finalProducts = category
    ? products.filter(
        (product) => product.product_category=== category)
    : products;

  if (type && type === "new") {
    const newProducts = finalProducts.filter((single) => single.product_is_new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "best_sellers") {
    const bestSellersProducts = finalProducts.filter((single) => single.product_is_best_seller);
    return bestSellersProducts.slice(0, limit ? limit : bestSellersProducts.length);
  }
  if (type && type === "our_choice") {
    const featuredProducts = finalProducts.filter((single) => single.product_is_featured);
    return featuredProducts.slice(0, limit ? limit : featuredProducts.length);
  }
  if (type && type === "sale") {
    const saleItems =
      finalProducts &&
      finalProducts.filter((single) => single.product_discount && single.product_discount > 0);
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return (
    finalProducts &&
    finalProducts.slice(0, limit ? limit : finalProducts.length)
  );
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
  return discount && discount > 0 ? (price - price * (discount / 100)).toFixed(0) : price;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {
  let productInCart = cartItems.filter(
    (single) =>
      single.product_id === product.product_id &&
      (single.selectedProductColor
        ? single.selectedProductColor === color
        : true) &&
      (single.selectedProductSize ? single.selectedProductSize === size : true)
  )[0];
  if (cartItems.length >= 1 && productInCart) {
    if (product.variation) {
      return cartItems.filter(
        (single) =>
          single.product_id === product.product_id &&
          single.selectedProductColor === color &&
          single.selectedProductSize === size
      )[0].quantity;
    } else {
      return cartItems.filter((single) => product.product_id === single.product_id)[0].quantity;
    }
  } else {
    return 0;
  }
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  if (products && sortType && sortValue) {
    if (sortType === "category") {
      return products.filter(
        (product) =>
         product.product_category === sortValue);
    }
    // if (sortType === "tag") {
    //   return products.filter(
    //     (product) => product.tag.filter((single) => single === sortValue)[0]
    //   );
    // }
    // if (sortType === "color") {
    //   return products.filter(
    //     (product) =>
    //       product.variation &&
    //       product.variation.filter((single) => single.color === sortValue)[0]
    //   );
    // }
    // if (sortType === "size") {
    //   return products.filter(
    //     (product) =>
    //       product.variation &&
    //       product.variation.filter(
    //         (single) =>
    //           single.size.filter((single) => single.name === sortValue)[0]
    //       )[0]
    //   );
    // }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.product_price - a.product_price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.product_price - b.product_price;
        });
      }
    }
    if (sortType === "typeSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "newProducts") {
        return sortProducts.filter((product) => product.product_is_new); 
      }
      if (sortValue === "featuredProducts") {
        return sortProducts.filter((product) => product.product_is_featured); 
      }if (sortValue === "bestSellingProducts") {
        return sortProducts.filter((product) => product.product_is_best_seller); 
      }
    }
  }
  return products;
};

// get individual element
const getIndividualItemArray = (array) => {
  let individualItemArray = array.filter((v, i, self) => i === self.indexOf(v));
  return individualItemArray;
};

// get individual element object
// const getIndividualColorObjectArray = (array) => {
//   let individualObjectArray = array.filter((v, i, self) => {
//     return (
//       i ===
//       self.findIndex(
//         (t) => t.colorName === v.colorName && t.colorCode === v.colorCode
//       )
//     );
//   });
//   return individualObjectArray;
// };

// get individual categories
export const getIndividualCategories = (products) => {
  let productCategories = [];
  products &&
    products.map((product) => {
      return (
        productCategories.push(product.product_category)
        // product.category.map((single) => {
        //   return productCategories.push(single);
        // })
      );
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};

// get individual tags
// export const getIndividualTags = (products) => {
//   let productTags = [];
//   products &&
//     products.map((product) => {
//       return (
//         product.tag &&
//         product.tag.map((single) => {
//           return productTags.push(single);
//         })
//       );
//     });
//   const individualProductTags = getIndividualItemArray(productTags);
//   return individualProductTags;
// };

// get individual colors
// export const getIndividualColors = (products) => {
//   let productColors = [];
//   products &&
//     products.map((product) => {
//       return (
//         product.variation &&
//         product.variation.map((single) => {
//           return productColors.push({
//             colorName: single.color,
//             colorCode: single.colorCode
//           });
//         })
//       );
//     });
//   const individualProductColors = getIndividualColorObjectArray(productColors);
//   return individualProductColors;
// };

// get individual sizes
// export const getProductsIndividualSizes = (products) => {
//   let productSizes = [];
//   products &&
//     products.map((product) => {
//       return (
//         product.variation &&
//         product.variation.map((single) => {
//           return single.size.map((single) => {
//             return productSizes.push(single.name);
//           });
//         })
//       );
//     });
//   const individualProductSizes = getIndividualItemArray(productSizes);
//   return individualProductSizes;
// };

// get product individual sizes
// export const getIndividualSizes = (product) => {
//   let productSizes = [];
//   product.variation &&
//     product.variation.map((singleVariation) => {
//       return (
//         singleVariation.size &&
//         singleVariation.size.map((singleSize) => {
//           return productSizes.push(singleSize.name);
//         })
//       );
//     });
//   const individualSizes = getIndividualItemArray(productSizes);
//   return individualSizes;
// };

export const setActiveSort = (e) => {
  const filterButtons = document.querySelectorAll(
    ".single-sidebar-widget__list button, .tag-container button, .single-filter-widget__list button"
  );
  filterButtons.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = (e) => {
  const gridSwitchBtn = document.querySelectorAll(".grid-icons button");
  gridSwitchBtn.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};
