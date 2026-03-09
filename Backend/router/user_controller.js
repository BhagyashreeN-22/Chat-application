import { authMiddleware } from "../middleware/auth_middleware.js";
import { getFollowers,getFollowings,getFollowerCount,getFollowingCount, getAllUser } from "../services/user_service.js";
import express from "express"
const user_con = express.Router()

user_con.get("/users",authMiddleware,getAllUser)
user_con.get("/followercount",authMiddleware,getFollowerCount);
user_con.get("/followingcount",authMiddleware,getFollowingCount);
user_con.get("/followerlist",authMiddleware,getFollowers);
user_con.get("/followinglist",authMiddleware,getFollowings);

export default user_con;