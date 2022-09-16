import { useState } from "react";
import { AdminLayout } from "../../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { CreateAdmin} from "../../api/userApi";
import Router from "next/router";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {EmailRegX} from "../../core/utils"

const AddAdmin = () => {
  const { addToast } = useToasts();
  const [newAdmin, setNewAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [newAdminErrors, setNewAdminErrors] = useState({
    firstNameErrMsg: "",
    lastNameErrMsg: "",
    emailErrMsgErrMsg: "",
    passwordErrMsg: "",
    confirmPassword: "",
    serverErrMsg: "",
  });
  const initNewAdmin = () => {
    let userBlank = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    setNewAdmin(userBlank);
  };
  const handleRegisterAdminChange = async (event) => {
    initNewAdminValidation();
    const { name, value } = event.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };
  const onRegisterAdmin = async (event) => {
    event.preventDefault();
    if (registerUSerValidation()) {
      const response = await CreateAdmin(newAdmin);
      if(response){
      if (response.status === "success") {
        addToast("Registered Successfully.", {
          appearance: "success",
          autoDismiss: true,
        });
        initNewAdmin();
        Router.push("/admin/list");
      } else {
        setNewAdminErrors({
          ...newAdminErrors,
          serverErrMsg: response.status_message,
        });
      }
    }
    }
  };
  const initNewAdminValidation = () => {
    const errors = {
      firstNameErrMsg: "",
      lastNameErrMsg: "",
      emailErrMsgErrMsg: "",
      passwordErrMsg: "",
      confirmPassword: "",
      serverErrMsg: "",
    };
    setNewAdminErrors(errors);
  };
  const registerUSerValidation = () => {
    let errors = {};
    let isValid = true;
    if (!newAdmin["firstName"]) {
      isValid = false;
      errors["firstNameErrMsg"] = "Please enter first name.";
    }
    if (!newAdmin["lastName"]) {
      isValid = false;
      errors["lastNameErrMsg"] = "Please enter  last name.";
    }
    if (!newAdmin["email"]) {
      isValid = false;
      errors["emailErrMsg"] = "Please enter email Address.";
    }
    if (typeof newAdmin["email"] !== "undefined") {
      if (!EmailRegX.test(newAdmin["email"])) {
        isValid = false;
        errors["emailErrMsg"] = "Please enter valid email address.";
      }
    }
    if (!newAdmin["password"] || newAdmin["password"].length < 6) {
      isValid = false;
      errors["passwordErrMsg"] = "Password must be at least 6 characters.";
    }
    if (
      !newAdmin["confirmPassword"] ||
      newAdmin["confirmPassword"] != newAdmin["password"]
    ) {
      isValid = false;
      errors["confirmPasswordErrMsg"] =
        "Password and confirm password must be the same";
    }

    setNewAdminErrors(errors);
    return isValid;
  };
  return (
    <AdminLayout title="Create Admin">
      <div className="login-area">
        <Container>
          <Row>
          <Col lg={8} style={{float:"none",margin:"auto"}}>
              <div className="lezada-form login-form--register">
                <form>
                  <Row>
                    <Col lg={6} className="space-mb--30" >
                      <label htmlFor="regFirstName">
                        First Name <span className="required">*</span>{" "}
                      </label>
                      <input
                        type="text"
                        id="regFirstName"
                        name="firstName"
                        placeholder="First Name"
                        value={newAdmin.firstName}
                        required
                        onChange={handleRegisterAdminChange}
                      />
                      <span className="error-text">
                        {newAdminErrors.firstNameErrMsg}
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
                        value={newAdmin.lastName}
                        required
                        onChange={handleRegisterAdminChange}
                      />
                      <span className="error-text">
                        {newAdminErrors.lastNameErrMsg}
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
                        value={newAdmin.email}
                        onChange={handleRegisterAdminChange}
                        required
                      />
                      <span className="error-text">
                        {newAdminErrors.emailErrMsg}
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
                        value={newAdmin.password}
                        onChange={handleRegisterAdminChange}
                        required
                      />
                      <span className="error-text">
                        {newAdminErrors.passwordErrMsg}
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
                        value={newAdmin.confirmPassword}
                        onChange={handleRegisterAdminChange}
                        required
                      />
                      <span className="error-text">
                        {newAdminErrors.confirmPasswordErrMsg}
                      </span>
                    </Col>
                    <span className="error-text ml-3 mb-3">
                      {newAdminErrors.serverErrMsg}
                    </span>
                    <Col lg={12} className="text-center">
                      <button
                        className="lezada-button lezada-button--medium"
                        onClick={onRegisterAdmin}
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
    </AdminLayout>
  );
};


export default AddAdmin;