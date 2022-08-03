import axios from "axios";
import {API_BASE_URL} from "../core/utils"
const Adminlogin = async (user) => {
    try {
      var params = new FormData();
      params.append('email',user.email)
      params.append('password',user.password)
      const result = await axios.post(
        `${API_BASE_URL}/admin_login`,params
      );
      return result.data;
    } catch (e) { 
      console.log(e.response);
    } 
  };
  const CustomerLogin = async (user) => {
    try {
      var params = new FormData();
      params.append('email',user.email)
      params.append('password',user.password)
      const result = await axios.post(
        `${API_BASE_URL}/customer_login`,params
      );
      return result.data;
    } catch (e) { 
      console.log(e.response);
    } 
  };
const CreateCustomer = async (user) => {
    try {
      alert("FRfeg")
      var params = new FormData();
      params.append('email',user.email)
      params.append('password',user.password)
      params.append('username',`${user.firstName} ${user.lastName}` )
      console.log("wdw",params)
      const result = await axios.post(
        `${API_BASE_URL}/create_customer`,params
      );
    
      return result.data;
    } catch (e) { 
      console.log(e);
    } 
  };

export {Adminlogin,CreateCustomer,CustomerLogin}  