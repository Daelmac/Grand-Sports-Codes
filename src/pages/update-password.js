import { Fragment,useState,useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import Link from "next/link";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import {CustomerUpdatePassword} from "../api/userApi"
import { LayoutTwo } from "../components/Layout";
import Router from "next/router";
import { useRouter } from "next/router";
import {EmailRegX} from "../core/utils"

const UpdatePassword = ({userDetails}) => {
  useEffect(() => {
    if(userDetails && userDetails.role === 'customer') Router.push('/')
  })
    const router = useRouter();
    const { addToast } = useToasts();
    const [user, setUSer] = useState({
        email: router.query?.email || "",  
        password: '',
        cpassword:'',
        reset_pin:''

    });
    console.log(router.query)
    const [errors, setErrors] = useState({
        emailErrMsg:"",
        passwordErrMsg: "",
        cpasswordErrMsg:"",
        reset_pinErrMsg:"",
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
            const token = localStorage.getItem('reset_token') || ''
            const response = await CustomerUpdatePassword(token,user)
            if(response){
                if(response.status === 'success'){
                    addToast(response.status_message, {
                        appearance: "success",
                        autoDismiss: true,
                      });
                      Router.push('/login-register');
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
            passwordErrMsg: "",
            cpasswordErrMsg:"",
            reset_pinErrMsg:"",
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
          if (!user["reset_pin"]) {
            isValid = false;
            errors["reset_pinErrMsg"] = "Please enter your reset password pin.";
          }
      
          if (!user["password"]) {
            isValid = false;
            errors["passwordErrMsg"] = "Please enter your password.";
          }

          if (
            !user["cpassword"] ||
            user["cpassword"] != user["password"]
          ) {
            isValid = false;
            errors["cpasswordErrMsg"] =
              "Password and confirm password must be the same";
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
                    as={process.env.PUBLIC_URL + "/"}
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
                        <h2 className="space-mb--20">Update Password</h2>
                        {/* <p>Great to have you back!</p> */}
                      </div>
                    </Col>
                    <Col lg={12} className="space-mb--60">
                      <input
                        type="text"
                        name="email"
                        value={user.email}
                        placeholder="Email Address"
                        onChange={handleChange}
                        required
                      />
                      <span className="error-text">{errors.emailErrMsg}</span>
                    </Col>
                    <Col lg={12} className="space-mb--60">
                      <input 
                       type="password"
                       name="password"
                       value={user.password}
                       placeholder="Password" 
                       required  
                       onChange={handleChange} />
                      <span className="error-text">{errors.passwordErrMsg}</span>
                    </Col>
                    <Col lg={12} className="space-mb--60">
                      <input 
                       type="password"
                       name="cpassword"
                       value={user.cpassword}
                       placeholder="Confirm Password" 
                       required  
                       onChange={handleChange} />
                      <span className="error-text">{errors.cpasswordErrMsg}</span>
                    </Col>
                    <Col lg={12} className="space-mb--60">
                      <input 
                       type="text"
                       name="reset_pin"
                       value={user.reset_pin}
                       placeholder="Password Reset Pin" 
                       required  
                       onChange={handleChange} />
                      <span className="error-text">{errors.reset_pinErrMsg}</span>
                    </Col>
                    <span className="error-text ml-3 mb-3">{errors.serverErrMsg}</span>
                    <Col lg={12} className="space-mb--30">
                      <button className="lezada-button lezada-button--medium" onClick={handleSubmit}>
                        Update Password
                      </button>
                    </Col>
                    <Col>
                      {/* <input type="checkbox" />{" "}
                      <span className="remember-text">Remember me</span> */}
                      <Link href="/login-register" 
                      as={process.env.PUBLIC_URL + "/login-register"}
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
export default connect(mapStateToProps,null)(UpdatePassword);
