
const userModel = require("../models/userModel");
const CareerSuggestion = require("../models/CareerSuggestions");   // ← fixed to match your actual filename

const { GoogleGenAI } = require("@google/genai");
const genAI = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });

/**
 * @route POST /api/career/profile
 * @description Update logged-in user's skills, interests and academic background
 * @access Private
 */
async function updateProfile(req, res) {
  try {
    const { skills, interests, background } = req.body;

    if (skills !== undefined && !Array.isArray(skills)) {
      return res.status(400).json({
        message: "Skills must be an array of strings",
      });
    }

    if (interests !== undefined && !Array.isArray(interests)) {
      return res.status(400).json({
        message: "Interests must be an array of strings",
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
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.name,
        email: updatedUser.email,
        skills: updatedUser.skills,
        interests: updatedUser.interests,
        background: updatedUser.background,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

/**
 * @route GET /api/career/history
 * @description Get logged-in user's past suggestion sets, newest first
 * @access Private
 */
async function getHistory(req, res) {
  try {
    const history = await CareerSuggestion.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    if (!history.length) {
      return res.status(200).json({ history: [] });
    }

    res.status(200).json({ history });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

/**
 * @route POST /api/career/advise
 * @description Get AI-generated career path suggestions based on user's profile
 * @access Private
 */
async function getCareerAdvice(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (
      (!user.skills || user.skills.length === 0) &&
      (!user.interests || user.interests.length === 0)
    ) {
      return res.status(400).json({
        message:
          "Please update your profile with skills and interests before requesting advice",
      });
    }

    const prompt = `
You are a career advisor AI. Based on the following user profile, suggest exactly 3 career paths.

User Profile:
- Skills: ${user.skills.join(", ") || "None specified"}
- Interests: ${user.interests.join(", ") || "None specified"}
- Academic Background: ${user.background || "Not specified"}

Respond ONLY with a valid JSON object in this exact structure, with no extra text, no markdown formatting, no code fences:

{
  "suggestions": [
    {
      "path": "string - name of the career path",
      "reasoning": "string - 2-3 sentences explaining why this path fits the user",
      "suggestedSkillsToLearn": ["string", "string", "string"]
    }
  ]
}

The "suggestions" array must contain exactly 3 objects.
`;

    const result = await genAI.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const aiResponseText = result.text;

    let parsedResponse;

    try {
      parsedResponse = JSON.parse(aiResponseText);
    } catch (parseError) {
      console.log("Failed to parse AI response:", aiResponseText);
      return res.status(500).json({
        message: "AI returned an invalid response. Please try again.",
      });
    }

    if (
      !parsedResponse.suggestions ||
      !Array.isArray(parsedResponse.suggestions) ||
      parsedResponse.suggestions.length !== 3
    ) {
      return res.status(500).json({
        message: "AI did not return exactly 3 suggestions. Please try again.",
      });
    }

    const savedSuggestion = await CareerSuggestion.create({
      userId: req.user.id,
      suggestions: parsedResponse.suggestions,
    });

    res.status(200).json({
      message: "Career advice generated successfully",
      suggestions: savedSuggestion.suggestions,
      createdAt: savedSuggestion.createdAt,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  updateProfile,
  getHistory,
  getCareerAdvice,
};