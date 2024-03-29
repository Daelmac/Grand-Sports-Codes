import {
  ADD_TO_WISHLIST,
  DELETE_FROM_WISHLIST,
  DELETE_ALL_FROM_WISHLIST,
  UPDATE_WISHLIST
} from "../actions/wishlistActions";

const initState = [];

const wishlistReducer = (state = initState, action) => {
  const wishlistItems = state,
    product = action.payload;

  if (action.type === ADD_TO_WISHLIST) {
    const wishlistItem = wishlistItems.filter(
      item => item.product_id === product.product_id
    )[0];
    if (wishlistItem === undefined) {
      return [...wishlistItems, product];
    } else {
      return wishlistItems;
    }
  }
  if(action.type === UPDATE_WISHLIST){
    let product_ids = product.map(a => a.product_id);
    let updated_wishlistItems=[]
    wishlistItems.map((item) =>{!(product_ids.includes(item.product_id)) && updated_wishlistItems.push(item)});
    Array.prototype.push.apply(updated_wishlistItems,product);
    return updated_wishlistItems
  }


  if (action.type === DELETE_FROM_WISHLIST) {
    const remainingItems = (wishlistItems, product) =>
      wishlistItems.filter(wishlistItem => wishlistItem.product_id !== product.product_id);
    return remainingItems(wishlistItems, product);
  }

  if (action.type === DELETE_ALL_FROM_WISHLIST) {
    return wishlistItems.filter(item => {
      return false;
    });
  }

  return wishlistItems;
};

export default wishlistReducer;
