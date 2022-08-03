export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const LOGOUT_USER = "LOGOUT_USER";

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
