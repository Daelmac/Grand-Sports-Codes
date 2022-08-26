import { useState, useEffect, Fragment } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";
import { connect } from "react-redux";
import {
  IoIosSearch,
  IoMdPerson,
  IoIosHeartEmpty,
  IoIosCart,
  IoIosMenu
} from "react-icons/io";
import Navigation from "./elements/Navigation";
import AboutOverlay from "./elements/AboutOverlay";
import SearchOverlay from "./elements/SearchOverlay";
import CartOverlay from "./elements/CartOverlay";
import WishlistOverlay from "./elements/WishlistOverlay";
import NavDropdown from 'react-bootstrap/NavDropdown';
import MobileMenu from "./elements/MobileMenu";
import { useToasts } from "react-toast-notifications";
import { setCurrentUser } from "../../redux/actions/userActions";
import Router from "next/router";


const HeaderOne = ({ aboutOverlay, cartItems, wishlistItems,userDetails,setCurrentUser }) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [offCanvasAboutActive, setOffCanvasAboutActive] = useState(false);
  const [offCanvasSearchActive, setOffCanvasSearchActive] = useState(false);
  const [offCanvasCartActive, setOffCanvasCartActive] = useState(false);
  const [offCanvasWishlistActive, setOffCanvasWishlistActive] = useState(false);
  const [offCanvasMobileMenuActive, setOffCanvasMobileMenuActive] = useState(
    false
  );
  const { addToast } = useToasts();
  const handleLogout=(e)=>{
    e.preventDefault();
    setCurrentUser({},addToast)
    Router.push("/login-register");
  }
  useEffect(() => {
    const header = document.querySelector("header");
    setHeaderTop(header.offsetTop);
    setHeaderHeight(header.offsetHeight);
    window.addEventListener("scroll", handleScroll);
    scroll > headerTop
      ? (document.body.style.paddingTop = `${headerHeight}px`)
      : (document.body.style.paddingTop = 0);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <Fragment>
      <header
        className={`topbar-shadow ${scroll > headerTop ? "is-sticky" : ""}`}
      >
        <Container className="wide">
          <div className="header-content d-flex align-items-center justify-content-between position-relative space-py-mobile-only--30">
            {/* logo */}
            <div className="header-content__logo d-flex align-items-center space-pr--15">
              <button
                onClick={() => {
                  setOffCanvasAboutActive(true);
                  document
                    .querySelector("body")
                    .classList.add("overflow-hidden");
                }}
                className={`${
                  aboutOverlay === false
                    ? "d-none"
                    : "about-overlay-trigger d-none d-lg-block"
                }`}
              >
                <IoIosMenu />
              </button>
              <Link href="/" 
              // as={process.env.PUBLIC_URL + "/"}
              >
                <a>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/grand_sports_logo.png"}
                    className="img-fluid"
                    alt=""
                  />
                </a>
              </Link>
            </div>

            {/* navigation */}
            <Navigation />

            {/* icons */}
            <div className="header-content__icons space-pl--15">
              <ul className="d-none d-lg-block">
                <li>
                  <button
                    onClick={() => {
                      setOffCanvasSearchActive(true);
                      document
                        .querySelector("body")
                        .classList.add("overflow-hidden");
                    }}
                  >
                    <IoIosSearch />
                  </button>
                </li>
                <li>
                  {userDetails && userDetails.role === 'customer'?
                  <>
          {/* <NavDropdown
              id="nav-dropdown-dark-example"
              title={<span><IoMdPerson />{userDetails.user_name}</span>}
              menuVariant="dark"
            >
              <NavDropdown.Item  onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown> */}
            <Link
                    href="/my-account"
                    // as={process.env.PUBLIC_URL + "/my-account"}
                  >
                    <a>
                      <IoMdPerson />{userDetails.user_name}
                    </a>
                  </Link>
                  
                  </>
                  :
                  <Link
                    href="/login-register"
                    // as={process.env.PUBLIC_URL + "/login-register"}
                  >
                    <a>
                      <IoMdPerson />
                    </a>
                  </Link>
                  }
                  
                </li>
                <li>
                  <button
                    onClick={() => {
                      setOffCanvasWishlistActive(true);
                      document
                        .querySelector("body")
                        .classList.add("overflow-hidden");
                    }}
                  >
                    <IoIosHeartEmpty />
                    {wishlistItems.length >= 1 ? (
                      <span className="count">
                        {wishlistItems.length ? wishlistItems.length : ""}
                      </span>
                    ) : (
                      ""
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setOffCanvasCartActive(true);
                      document
                        .querySelector("body")
                        .classList.add("overflow-hidden");
                    }}
                  >
                    <IoIosCart />
                    {cartItems.length >= 1 ? (
                      <span className="count">
                        {cartItems.length ? cartItems.length : ""}
                      </span>
                    ) : (
                      ""
                    )}
                  </button>
                </li>
              </ul>

              <ul className="d-block d-lg-none">
                <li>
                  <Link
                    href="/wishlist"
                    as={process.env.PUBLIC_URL + "/wishlist"}
                  >
                    <a>
                      <IoIosHeartEmpty />
                      {wishlistItems.length >= 1 ? (
                        <span className="count">
                          {wishlistItems.length ? wishlistItems.length : ""}
                        </span>
                      ) : (
                        ""
                      )}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    // as={process.env.PUBLIC_URL + "/cart"}
                  >
                    <a>
                      <IoIosCart />
                      {cartItems.length >= 1 ? (
                        <span className="count">
                          {cartItems.length ? cartItems.length : ""}
                        </span>
                      ) : (
                        ""
                      )}
                    </a>
                  </Link>
                </li>
                <li>
                  <button onClick={() => setOffCanvasMobileMenuActive(true)}>
                    <IoIosMenu />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </header>

      {/* about overlay */}
      {aboutOverlay === false ? (
        ""
      ) : (
        <AboutOverlay
          activeStatus={offCanvasAboutActive}
          getActiveStatus={setOffCanvasAboutActive}
        />
      )}
      {/* search overlay */}
      <SearchOverlay
        activeStatus={offCanvasSearchActive}
        getActiveStatus={setOffCanvasSearchActive}
      />

      {/* cart overlay */}
      <CartOverlay
        activeStatus={offCanvasCartActive}
        getActiveStatus={setOffCanvasCartActive}
      />

      {/* wishlist overlay */}
      <WishlistOverlay
        activeStatus={offCanvasWishlistActive}
        getActiveStatus={setOffCanvasWishlistActive}
      />
      {/* Mobile Menu */}
      <MobileMenu
        activeStatus={offCanvasMobileMenuActive}
        getActiveStatus={setOffCanvasMobileMenuActive}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    userDetails: state.currentUserData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  setCurrentUser: (user, addToast) => {
      dispatch(setCurrentUser(user, addToast));
  },
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(HeaderOne);
