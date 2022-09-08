import axios from "../pages/axiosConfig";
import {getAuthConfig} from "../core/utils"

const sendMessage = async (msg) => {
  try {
    var params = new FormData();
    params.append("name",msg.customerName);
    params.append("email",msg.customerEmail);
    params.append("subject",msg.contactSubject);
    params.append("message",msg.contactMessage);
    const result = await axios.post(`/send_message`, params);
    return result ? result.data: null;
  } catch (e) {
    return null;
  }
};
const get_all_messages = async () => {
  try {
    const result = await axios.get(`/get_messages`,getAuthConfig());
    return result ? result.data.messages : null;
  } catch (e) {
    return null;
  }
};
export {sendMessage,get_all_messages}