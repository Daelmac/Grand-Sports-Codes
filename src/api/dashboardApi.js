import axios from "axios";
import { API_BASE_URL } from "../core/utils";

const getHeaerConfig = (token) => {
    return {
      headers: {
        "x-access-token": token,
      },
    };
  };

const get_dashboard_data =(admin) =>async (dispatch) => {
try {
    const result = await axios.get(
    `${API_BASE_URL}/get_dashboard_data`,
    getHeaerConfig(admin.token)
    );
    return result.data;
} catch (e) {
    console.log(e);
    if (e?.response?.status == 401) {
    dispatch({
        type: "SET_CURRENT_USER",
        payload: {},
    });
    }
    return null;
}
}
export {get_dashboard_data}