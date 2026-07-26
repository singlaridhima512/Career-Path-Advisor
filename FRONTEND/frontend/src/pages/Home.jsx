import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getCareerAdvice } from "../api/careerApi";

export const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGetAdvice = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getCareerAdvice();
            navigate("/results", { state: { suggestions: data.suggestions } });
        } catch (err) {
            setError(
                err.response?.data?.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-container">
            <section className="hero">
                <h1>Welcome to Career Path Advisor 🚀</h1>

                <p className="hero-text">
                    Discover career paths tailored to your interests, skills,
                    and goals. Build your profile, explore opportunities, and
                    receive personalized AI recommendations to shape your future.
                </p>

                <div className="hero-buttons">
                    <Link to="/profile" className="btn-primary">
                        Build Your Profile
                    </Link>

                    <button
                        className="btn-secondary"
                        onClick={handleGetAdvice}
                        disabled={loading}
                    >
                        {loading ? "Analyzing your profile..." : "Explore Careers"}
                    </button>
                </div>

                {error && <p className="history-status error" style={{ marginTop: "1rem" }}>{error}</p>}
            </section>

            <section className="features">
                <div className="card">
                    <span>👤</span>
                    <h3>Create Your Profile</h3>
                    <p>
                        Tell us about your education, interests, strengths,
                        skills, and aspirations to receive personalized career
                        recommendations.
                    </p>
                </div>

                <div className="card">
                    <span>🧠</span>
                    <h3>AI Career Guidance</h3>
                    <p>
                        Receive career suggestions based on your profile using
                        intelligent AI analysis.
                    </p>
                </div>

                <div className="card">
                    <span>📈</span>
                    <h3>Skill Gap Analysis</h3>
                    <p>
                        Identify the skills you need to develop for your dream
                        career and receive a clear learning roadmap.
                    </p>
                </div>

                <div className="card">
                    <span>🎯</span>
                    <h3>Career Roadmap</h3>
                    <p>
                        Get step-by-step guidance on courses, certifications,
                        projects, and technologies required to achieve your
                        career goals.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;