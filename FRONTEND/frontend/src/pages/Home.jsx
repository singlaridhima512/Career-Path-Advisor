import { Link } from "react-router-dom";

export const Home = () => {
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
                    <Link to="/profile-builder" className="btn-primary">
                        Build Your Profile
                    </Link>

                    <Link to="/career-analysis" className="btn-secondary">
                        Explore Careers
                    </Link>
                </div>
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