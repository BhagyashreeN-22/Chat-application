import { authMiddleware } from "../middleware/auth_middleware.js";
import { sendMsg,getAllMsg } from "../services/msg_service.js";

import express from "express"
const msg_con = express.Router()

msg_con.post("/sendmsg/:id",authMiddleware,sendMsg);
msg_con.get("/getallmsg",authMiddleware,getAllMsg);

export default msg_con