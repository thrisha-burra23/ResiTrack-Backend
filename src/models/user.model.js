import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["RESIDENT", "ADMIN", "STAFF"],
        default: "RESIDENT"
    },
    apartment_id: {
        type: String,
        required: true,
        default: "1B"
    },
    refreshToken: {
        type: String,
        // unique: true,
        // sparse: true
    },

}, { timestamps: true })


const User = mongoose.model("User", userSchema);

export default User