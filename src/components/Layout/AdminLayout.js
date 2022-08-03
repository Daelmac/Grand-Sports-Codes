import { Fragment } from "react";
// import { AdminHeader} from "../Header";
import { FooterOne } from "../Footer";
import AdminSidebar from "./elements/AdminSidebar";

const AdminLayout = ({ children, aboutOverlay }) => {
  return (
    <Fragment>
      {/* <AdminHeader /> */}
      <div className="container-fluid">
        <div className="row">
          <AdminSidebar />
          <div className="col-10 offset-2" id="main">
            {children}
          </div>
        </div>
      </div>

      {/* <FooterOne /> */}
    </Fragment>
  );
};

export default AdminLayout;
