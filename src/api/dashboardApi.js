import axios from "../pages/axiosConfig";
const get_dashboard_data =async() => {
try {
    const result = await axios.get(
    `/get_dashboard_data`,
    );
    return result?result.data:null;
} catch (e) {
    return null;
}
}
export {get_dashboard_data}