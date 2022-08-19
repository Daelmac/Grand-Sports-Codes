export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";

//login
export const setCurrentUser = (
  userDetails,
  addToast,
) => {
  return dispatch => {
    if (addToast) {
      console.log("DEdew",userDetails)
      if(Object.keys(userDetails).length === 0) addToast("Logout Successfully", { appearance: "success", autoDismiss: true });
      else addToast("Login Successfully", { appearance: "success", autoDismiss: true });
      
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
    dispatch({
      type: UPDATE_ADDRESS,
      payload:address
    });
  };
 
}
