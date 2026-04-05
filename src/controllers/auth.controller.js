import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt, { decode } from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt-tokens.js"

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                error: true,
                message: "User already exists"
            })
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //saving in db
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })

        res.status(201).json({
            message: "user created successfully",
            data: newUser
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }


}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(400).json({
                error: true,
                message: "User doesn't exist"
            })
        }
        //comparing password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: true,
                message: "Invalid credientials"
            })
        }

        //generating Access  and Refresh Tokens
        const accessToken = generateAccessToken(existingUser._id)
        const refreshToken = generateRefreshToken(existingUser._id)

        //saving in db
        existingUser.refreshToken = refreshToken;
        await existingUser.save();

        //setting refreshToken in cookie
        res.cookie("refreshToken", refreshToken,
            {
                httpOnly: true,
                sameSite: "strict",
                secure: false //in production ->true
            }
        )

        res.status(200).json({
            message: "Login Successful!!",
            accessToken
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                error: true,
                message: " NO Refresh Token found in cookies"
            })
        }

        const decodedRefreshToken = jwt.verify(refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        //checking user exists and refresh Token exists
        const existingUserId = decodedRefreshToken.userId;

        const existingUser = await User.findById(existingUserId)

        if (!existingUser._id || existingUser.refreshToken !== refreshToken) {
            res.status(403).json({
                error: true,
                message: "User not found || Invalid Refresh Token"
            })
        }

        const newAccessToken = generateAccessToken(existingUser._id);

        res.status(200).json({
            success: true,
            message: "Access token has be refrshed successfully",
            accessToken: newAccessToken
        })

    } catch (error) {
        console.error(error);
        res.status(403).json({
            message: "Invalid or expired refresh token"
        });
    }


}

const logout = async (req, res) => {
    try {
        const userId = req.userId; //user sends in authorization header and we get througn auth.middleware

        //searching user and making refreshToken null
        await User.findByIdAndUpdate(userId, { refreshToken: null }, { new: true })

        res.clearCookie("refreshToken");
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "Internal server Error"
        })
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User
            .findById(userId)
            .select("-password -refreshToken") // removing sensitive info 
        if (!user) {
            return res.status(404).json({
                error: true,
                message: "User not found"
            })
        }

        res.json({
            message: "User found successfully",
            user: user
        })


    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

export { registerUser, loginUser, refreshAccessToken, logout, getCurrentUser }