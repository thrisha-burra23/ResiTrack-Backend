import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

const verifyAccessToken = async (req, res, next) => {

    const authHeader = req.headers.authorization

    if (!authHeader) {
         return res.status(401).json({
            error: true,
            message: "No token Found || Unauthorized"
        })
    }

    //bearer token--so token is in 1 index
    const token = authHeader.split(" ")[1];

    try {
        //decoding to get payload
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);//verifying and decoding
        const user= await User.findById(decoded.userId).select("-password");
        req.userId = decoded.userId;
        req.user=user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json(
            {
                error: true,
                message: "Invalid token"
            })
    }
}

export default verifyAccessToken