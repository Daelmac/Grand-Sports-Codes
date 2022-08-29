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
  return discount && discount > 0 ? (price - price * (discount / 100)).toFixed(2) : parseInt(price).toFixed(2);
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product) => {
  let productInCart = cartItems.filter(
    (single) =>
      single.product_id === product.product_id
  )[0];
  if (cartItems.length >= 1 && productInCart) {
      return cartItems.filter((single) => product.product_id === single.product_id)[0].quantity;
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


// get individual categories
export const getIndividualCategories = (products) => {
  let productCategories = [];
  products &&
    products.map((product) => {
      return (
        productCategories.push(product.product_category)
      );
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};


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
