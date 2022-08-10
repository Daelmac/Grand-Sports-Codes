// import axios from "../pages/axiosConfig";
import axios from "axios";
import {API_BASE_URL} from "../core/utils"
import handle401 from "../core/errorHandler/handle401"
import Router from "next/router";
import store from '../redux/store';
// import { useToasts } from "react-toast-notifications";
import { setCurrentUser } from "../redux/actions/userActions";
// const { addToast } = useToasts();

const getHeaerConfig=(token) => {
  return {headers:{
      "x-access-token":token,
  }}
};

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
  const CreateAdmin = (admin,adminData)=>async dispatch=> {
    try {
      var params = new FormData();
      params.append('email',adminData.email)
      params.append('password',adminData.password)
      params.append('username',`${adminData.firstName} ${adminData.lastName}`)
      const result = await axios.post(
        `${API_BASE_URL}/create_admin`,params,getHeaerConfig(admin.token)
      );
      return result.data;
    } catch (e) { 
      if (e.response.status == 401){
            dispatch({
              type: 'SET_CURRENT_USER',
              payload:{}
            })
            Router.push("/admin/login");
       }  
       return null
    } 
  };
// const getCustomers = async(admin,filter) => {
//     try {
//       let params = new FormData();
//       params.append('admin_id',admin?.admin_id)
//       params.append('filter',filter)
//       const result = await axios.post(
//         `${API_BASE_URL}/all_customers`,params,getHeaerConfig(admin.token)
//         );
//         return result.data['customers']
//       } catch (e) { 
//         console.log("Fefew", e);
//         if (e.response.status == 401){
//           handle401()
//           // Router.push("/admin/login");
//         }  
//       } 
//   };

  const getCustomers = (admin,filter)=> async dispatch => {
    try {
        let params = new FormData();
        params.append('admin_id',admin?.admin_id)
        params.append('filter',filter)
        const result = await axios.post(
          `${API_BASE_URL}/all_customers`,params,getHeaerConfig(admin.token)
          );
          return result.data.customers
        } catch (e) { 
          console.log("Fefew", e);
          if (e.response.status == 401){
            dispatch({
              type: 'SET_CURRENT_USER',
              payload:{}
            })
          }
          return null  
        } 
    };
  
  const getAdmins = (admin)=>async dispatch => {
    try {
      const result = await axios.get(
        `${API_BASE_URL}/all_admins`,getHeaerConfig(admin.token)
      );
      return result.data.admins;
    } catch (e) { 
      if (e.response.status == 401){
          dispatch({
            type: 'SET_CURRENT_USER',
            payload:{}
          })
       }  
       return null
    } 
  }

export {Adminlogin,CreateCustomer,CreateAdmin,CustomerLogin,getCustomers,getAdmins}  