const express = require("express");

const router = express.Router();

const {
    updateProfile,
    getHistory
} = require("../controllers/careerController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/profile", authMiddleware, updateProfile);

router.get("/history", authMiddleware, getHistory);

module.exports = router;