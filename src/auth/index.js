import { connect } from "react-redux";

// let customerAuthenticated = false
// let adminAuthenticated = false
// let vendorAuthenticated = false

// const isCustomerAuthenticated = () =>{ return customerAuthenticated}
// const isAdminAuthenticated = () => { return adminAuthenticated}
// const isVendorAuthenticated = () => {return vendorAuthenticated}

// const authenticateCustomer = () => { 
//    customerAuthenticated = true
//    adminAuthenticated = false
//    vendorAuthenticated = false 
// }
// const authenticateAdmin = () => { 
//     customerAuthenticated = false
//     adminAuthenticated = true
//     vendorAuthenticated = false 
// }
// const authenticateVendor = () => { 
//     customerAuthenticated = false
//     adminAuthenticated = false
//     vendorAuthenticated = true 
// }

// const unauthenticateUser = () => {
//     customerAuthenticated = false
//     adminAuthenticated = false
//     vendorAuthenticated = false
// }

const authCheck = ({
    userDetails,
    role
  }) => {
    console.log("userDetails==>",userDetails)
    console.log("role==>",role)
  }
const mapStateToProps = (state) => {
    return {
      userDetails: state.currentUserData,
    };
  };
export default connect(mapStateToProps, null)(authCheck);