import Link from "next/link";
import { IoMdPerson } from "react-icons/io";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { setCurrentUser } from "../../../redux/actions/userActions.js";
import Router from "next/router";

const AdminSidebar = ({ setCurrentUser, adminDetails }) => {
  const { addToast } = useToasts();
  useEffect(() => {
    const offCanvasNav = document.querySelector(
      "#offcanvas-mobile-menu__navigation"
    );
    const offCanvasNavSubMenu =
      offCanvasNav.querySelectorAll(".mobile-sub-menu");
    const anchorLinks = offCanvasNav.querySelectorAll("a");

    for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
      offCanvasNavSubMenu[i].insertAdjacentHTML(
        "beforebegin",
        "<span class='menu-expand'><i></i></span>"
      );
    }

    const menuExpand = offCanvasNav.querySelectorAll(".menu-expand");
    const numMenuExpand = menuExpand.length;

    for (let i = 0; i < numMenuExpand; i++) {
      menuExpand[i].addEventListener("click", (e) => {
        sideMenuExpand(e);
      });
    }
  });

  const sideMenuExpand = (e) => {
    e.currentTarget.parentElement.classList.toggle("active");
  };
  const handleLogout = (e) => {
    e.preventDefault();
    setCurrentUser({}, addToast);
    Router.push("/admin/login");
  };
  return (
    <div className="col-2 px-1 position-fixed" id="sticky-sidebar">
      <div
        className="offcanvas-mobile-menu__content-wrapper"
        style={{ height: "100vh" }}
      >
        <div className="offcanvas-mobile-menu__content px-3 py-5">
          <nav
            className="offcanvas-mobile-menu__navigation"
            id="offcanvas-mobile-menu__navigation"
          >
            <div className="header-content__logo d-flex align-items-center justify-content-center mb-4">
              <Link href="/admin/dashboard" as={process.env.PUBLIC_URL + "/admin/dashboard"}>
                <a>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/grand_sports_logo.png"
                    }
                    className="img-fluid"
                    alt=""
                  />
                </a>
              </Link>
            </div>
            <ul>
              <li className="mb-2">
                <Link
                  href="/admin/dashboard"
                  as={process.env.PUBLIC_URL + "/admin/dashboard"}
                >
                  <a>Dashboard</a>
                </Link>
              </li>

              <li className="menu-item-has-children mb-2 ">
                <Link href="/admin/orders/all" as={process.env.PUBLIC_URL + "/admin/orders/all"}>
                  <a>Orders</a>
                </Link>
                <ul className="mobile-sub-menu">
                  <li>
                    <Link
                      href="/admin/orders/pending"
                      as={process.env.PUBLIC_URL + "/admin/orders/pending"}
                    >
                      <a>Pending Orders</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/orders/all"
                      as={process.env.PUBLIC_URL + "/admin/orders/all"}
                    >
                      <a>All orders</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children mb-2 ">
                <Link href="/admin/products/all" as={process.env.PUBLIC_URL + "/admin/products/all"}>
                  <a>Products</a>
                </Link>
                <ul className="mobile-sub-menu">
                  <li>
                    <Link
                      href="/admin/products/add"
                      as={process.env.PUBLIC_URL + "/admin/products/add"}
                    >
                      <a>Add Product</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/products/all"
                      as={process.env.PUBLIC_URL + "/admin/products/all"}
                    >
                      <a>All Products</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/products/featured"
                      as={process.env.PUBLIC_URL + "/admin/products/featured"}
                    >
                      <a>Featured Products</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/products/new"
                      as={process.env.PUBLIC_URL + "/admin/products/new"}
                    >
                      <a>New Products</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/products/bestseller"
                      as={process.env.PUBLIC_URL + "/admin/products/bestseller"}
                    >
                      <a>Best Selling Products</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="mb-2">
                <Link
                  href="/admin/customers"
                  as={process.env.PUBLIC_URL + "/admin/customers"}
                >
                  <a>Customers</a>
                </Link>
              </li>

              
              <li className="menu-item-has-children mb-2 ">
                <Link href="/admin/list" as={process.env.PUBLIC_URL + "/admin/list"}>
                  <a>Admins</a>
                </Link>
                <ul className="mobile-sub-menu">
                  <li>
                    <Link
                      href="/admin/add"
                      as={process.env.PUBLIC_URL + "/admin/add"}
                    >
                      <a>Add Admin</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/all"
                      as={process.env.PUBLIC_URL + "/admin/all"}
                    >
                      <a>All Admins</a>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* <li className="mt-5 text-center">
                  <span>
                    <IoMdPerson />
                    {adminDetails?.email}
                  </span>
              </li> */}
              <li className="pt-5 text-center">
                <button
                  className="lezada-button lezada-button--medium"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
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
