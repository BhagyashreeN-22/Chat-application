import { authMiddleware } from "../middleware/auth_middleware.js";
import { sendReq,acceptReq, getPendingReq } from "../services/follow_server.js";

import express from "express"
const follow_con = express.Router()

follow_con.get("/sendreq/:id",authMiddleware,sendReq)
follow_con.put("/acceptreq/:id",authMiddleware,acceptReq);
follow_con.get("/requests",authMiddleware,getPendingReq);

export default follow_con;
