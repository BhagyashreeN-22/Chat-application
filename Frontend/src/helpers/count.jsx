import axios from "axios"
export const followerCount = async(token)=>{
   const users = await axios.get("http://localhost:5000/user/followercount",
    {
        headers:{
            authorization : `Bearer ${token}`,
        },
    }
   )
   return users.data.count;
}

export const followingCount = async(token)=>{
   const users = await axios.get("http://localhost:5000/user/followingcount",
    {
        headers:{
            authorization : `Bearer ${token}`,
        },
    }
   )
   return users.data.count;
}