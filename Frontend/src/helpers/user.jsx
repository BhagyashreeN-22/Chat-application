import axios from "axios";

export const getAllUsersAPI = async (token) => {

  const res = await axios.get(
    "http://localhost:5000/user/users",
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

  return res.data.users;
};