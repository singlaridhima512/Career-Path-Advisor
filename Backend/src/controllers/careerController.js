const userModel = require("../models/usermodel");

/**
 * @route POST /api/career/profile
 * @description Update logged-in user's skills, interests and academic background
 * @access Private
 */

async function updateProfile(req, res) {

    try {

        const { skills, interests, background } = req.body;

        // Basic validation - skills and interests must be arrays if provided
        if (skills !== undefined && !Array.isArray(skills)) {
            return res.status(400).json({
                message: "Skills must be an array of strings"
            });
        }

        if (interests !== undefined && !Array.isArray(interests)) {
            return res.status(400).json({
                message: "Interests must be an array of strings"
            });
        }

        const updatedFields = {};

        if (skills !== undefined) updatedFields.skills = skills;
        if (interests !== undefined) updatedFields.interests = interests;
        if (background !== undefined) updatedFields.background = background;

        const updatedUser = await userModel
            .findByIdAndUpdate(
                req.user.id,
                { $set: updatedFields },
                { new: true, runValidators: true }
            )
            .select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                username: updatedUser.userName,
                email: updatedUser.email,
                skills: updatedUser.skills,
                interests: updatedUser.interests,
                background: updatedUser.background
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
    updateProfile
};
