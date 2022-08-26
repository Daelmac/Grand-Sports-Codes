import { Fragment,useState,useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import Link from "next/link";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import {CustomerPasswordReset} from "../api/userApi"
// import {authenticateAdmin} from "../../auth"
import { LayoutTwo } from "../components/Layout";
import Router from "next/router";



const ForgotPassword = ({userDetails}) => {
  useEffect(() => {
    if(userDetails && userDetails.role === 'customer') Router.push('/')
  })
    const EmailRegX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const { addToast } = useToasts();
    const [user, setUSer] = useState({
        email: '',  
    });
    const [errors, setErrors] = useState({
        emailErrMsg: "",
        serverErrMsg:""
    });
    
    const handleChange=(event)=>{
        initValidation()
        const { name, value } = event.target;
        setUSer({ ...user, [name]: value });
    }
    const handleSubmit = async(event)=> {
        event.preventDefault();
        if(validate()){
            const response = await CustomerPasswordReset(user.email)
            if(response){
                if(response.status === 'success'){
                    addToast(response.status_message, {
                        appearance: "success",
                        autoDismiss: true,
                      });
                      localStorage.setItem("reset_token",response.reset_token)
                      Router.push({
                        pathname: '/update-password',
                        query: { email: user.email },
                    }, '/update-password');
                }
                else{
                    setErrors({...errors,"serverErrMsg":response.status_message})
                }

            }else{
                addToast("Some problem occurred,please try again.", {
                    appearance: "error",
                    autoDismiss: true,
                    });
            }
        }
      }
    const initValidation = ()=>{
        const errors={
            emailErrMsg: "",
            serverErrMsg:""
        };
        setErrors(errors)
    }
    const validate=()=>{
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
          setErrors(errors);
          return isValid;
      }
  return (
    <LayoutTwo aboutOverlay={false}>
      {/* <HeaderTwo /> */}
      <div className="login-area space-mt--80 space-mb--r80">
        <Container>
          <Row>
            <Col lg={6} className="space-mb-mobile-only--50" style={{float:"none",margin:"auto"}}>  
              <div className="lezada-form login-form">
                <div className="header-content__logo d-flex align-items-center justify-content-center pb-2">
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
                <form>
                  <Row>
                    <Col lg={12}>
                      <div className="section-title--login text-center space-mb--50">
                        <h2 className="space-mb--20"> Lost your password?</h2>
                        {/* <p>Great to have you back!</p> */}
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
                    <span className="error-text ml-3 mb-3">{errors.serverErrMsg}</span>
                    <Col lg={12} className="space-mb--30">
                      <button className="lezada-button lezada-button--medium" onClick={handleSubmit}>
                        Send Password Reset Pin
                      </button>
                    </Col>
                    <Col>
                      {/* <input type="checkbox" />{" "}
                      <span className="remember-text">Remember me</span> */}
                       <Link href="/login-register" 
                      //  as={process.env.PUBLIC_URL + "/login-register"}
                       >
                      <a className="reset-pass-link">
                        login ?
                      </a>
                      </Link>
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

const mapStateToProps = (state) => {
  return {
    userDetails: state.currentUserData,
  };
};
export default connect(mapStateToProps,null)(ForgotPassword);
