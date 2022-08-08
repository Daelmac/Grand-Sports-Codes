import { setCurrentUser } from "../../redux/actions/userActions";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
const handle401 =()=>dispatch=> {
  console.log("dedewdewdfew")
  dispatch({ type: 'SET_CURRENT_USER' ,payload: {}});
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//       setCurrentUser: (user, addToast) => {
//         dispatch(setCurrentUser({}, addToast));
//       },
//     };
//   };
export default handle401;