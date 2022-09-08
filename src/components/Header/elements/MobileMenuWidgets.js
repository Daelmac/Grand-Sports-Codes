import {
  IoIosPhonePortrait,
  IoMdMap,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoPinterest,
  IoMdPerson,
} from "react-icons/io";
import { connect } from "react-redux";

import Link from "next/link";

const MobileMenuWidgets = ({ userDetails }) => {
  return (
    <div className="offcanvas-mobile-menu__widgets">
      <div className="contact-widget space-mb--30">
        <ul>
          {userDetails && userDetails.role === "customer" ? (
            <li>
              <IoMdPerson />
              <Link
                href="/my-account"
                as={process.env.PUBLIC_URL + "/my-account"}
              >
                <a>{userDetails.user_name}</a>
              </Link>
            </li>
          ) : (
            <li>
              <IoMdPerson />
              <Link
                href="/login-register"
                as={process.env.PUBLIC_URL + "/login-register"}
              >
                <a>Login / Register</a>
              </Link>
            </li>
          )}
          <li>
            <IoIosPhonePortrait />
            <a href="tel://12452456012">09842457070 </a>
          </li>
          <li>
            <a href="https://www.bing.com/local?lid=YN4070x2983366771194713127&id=YN4070x2983366771194713127&q=Grand+Sports&name=Grand+Sports&cp=12.988471031188965%7e80.22264862060547&ppois=12.988471031188965_80.22264862060547_Grand+Sports">
              <IoMdMap />
              No 4, Velachery Main Road, Anna Garden, Velachery, Chennai, Tamil
              Nadu,600042
            </a>
          </li>
        </ul>
      </div>

      <div className="social-widget">
        <a href="https://www.instagram.com/grandsports_/" target="_blank">
          <IoLogoInstagram />
        </a>
        <a href="https://www.facebook.com/grandsportschennai/" target="_blank">
          <IoLogoFacebook />
        </a>
        {/* <a href="https://www.pinterest.com" target="_blank">
          <IoLogoPinterest />
        </a> */}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userDetails: state.currentUserData,
  };
};

export default connect(mapStateToProps)(MobileMenuWidgets);
