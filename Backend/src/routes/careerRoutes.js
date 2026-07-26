const express = require("express");

const router = express.Router();

const {
    updateProfile,
    getHistory,
    getCareerAdvice
} = require("../controllers/careerController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/profile", authMiddleware, updateProfile);

router.get("/history", authMiddleware, getHistory);

router.post("/advise", authMiddleware, getCareerAdvice);
module.exports = router;