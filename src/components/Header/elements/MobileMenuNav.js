import { useEffect } from "react";
import Link from "next/link";

const MobileMenuNav = ({ getActiveStatus }) => {
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

    for (let i = 0; i < anchorLinks.length; i++) {
      anchorLinks[i].addEventListener("click", () => {
        getActiveStatus(false);
      });
    }
  });

  const sideMenuExpand = (e) => {
    e.currentTarget.parentElement.classList.toggle("active");
  };
  return (
    <nav
      className="offcanvas-mobile-menu__navigation"
      id="offcanvas-mobile-menu__navigation"
    >
      <ul>
        <li className="">
          <Link href="/" 
          // as={process.env.PUBLIC_URL + "/"}
          >
            <a>Home</a>
          </Link>
        </li>

        <li className="">
          <Link
            href="/shop/all-products"
            // as={process.env.PUBLIC_URL + "/shop/all-products"}
          >
            <a>Products</a>
          </Link>
        </li>

        {/* <li className="">
          <Link href="/">
            <a>My Orders</a>
          </Link>
        </li> */}
        <li>
          <Link href="/about" 
          // as={process.env.PUBLIC_URL + "/about"}
          >
            <a>About Us</a>
          </Link>
        </li>
        <li>
          <Link href="/contact" 
          // as={process.env.PUBLIC_URL + "/contact"}
          >
            <a>Contact Us</a>
          </Link>
        </li>
        <li>
          <Link href="/faq" 
          // as={process.env.PUBLIC_URL + "/faq"}
          >
            <a>F.A.Q</a>
          </Link>
        </li>
        {/* <li className="menu-item-has-children">
          <Link href="/" as={process.env.PUBLIC_URL + "/"}>
            <a>Pages</a>
          </Link>
          <ul className="mobile-sub-menu">
            <li>
              <Link
                href="/about"
                as={process.env.PUBLIC_URL + "/about"}
              >
                <a>About Us</a>
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                as={process.env.PUBLIC_URL + "/contact"}
              >
                <a>Contact Us</a>
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                as={process.env.PUBLIC_URL + "/faq"}
              >
                <a>F.A.Q</a>
              </Link>
            </li>
          </ul>
        </li> */}
      </ul>
    </nav>
  );
};

export default MobileMenuNav;
