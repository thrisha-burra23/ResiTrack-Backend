import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();
const MONGO_DB_URI=process.env.MONGO_DB_URI

const connectToDb=async ()=>{
try {
    await mongoose.connect(MONGO_DB_URI)
    console.log("db connected successfully!!")
} catch (error) {
    console.log(error.message)
    process.exit(1);
}
}

export default connectToDb