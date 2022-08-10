import { Fragment,useState,useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import Link from "next/link";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { HeaderTwo } from "../../components/Header";
import {Adminlogin} from "../../api/userApi"
// import {authenticateAdmin} from "../../auth"
import { setCurrentUser } from "../../redux/actions/userActions";
  import Router from "next/router";

const Login = ({setCurrentUser,userDetails}) => {
  useEffect(() => {
    if(userDetails && userDetails.role === 'admin') Router.push('/admin/dashboard')
    console.log("userDetails==>",userDetails)
  })
    const EmailRegX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const { addToast } = useToasts();
    const [user, setUSer] = useState({
        email: '',  
        password: ''

    });
    const [errors, setErrors] = useState({
        emailErrMsg: "",
        passwordErrMsg: "",
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
            const response = await Adminlogin(user)
            if(response.status === 'success' && response.role === 'admin'){
                setCurrentUser(response,addToast)
                // authenticateAdmin()
                Router.push("/admin/dashboard");
            }
            else{
                setErrors({...errors,"serverErrMsg":"Invalid email or password.Please try again."})
            }
            console.log(response);
        }
      }
    const initValidation = ()=>{
        const errors={
            emailErrMsg: "",
            passwordErrMsg: "",
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
      
          if (!user["password"]) {
            isValid = false;
            errors["passwordErrMsg"] = "Please enter your password.";
          }
      
          setErrors(errors);
          return isValid;
      }
  return (
    <Fragment>
      {/* <HeaderTwo /> */}
      <div className="login-area space-mt--r130 space-mb--r130">
        <Container>
          <Row>
            <Col lg={6} className="space-mb-mobile-only--50" style={{float:"none",margin:"auto"}}>  
              <div className="lezada-form login-form">
                <div className="header-content__logo d-flex align-items-center justify-content-center pb-2">
                    <Link href="/" as={process.env.PUBLIC_URL + "/"}>
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
                        <h2 className="space-mb--20">Admin Login</h2>
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
                    <span className="error-text ml-3 mb-3">{errors.serverErrMsg}</span>
                    <Col lg={12} className="space-mb--30">
                      <button className="lezada-button lezada-button--medium" onClick={handleSubmit}>
                        login
                      </button>
                    </Col>
                    <Col>
                      {/* <input type="checkbox" />{" "}
                      <span className="remember-text">Remember me</span> */}
                      <a href="#" className="reset-pass-link">
                        Lost your password?
                      </a>
                      <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                      <a className="reset-pass-link">
                        Back to home page
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
    </Fragment>
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
export default connect(mapStateToProps,mapDispatchToProps)(Login);
