import Link from "next/link";
const Navigation = () => {
  return (
    <nav className="header-content__navigation space-pr--15 space-pl--15 d-none d-lg-block">
      <ul>
        <li>
          <Link
            href="/"
            // as={process.env.PUBLIC_URL + "/"}
          >
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link
            href="/shop/all-products"
            // as={process.env.PUBLIC_URL + "/shop/all-products"}
          >
            <a>Products</a>
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            // as={process.env.PUBLIC_URL + "/about"}
          >
            <a>About Us</a>
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            // as={process.env.PUBLIC_URL + "/contact"}
          >
            <a>Contact Us</a>
          </Link>
        </li>
        <li>
          <Link
            href="/faq"
            // as={process.env.PUBLIC_URL + "/faq"}
          >
            <a>F.A.Q</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
