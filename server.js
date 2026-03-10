import dotenv from "dotenv"
import app from "./src/app.js";
import connectToDb from "./src/config/db.js";

dotenv.config();

const PORT=process.env.PORT || 5000
connectToDb();
app.listen(PORT,()=>{
    console.log(`server is runnig at PORT=${PORT}`)
})


