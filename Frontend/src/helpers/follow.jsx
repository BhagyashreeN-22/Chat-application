import axios from "axios";

export const sendFollowRequestAPI = async (followingId, token) => {
   console.log(followingId);
  const res = await axios.get(
    `http://localhost:5000/req/sendreq/${followingId}`,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

  return res.data;
};