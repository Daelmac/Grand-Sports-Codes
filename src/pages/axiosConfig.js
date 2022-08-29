// This page contains axois config with Authorization
import Router from "next/router";
import axios from "axios";
// const apiBaseUrl = process.env.REACT_APP_BASE_URL;
const apiBaseUrl = process.env.API_URL;

const getToken=()=>{
  if (typeof window !== 'undefined') {
    console.log("token",JSON.parse(JSON.parse(window.localStorage.getItem('persist:primary') || "{}")?.currentUserData || "{}")?.token)
    return JSON.parse(JSON.parse(window.localStorage.getItem('persist:primary') || "{}")?.currentUserData || "{}")?.token
  }
  return null
}
const withAuthInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    "x-access-token":getToken()
  },
});
withAuthInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if(error.response.status === 401){
    //    const role = typeof window !== "undefined" ? JSON.parse(JSON.parse(window.localStorage.getItem('persist:primary') || "{}")?.currentUserData || "{}")?.role : ''
    //     localStorage.clear()
    //     console.log("role",role)
    //     if(role == 'admin') Router.push('/admin/login')
    //     else Router.push('/login-register')
    //     console.log("clear")
    // }
    return null
  }
);
// console.log("localStorage.getItem('persist:primary')",JSON.parse(JSON.parse(localStorage.getItem('persist:primary')).currentUserData).token)
export default withAuthInstance;
