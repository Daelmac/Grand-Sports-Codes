// import { v4 as uuidv4 } from "uuid";
import {
  SET_CURRENT_USER,
  LOGOUT_USER
} from "../actions/userActions.js";

const initState = {};

const userReducer = (state = initState, action) => {
  const userDetails = state,
  userDetailspayload = action.payload;

  if (action.type === SET_CURRENT_USER) {
    // for non variant products
     return userDetailspayload
  }
  return state;
};

export default userReducer;
