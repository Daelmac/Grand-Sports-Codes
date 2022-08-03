import Link from "next/link";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
const Navigation = () => {
  return (
    <nav className="header-content__navigation space-pr--15 space-pl--15 d-none d-lg-block">
      <ul>
        <li>
          <Link href="/" as={process.env.PUBLIC_URL + "/"}>
            <a>Home</a> 
          </Link>
        </li>
        <li>
          <Link
            href="/shop/left-sidebar"
            as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
          >
            <a>Products</a>
          </Link>
        </li>
        <li>
          <Link href="/" as={process.env.PUBLIC_URL + "/"}>
            <a>My Orders</a>
          </Link>
        </li>
        <li>
        <Link
            href="/other/about"
            as={process.env.PUBLIC_URL + "/other/about"}
          >
                <a>About Us</a>
              </Link>
        </li>
        <li>
              <Link
                href="/other/contact"
                as={process.env.PUBLIC_URL + "/other/contact"}
              >
                <a>Contact Us</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/faq"
                as={process.env.PUBLIC_URL + "/other/faq"}
              >
                <a>F.A.Q</a>
              </Link>
            </li>
      </ul>
    </nav>
  );
};

export default Navigation;
