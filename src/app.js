import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js";
import complaintRouter from "./routes/complaint.route.js";

const app=express();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())

app.get("/api/test",(req,res)=>{
    res.send("FE BE connected successfully!!")
})
app.use("/api/auth",authRouter)
app.use("/api/complaint",complaintRouter)

export default app



