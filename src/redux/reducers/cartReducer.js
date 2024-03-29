import { v4 as uuidv4 } from "uuid";
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
  UPDATE_CART
} from "../actions/cartActions";
// import { useDispatch } from "react-redux";
// import {updateCartData} from "../../api/userApi"


const initState = [];

const cartReducer = (state = initState, action) => {
  const cartItems = state,
    product = action.payload;

  if (action.type === ADD_TO_CART) {
    // for non variant products
    console.log("in reducer",cartItems)
    console.log("in reducer product",product)
    const cartItem = cartItems.filter((item) => item.product_id === product.product_id)[0];
    if (cartItem === undefined) {
      return [
        ...cartItems,
        {
          ...product,
          quantity: product.quantity ? product.quantity : 1,
          cartItemId: uuidv4()
        }
      ];
    } else {
      return cartItems.map((item) =>
        item.cartItemId === cartItem.cartItemId
          ? {
              ...item,
              quantity: product.quantity
                ? item.quantity + product.quantity
                : item.quantity + 1
            }
          : item
      );
    }
  }

  if (action.type === DECREASE_QUANTITY) {
    if (product.quantity === 1) {
      const remainingItems = (cartItems, product) =>
        cartItems.filter(
          (cartItem) => cartItem.cartItemId !== product.cartItemId
        );
      return remainingItems(cartItems, product);
    } else {
      return cartItems.map((item) =>
        item.cartItemId === product.cartItemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
  }
  if(action.type === UPDATE_CART){
    let product_ids = product.map(a => a.product_id);
    let updated_cartItems=[]
    cartItems.map((item) =>{!(product_ids.includes(item.product_id)) && updated_cartItems.push(item)});
    Array.prototype.push.apply(updated_cartItems,product);
    return updated_cartItems
  }

  if (action.type === DELETE_FROM_CART) {
    const remainingItems = (cartItems, product) =>
      cartItems.filter(
        (cartItem) => cartItem.cartItemId !== product.cartItemId
      );
    return remainingItems(cartItems, product);
  }

  if (action.type === DELETE_ALL_FROM_CART) {
    return cartItems.filter((item) => {
      return false;
    });
  }
  return state;
};

export default cartReducer;
