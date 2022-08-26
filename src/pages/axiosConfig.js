// This page contains axois config with Authorization

import axios from "axios";
// const apiBaseUrl = process.env.REACT_APP_BASE_URL;
const apiBaseUrl = "http://127.0.0.1:5003";

const withAuthInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
withAuthInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("GRdfg",error.response)
    if(error.response.status === 401){
        localStorage.clear()
        console.log("clear")
    }
  }
);

export default withAuthInstance;
