const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");   //for password hashing
const jwt = require("jsonwebtoken");  //creating a token for every logged in user

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

async function registerUser(req, res) {
    try {

        const { userName, email, password } = req.body;    

        // Check if all fields are provided
        if (!userName || !email || !password) {
            return res.status(400).json({
                message: "Please provide username, email and password"
            });
        }

        // Check if user already exists
        const userAlreadyExists = await userModel.findOne({
            $or: [{ userName }, { email }]    //finding a user based on email or pass
        });

        if (userAlreadyExists) {
            return res.status(400).json({
                message: "Account already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword
            // skills, interests and background will use default values
        });

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                username: user.userName
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Store token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                id: user._id,
                username: user.userName,
                email: user.email,
                skills: user.skills,
                interests: user.interests,
                background: user.background
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
}

/**
 * @route POST /api/auth/login
 * @description Login existing user
 * @access Public
 */

async function loginUser(req, res) {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);   //comparison of hashed pass and entered pass

        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.userName
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                username: user.userName,
                email: user.email,
                skills: user.skills,
                interests: user.interests,
                background: user.background
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

/**
 * @route POST /api/auth/logout
 * @description Logout user
 * @access Private
 */

async function logoutUser(req, res) {
    try {
        res.clearCookie("token");

        res.status(200).json({
            message: "User logged out successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

/**
 * @route GET /api/auth/me
 * @description Get logged in user details
 * @access Private
 */

async function getMe(req, res) {

    try {

        const user = await userModel
            .findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User details fetched successfully",
            user: {
                id: user._id,
                username: user.userName,
                email: user.email,
                skills: user.skills,
                interests: user.interests,
                background: user.background
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe
};
