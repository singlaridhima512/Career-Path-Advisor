const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    reasoning: {
        type: String,
        required: true
    },
    suggestedSkillsToLearn: {
        type: [String],
        default: []
    }
}, { _id: false });

const careerSuggestionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    suggestions: {
        type: [suggestionSchema],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("CareerSuggestion", careerSuggestionSchema);