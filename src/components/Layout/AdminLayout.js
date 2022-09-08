import { Fragment } from "react";
// import { AdminHeader} from "../Header";
import { useEffect } from 'react'
import AdminNavbar from "./elements/AdminNavbar";
import AdminSidebar from "./elements/AdminSidebar";
import { connect } from "react-redux";
import Router from "next/router";

const AdminLayout = ({ children, userDetails,title }) => {
  useEffect(() => {
    if(!(userDetails && userDetails.role === 'admin')) Router.push('/admin/login')
  })
  return (
    <Fragment>
      {/* <AdminHeader /> */}
      <div className="container-fluid">
        <div className="row">
          <AdminSidebar />
          <div className="col-10 offset-2 p-0" id="main">
            <AdminNavbar title={title} />
            {children}
          </div>
        </div>
      </div>

    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    userDetails: state.currentUserData,
  };
};
export default connect(mapStateToProps, null)(AdminLayout);
