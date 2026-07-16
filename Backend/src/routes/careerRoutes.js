const express = require("express");

const router = express.Router();

const {
    updateProfile
} = require("../controllers/careerController");

const authMiddleware = require("../middleware/authMiddleware");

// Update profile - skills, interests, background (Protected)
router.post("/profile", authMiddleware, updateProfile);

module.exports = router;
