export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";

//login
export const setCurrentUser = (
  userDetails,
  addToast,
) => {
  return dispatch => {
   //try this to clear all local storage
    if (addToast) {
      if(Object.keys(userDetails).length === 0){
        addToast("Logout Successfully", { appearance: "success", autoDismiss: true });
        dispatch({ type: "DELETE_ALL_FROM_CART" })
        dispatch({ type: "DELETE_ALL_FROM_WISHLIST" });
      }
      else {
        addToast("Login Successfully", { appearance: "success", autoDismiss: true });
        dispatch({
          type: "UPDATE_CART",
          payload:JSON.parse(userDetails?.cart_data || "[]")  
        })
        dispatch({
          type: "UPDATE_WISHLIST",
          payload:JSON.parse(userDetails?.wishlist_data || "[]")  
        })
      };
    }

    dispatch({
      type: SET_CURRENT_USER,
      payload:userDetails
    });
  };
};

export const update_address = ( 
  address,
  addToast
  )=>{
    return dispatch => {
    if (addToast) {
      addToast("Address updated successfully", { appearance: "success", autoDismiss: true });  
    }
    console.log("rtghresa3333")
    dispatch({
      type: UPDATE_ADDRESS,
      payload:address
    });
  };
 
}
