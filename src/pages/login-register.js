import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { LayoutTwo } from "../components/Layout";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { setCurrentUser } from "../redux/actions/userActions";
import Router from "next/router";
import { CustomerLogin, CreateCustomer } from "../api/userApi";
import { useEffect, useState } from "react";
import { EmailRegX } from "../core/utils";

const LoginRegister = ({ setCurrentUser, userDetails }) => {
  useEffect(() => {
    if (userDetails && userDetails.role === "customer") Router.push("/");
  });
  const { addToast } = useToasts();
  const [user, setUSer] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailErrMsg: "",
    passwordErrMsg: "",
    serverErrMsg: "",
  });

  const [newUser, setNewUSer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [newUserErrors, setNewUSerErrors] = useState({
    firstNameErrMsg: "",
    lastNameErrMsg: "",
    emailErrMsgErrMsg: "",
    passwordErrMsg: "",
    confirmPassword: "",
    serverErrMsg: "",
  });
  const intNewUser = () => {
    let userBlank = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    setNewUSer(userBlank);
  };
  const handleChange = (event) => {
    initValidation();
    const { name, value } = event.target;
    setUSer({ ...user, [name]: value });
  };
  const handleRegisterUserChange = async (event) => {
    initNewUSerValidation();
    const { name, value } = event.target;
    setNewUSer({ ...newUser, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const response = await CustomerLogin(user);
      if (response) {
        if (response.status === "success" && response.role === "customer") {
          setCurrentUser(response, addToast);
          Router.push("/");
        } else {
          setErrors({ ...errors, serverErrMsg: response.status_message });
        }
      } else {
        setErrors({
          ...errors,
          serverErrMsg: "something went wrong,please try again",
        });
      }
    }
  };
  const onRegisterUser = async (event) => {
    event.preventDefault();
    if (registerUSerValidation()) {
      console.log(newUser);
      const response = await CreateCustomer(newUser);
      if (response) {
        if (response.status === "success") {
          addToast("Registered Successfully.Please log in.", {
            appearance: "success",
            autoDismiss: true,
          });
          intNewUser();
          // Router.push("/login-register");
        } else {
          setNewUSerErrors({
            ...newUserErrors,
            serverErrMsg: response.status_message,
          });
        }
      } else {
        setNewUSerErrors({
          ...newUserErrors,
          serverErrMsg: "something went wrong,please try again",
        });
      }
    }
  };
  const initValidation = () => {
    const errors = {
      emailErrMsg: "",
      passwordErrMsg: "",
      serverErrMsg: "",
    };
    setErrors(errors);
  };
  const initNewUSerValidation = () => {
    const errors = {
      firstNameErrMsg: "",
      lastNameErrMsg: "",
      emailErrMsgErrMsg: "",
      passwordErrMsg: "",
      confirmPassword: "",
      serverErrMsg: "",
    };
    setNewUSerErrors(errors);
  };
  const validate = () => {
    let errors = {};
    let isValid = true;
    if (!user["email"]) {
      isValid = false;
      errors["emailErrMsg"] = "Please enter your email Address.";
    }

    if (typeof user["email"] !== "undefined") {
      if (!EmailRegX.test(user["email"])) {
        isValid = false;
        errors["emailErrMsg"] = "Please enter valid email address.";
      }
    }

    if (!user["password"]) {
      isValid = false;
      errors["passwordErrMsg"] = "Please enter your password.";
    }

    setErrors(errors);
    return isValid;
  };

  const registerUSerValidation = () => {
    let errors = {};
    let isValid = true;
    if (!newUser["firstName"]) {
      isValid = false;
      errors["firstNameErrMsg"] = "Please enter your first name.";
    }
    if (!newUser["lastName"]) {
      isValid = false;
      errors["lastNameErrMsg"] = "Please enter your last name.";
    }
    if (!newUser["email"]) {
      isValid = false;
      errors["emailErrMsg"] = "Please enter your email Address.";
    }
    if (typeof newUser["email"] !== "undefined") {
      if (!EmailRegX.test(newUser["email"])) {
        isValid = false;
        errors["emailErrMsg"] = "Please enter valid email address.";
      }
    }
    if (!newUser["password"] || newUser["password"].length < 6) {
      isValid = false;
      errors["passwordErrMsg"] = "Password must be at least 6 characters.";
    }
    if (
      !newUser["confirmPassword"] ||
      newUser["confirmPassword"] != newUser["password"]
    ) {
      isValid = false;
      errors["confirmPasswordErrMsg"] =
        "Password and confirm password must be the same";
    }

    setNewUSerErrors(errors);
    return isValid;
  };

  return (
    <LayoutTwo aboutOverlay={false}>
      {/* breadcrumb */}
      {/* <BreadcrumbOne
        pageTitle="Customer Login"
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-2.jpg"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Customer Login</li>
        </ul>
      </BreadcrumbOne> */}
      <div className="login-area space-mt--80 space-mb--r80">
        <Container>
          <Row>
            <Col lg={6} className="space-mb-mobile-only--50">
              <div className="lezada-form login-form">
                <form>
                  <Row>
                    <Col lg={12}>
                      <div className="section-title--login text-center space-mb--50">
                        <h2 className="space-mb--20">Login</h2>
                        <p>Great to have you back!</p>
                      </div>
                    </Col>
                    <Col lg={12} className="space-mb--60">
                      <input
                        type="text"
                        name="email"
                        value={user.email}
                        placeholder="email address"
                        onChange={handleChange}
                        required
                      />
                      <span className="error-text">{errors.emailErrMsg}</span>
                    </Col>
                    <Col lg={12} className="space-mb--60">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        required
                        onChange={handleChange}
                      />
                      <span className="error-text">
                        {errors.passwordErrMsg}
                      </span>
                    </Col>
                    <span className="error-text ml-3 mb-3">
                      {errors.serverErrMsg}
                    </span>
                    <Col lg={12} className="space-mb--30">
                      <button
                        className="lezada-button lezada-button--medium"
                        onClick={handleSubmit}
                      >
                        login
                      </button>
                    </Col>
                    <Col>
                      {/* <input type="checkbox" />{" "} */}
                      {/* <span className="remember-text">Remember me</span> */}
                      <Link
                        href="/forgot-password"
                        as={process.env.PUBLIC_URL + "/forgot-password"}
                      >
                        <a className="reset-pass-link">Lost your password?</a>
                      </Link>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
            <Col lg={6}>
              <div className="lezada-form login-form--register">
                <form>
                  <Row>
                    <Col lg={12}>
                      <div className="section-title--login text-center space-mb--50">
                        <h2 className="space-mb--20">Register</h2>
                        <p>If you don’t have an account, register now!</p>
                      </div>
                    </Col>
                    <Col lg={6} className="space-mb--30">
                      <label htmlFor="regFirstName">
                        First Name <span className="required">*</span>{" "}
                      </label>
                      <input
                        type="text"
                        id="regFirstName"
                        name="firstName"
                        placeholder="First Name"
                        value={newUser.firstName}
                        required
                        onChange={handleRegisterUserChange}
                      />
                      <span className="error-text">
                        {newUserErrors.firstNameErrMsg}
                      </span>
                    </Col>
                    <Col lg={6} className="space-mb--30">
                      <label htmlFor="regLastName">
                        Last Name <span className="required">*</span>{" "}
                      </label>
                      <input
                        type="text"
                        id="regLastName"
                        name="lastName"
                        placeholder="Last Name"
                        value={newUser.lastName}
                        required
                        onChange={handleRegisterUserChange}
                      />
                      <span className="error-text">
                        {newUserErrors.lastNameErrMsg}
                      </span>
                    </Col>
                    <Col lg={12} className="space-mb--30">
                      <label htmlFor="regEmail">
                        Email Address <span className="required">*</span>{" "}
                      </label>
                      <input
                        type="text"
                        id="regEmail"
                        name="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={handleRegisterUserChange}
                        required
                      />
                      <span className="error-text">
                        {newUserErrors.emailErrMsg}
                      </span>
                    </Col>
                    <Col lg={12} className="space-mb--50">
                      <label htmlFor="regPassword">
                        Password <span className="required">*</span>{" "}
                      </label>
                      <input
                        type="password"
                        id="regPassword"
                        name="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={handleRegisterUserChange}
                        required
                      ></input>
                      <span className="error-text">
                        {newUserErrors.passwordErrMsg}
                      </span>
                    </Col>
                    <Col lg={12} className="space-mb--50">
                      <label htmlFor="regConfirmPassword">
                        confirm Password <span className="required">*</span>{" "}
                      </label>
                      <input
                        type="password"
                        id="regConfirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={newUser.confirmPassword}
                        onChange={handleRegisterUserChange}
                        required
                      />
                      <span className="error-text">
                        {newUserErrors.confirmPasswordErrMsg}
                      </span>
                    </Col>
                    <span className="error-text ml-3 mb-3">
                      {newUserErrors.serverErrMsg}
                    </span>
                    <Col lg={12} className="text-center">
                      <button
                        className="lezada-button lezada-button--medium"
                        onClick={onRegisterUser}
                      >
                        register
                      </button>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutTwo>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user, addToast) => {
      dispatch(setCurrentUser(user, addToast));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    userDetails: state.currentUserData,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);
