import { Register,Login } from "../services/auth_service.js";
import  express from "express"
const auth_con = express.Router();

auth_con.post("/register",Register)
auth_con.post("/login",Login)

export default auth_con;