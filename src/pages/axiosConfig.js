// This page contains axois config with Authorization
import Router from "next/router";
import axios from "axios";

const apiBaseUrl = process.env.API_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.response.status === 401){
       const role = typeof window !== "undefined" ? JSON.parse(JSON.parse(window.localStorage.getItem('persist:primary') || "{}")?.currentUserData || "{}")?.role : ''
        localStorage.clear()
        console.log("role",role)
        if(role == 'admin') Router.push('/admin/login')
        else Router.push('/login-register')
    }
    return null
  }
);
export default axiosInstance;
