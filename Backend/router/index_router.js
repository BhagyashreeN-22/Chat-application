import auth_con from "./auth_controller.js";
import user_con from "./user_controller.js";
import follow_con from "./follow_controller.js";
import msg_con from "./msg_controller.js";
import express from "express"

const router= express.Router()

router.use("/auth",auth_con)
router.use("/user",user_con)
router.use("/req",follow_con)
router.use("/msg",msg_con)

export default router;