// import { v4 as uuidv4 } from "uuid";
import {
  SET_CURRENT_USER,
  UPDATE_ADDRESS
} from "../actions/userActions.js";

const initState = {};

const userReducer = (state = initState, action) => {
  const userDetails = state,
  userpayload = action.payload;

  if (action.type === SET_CURRENT_USER) {
    // for non variant products

     return userpayload
  }
  if (action.type === UPDATE_ADDRESS) {
     userDetails.address = userpayload
     return userDetails
  }  
  return state;
};

export default userReducer;
