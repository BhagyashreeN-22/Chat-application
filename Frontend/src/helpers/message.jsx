import axios from "axios";

export const sendMessageAPI = async (receiverId, context, token) => {

  const res = await axios.post(
    `http://localhost:5000/msg/sendmsg/${receiverId}`,
    { context },
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

  return res.data;
};