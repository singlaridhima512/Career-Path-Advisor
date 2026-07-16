import { useState } from "react";
import "../styles/profile.css";
import { useAuth } from "../hooks/useAuth";
import { updateProfile } from "../api/careerApi";

const BACKGROUND_OPTIONS = [
    "",
    "High School",
    "Undergraduate - 1st Year",
    "Undergraduate - 2nd Year",
    "Undergraduate - 3rd Year",
    "Undergraduate - Final Year",
    "Postgraduate",
    "PhD",
    "Working Professional",
    "Other"
];

const Profile = () => {

    const { user } = useAuth();

    const [skills, setSkills] = useState(user?.skills || []);
    const [interests, setInterests] = useState(user?.interests || []);
    const [background, setBackground] = useState(user?.background || "");

    const [skillInput, setSkillInput] = useState("");
    const [interestInput, setInterestInput] = useState("");

    const [saving, setSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState(""); // "success" | "error"

    const addTag = (value, list, setList, setInput) => {

        const trimmed = value.trim();

        if (!trimmed) return;

        if (list.some((item) => item.toLowerCase() === trimmed.toLowerCase())) {
            setInput("");
            return;
        }

        setList([...list, trimmed]);
        setInput("");
    };

    const removeTag = (index, list, setList) => {
        setList(list.filter((_, i) => i !== index));
    };

    const handleTagKeyDown = (e, list, setList, input, setInput) => {

        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(input, list, setList, setInput);
        }

        if (e.key === "Backspace" && input === "" && list.length > 0) {
            removeTag(list.length - 1, list, setList);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);
        setStatusMessage("");

        try {

            await updateProfile({ skills, interests, background });

            setStatusType("success");
            setStatusMessage("Profile saved successfully!");

        } catch (err) {

            setStatusType("error");
            setStatusMessage("Failed to save profile. Please try again.");

        } finally {

            setSaving(false);

        }

    };

    return (
        <div className="profile-page">

            <div className="profile-card">

                <h1>Build Your Profile</h1>

                <p className="subtitle">
                    Tell us about yourself to get personalized career advice
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Skills</label>

                        <div className="tag-input-box">

                            {skills.map((skill, index) => (
                                <span className="tag" key={index}>
                                    {skill}
                                    <button
                                        type="button"
                                        className="tag-remove"
                                        onClick={() => removeTag(index, skills, setSkills)}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}

                            <input
                                type="text"
                                placeholder="Type a skill and press Enter"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={(e) =>
                                    handleTagKeyDown(e, skills, setSkills, skillInput, setSkillInput)
                                }
                                onBlur={() => addTag(skillInput, skills, setSkills, setSkillInput)}
                            />

                        </div>
                    </div>

                    <div className="input-group">
                        <label>Interests</label>

                        <div className="tag-input-box">

                            {interests.map((interest, index) => (
                                <span className="tag" key={index}>
                                    {interest}
                                    <button
                                        type="button"
                                        className="tag-remove"
                                        onClick={() => removeTag(index, interests, setInterests)}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}

                            <input
                                type="text"
                                placeholder="Type an interest and press Enter"
                                value={interestInput}
                                onChange={(e) => setInterestInput(e.target.value)}
                                onKeyDown={(e) =>
                                    handleTagKeyDown(e, interests, setInterests, interestInput, setInterestInput)
                                }
                                onBlur={() => addTag(interestInput, interests, setInterests, setInterestInput)}
                            />

                        </div>
                    </div>

                    <div className="input-group">
                        <label>Academic Background</label>

                        <select
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                        >
                            {BACKGROUND_OPTIONS.map((option) => (
                                <option value={option} key={option}>
                                    {option === "" ? "Select your background" : option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {statusMessage && (
                        <p className={`status-message ${statusType}`}>
                            {statusMessage}
                        </p>
                    )}

                    <button type="submit" className="save-btn" disabled={saving}>
                        {saving ? "Saving..." : "Save Profile"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Profile;
