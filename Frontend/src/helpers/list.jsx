import axios from "axios"
export const followersList=async(token)=>{
   const listFollowers =await axios.get("http://localhost:5000/user/followerlist",{
        headers:{
            authorization:`Bearer ${token}`
        },
    });
    console.log(listFollowers.data.followers)
    return listFollowers.data.followers;
}

export const followingsList = async(token)=>{
    const listFollowings =await axios.get("http://localhost:5000/user/followinglist",{
        headers:{
            authorization:`Bearer ${token}`
        },
    });
    console.log(listFollowings.data.followings)
    return listFollowings.data.followings;
}