
import express from "express"
import cors from "cors"
import { db } from "./config/db.js";

await db();

const app = express()
const PORT =process.env.PORT || 5000
import router from "./router/index_router.js";
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/health",()=>{
    console.log("Health Router")
});

app.use("/",router)

app.listen(PORT,()=>{
    console.log("Server connected successfully")
});
