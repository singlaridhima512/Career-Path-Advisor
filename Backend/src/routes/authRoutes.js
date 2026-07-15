const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser,
    getMe
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

//setting up routes for all APIs

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Logout (Protected)
router.post("/logout", authMiddleware, logoutUser);

// Get Logged-in User (Protected)
router.get("/me", authMiddleware, getMe);

module.exports = router;