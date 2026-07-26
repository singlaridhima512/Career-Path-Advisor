import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const suggestions = location.state?.suggestions;

    if (!suggestions) {
        return (
            <div className="results-page">
                <p className="history-status">
                    No suggestions to show yet.{" "}
                    <span className="link-text" onClick={() => navigate("/")}>
                        Go back home
                    </span>{" "}
                    and click "Get Career Advice."
                </p>
            </div>
        );
    }

    return (
        <div className="results-page">
            <h1>Your Career Suggestions</h1>
            <p className="subtitle">Based on your current profile, here's what fits you best.</p>

            <div className="results-grid">
                {suggestions.map((s, i) => (
                    <div className="suggestion-card" key={i}>
                        <h3>{s.path}</h3>
                        <p>{s.reasoning}</p>
                        <div className="skills-tags">
                            {s.suggestedSkillsToLearn.map((skill, j) => (
                                <span className="tag" key={j}>{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button className="btn-secondary" onClick={() => navigate("/history")} style={{ marginTop: "2rem" }}>
                View History
            </button>
        </div>
    );
};

export default Results;