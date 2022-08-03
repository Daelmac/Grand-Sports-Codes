import Link from "next/link";
import {
    IoMdPerson,
  } from "react-icons/io";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { setCurrentUser } from "../../../redux/actions/userActions.js";
import Router from "next/router";

const AdminSidebar = ({
  setCurrentUser,
  adminDetails
}) => {
  const { addToast } = useToasts();
  const handleLogout=(e)=>{
    e.preventDefault();
    setCurrentUser({},addToast)
    Router.push("/admin/login");
  }
  return (
    <div className="col-2 px-1 position-fixed" id="sticky-sidebar" style={{backgroundColor: "#f8f8f8"}}>
      <nav
        id="sidebarMenu"
        className="collapse d-sm-block sidebar collapse vh-100"
      >
        
        <div className="position-sticky">
        <div className="header-content__logo d-flex align-items-center justify-content-center pt-5">
              <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                <a>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/grand_sports_logo.png"}
                    className="img-fluid"
                    alt=""
                  />
                </a>
              </Link>
            </div>
          <div className="list-group list-group-flush mx-3 mt-4">
            <ul>
             <li className="p-3 border-bottom">
                <Link href="/admin/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li className="p-3 border-bottom" >
                <Link href="/admin/orders">
                  <a>Orders</a>
                </Link>
              </li>
              <li className="p-3 border-bottom">
                <Link href="/admin/products">
                  <a>Products</a>
                </Link>
              </li>
              <li className="p-3 border-bottom">
                <Link href="/admin/vendors">
                  <a>Vendors</a>
                </Link>
              </li>
              <li className="p-3 border-bottom">
                <Link href="/admin/customers">
                  <a>customers</a>
                </Link>
              </li>
              <li className="pt-5 px-2">
                <Link href="/admin/profile">
                <span><IoMdPerson />{adminDetails?.email}</span>
                </Link>
                </li>
                {console.log("adminDetails==>",adminDetails)}
                <li className="pt-3 px-3">
                     <button className="lezada-button lezada-button--medium" onClick={handleLogout}>Logout</button> 
                </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    adminDetails: state.currentUserData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  setCurrentUser: (user, addToast) => {
      dispatch(setCurrentUser(user, addToast));
  },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSidebar);
